import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions } from '@awesome-cordova-plugins/media-capture/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';
import {AlertController} from '@ionic/angular'
import { File } from '@awesome-cordova-plugins/file/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';




import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MediaCapture,Media,Camera,WebView,VideoPlayer,AlertController,File,NativeStorage],

  declarations: [Tab2Page]
})
export class Tab2PageModule {}
