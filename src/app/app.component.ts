import { Component } from '@angular/core';
declare var window:any
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
}
ngAfterViewInit() {


  document.addEventListener("deviceready", function () {
  var successCallback = function () {
  console.log("The screenshots are not allowed now.");
  };
  
  var errorCallback = function (err) {
  console.error("An error ocurred : " + err);
  };
  
  window.OurCodeWorldpreventscreenshots.disable(successCallback, errorCallback);
  }, false);
  }

}

