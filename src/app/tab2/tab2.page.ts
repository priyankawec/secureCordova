import { Component,ViewChild } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@awesome-cordova-plugins/media-capture/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { VideoPlayer , VideoOptions } from '@awesome-cordova-plugins/video-player/ngx';
import {AlertController} from '@ionic/angular'
import { File } from '@awesome-cordova-plugins/file/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';






const MEDIA_FILES_KEY = 'mediaFiles';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private media:MediaCapture,private file:File,private storage:NativeStorage,private Mediaa : Media , private camera:Camera, private webView:WebView, private videoPlayer:VideoPlayer, private alrt:AlertController) {}
  vid:any
  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;

  //  options: CaptureVideoOptions = { limit: 3 }

  ionViewDidLoad() {
    this.storage.getItem(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    })
  }
  captureVideo() {
    let options: CaptureVideoOptions = {
      limit: 1,
      duration: 30
    }
    this.media.captureVideo(options).then((res: MediaFile[]) => {
      let capturedFile = res[0];
      let fileName = capturedFile.name;
      let dir = capturedFile['localURL'].split('/');
      dir.pop();
      let fromDirectory = dir.join('/');
      var toDirectory = this.file.dataDirectory;

      this.file.copyFile(fromDirectory , fileName , toDirectory , fileName).then((res) => {
        this.storeMediaFiles([{name: fileName, size: capturedFile.size}]);
      },err => {
        console.log('err: ', err);
      });
          },
    (err: CaptureError) => console.error(err));
  }
  storeMediaFiles(files) {
    this.storage.getItem(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.setItem(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.setItem(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }
  play(myFile) {
    if (myFile.name.indexOf('.wav') > -1) {
      const audioFile: MediaObject = this.Mediaa.create(myFile.localURL);
      audioFile.play();
    } else {
      let path = this.file.dataDirectory + myFile.name;
      let url = path.replace(/^file:\/\//, '');
      let video = this.myVideo.nativeElement;
      video.src = url;
      video.play();
    }
  }

 handlevideo = async ()=>{
  let options : CaptureVideoOptions = {
    limit:1,
    duration:30,

  }
  let cap = await this.media.captureVideo(options)
  console.log(cap);

  let med = cap[0] as MediaFile

  // let resolvedfile = await this.file.resolveDirectoryUrl()
}


// getVideo(){

// //   this.media.captureVideo().then(
// //       (data: MediaFile[]) => console.log(data),
// //       (err: CaptureError) => console.error(err)
// //     );
// // }
// let options: CaptureVideoOptions = {
//   limit: 1, duration: 30
//   };

//   this.media.captureVideo(options).then((path: MediaFile[]) => {
//     console.log('path ', path[0].fullPath);
//     let win: any = window; // hack ionic/angular compilator
//     var myURL = win.Ionic.WebView.convertFileSrc(path[0].fullPath);
//     console.log('url ', myURL);
//     this.vid = myURL
//   }, err => {
//     alert('Error Media Capture Video' + JSON.stringify(err));
//   });
//   }
// mediaFiles = [];
//   chooseVideo = function() {
//     var options = {
//         quality: 100,
//         destinationType: this.camera.DestinationType.FILE_URI,
//         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
//         mediaType: this.camera.MediaType.VIDEO,
//         saveToPhotoAlbum: false
//     };

//     this.camera.getPicture(options).then(function(videoData){
//           console.log('responce = ', videoData);
//           let showImage = this.webView.convertFileSrc(videoData)
//           this.vid = JSON.stringify(showImage)
//           this.videoPlayer.play( this.vid).then(() => {
//             console.log('video completed');
//            }).catch(err => {
//             console.log(err);
//            });
//     });
// }
// videoOpts :VideoOptions
// public playVideo(){
//   this.videoOpts = {volume : 1.0};
//   this.videoPlayer.play(this.vid).then((res) => {
//   // console.log('video completed');
//   this.vid = res
//   }).catch(err => {
//   console.log(err);
//   });
// }
// public stopPlayingVideo(){
//   this.videoPlayer.close();
// }



}
