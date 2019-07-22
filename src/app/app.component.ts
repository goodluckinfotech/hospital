import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  online_id; 
  name; 
  mobile;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage
  ) {
    
  }
  ngOnInit() {
    this.initializeApp();
    this.checkLogin();
  }

  checkLogin(){
    this.online_id = window.localStorage.getItem('online_id');
    this.name = window.localStorage.getItem('name');
    this.mobile = window.localStorage.getItem('mobile');
    if(!this.online_id || !this.name || !this.mobile){
      this.router.navigate(['/login'])
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  logout(){
    this.storage.clear();
    window.localStorage.clear();
    this.router.navigate(['/login'])
  }
}
