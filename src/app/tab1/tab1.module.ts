import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';




import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AndroidPermissions,Camera,WebView],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
