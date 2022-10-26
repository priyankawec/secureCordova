import { Component,OnInit } from '@angular/core';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { FormsModule,ReactiveFormsModule,FormGroup,Validators,FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import {AlertController} from '@ionic/angular'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  imgURL:any = '';

  // user_info: any = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   email: new FormControl('', Validators.required),
  //   dob: new FormControl('', Validators.required),
  //   gender:new FormControl('',Validators.required)

  // })

  constructor(private androidPermissions: AndroidPermissions,private camera: Camera, private webView:WebView, private alertclt:AlertController) {}

ngOnInit(){

}

cameraOptions:CameraOptions = {
  quality: 100,
  allowEdit:false,
  correctOrientation:true,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}

galleryOptions:CameraOptions ={
  sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
  destinationType: this.camera.DestinationType.FILE_URI,
  quality:100,
  encodingType: this.camera.EncodingType.JPEG,
  allowEdit:true,
  correctOrientation:true,
  mediaType: this.camera.MediaType.PICTURE

}

async from_gallery(){
let alertBox = await this.alertclt.create({
  header:'Choose From',
  buttons:[
    {
       text:'Gallery',
       handler:()=>{
       this.camera.getPicture(this.galleryOptions).then(res=>{
      //  console.log('responce = ', res);
       let showImage = this.webView.convertFileSrc(res)
       this.imgURL = showImage
  })
       }
    }
  ]
})
await alertBox.present();
}

async click_Photo(){
  let alertBox = await this.alertclt.create({
    header:'Camera',
    buttons:[
      {
         text:'Camera',
         handler:()=>{
         this.camera.getPicture(this.cameraOptions).then(res=>{
         console.log('responce = ', res);
         let showImage = this.webView.convertFileSrc(res)
         this.imgURL = showImage
    })
         }
      }
    ]
  })
  await alertBox.present();
  }

  removePhoto(){
    this.imgURL = ''
  }


}

