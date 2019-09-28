import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public loadingController: LoadingController,
    private storage: Storage,
    @Inject('API_URL') private api_url: string
    ) { }
  formdata = {
    mobile : '',
    otp : ''
  };
  errorMsg = '';
  otpErrorMsg = '';
  isError = false;
  isOtpSent = false;
  isOtpError = false;
  otp = '';
  loggedUserData = null;
  ngOnInit() {
    // alert(navigator.onLine);
    let online_id, name, mobile;
    this.storage.get('online_id').then((value) => { online_id = value; });
    this.storage.get('name').then((value) => { name = value; });
    this.storage.get('mobile').then((value) => { mobile = value; });
    online_id = window.localStorage.getItem('online_id');
    name = window.localStorage.getItem('name');
    mobile = window.localStorage.getItem('mobile');
    if(online_id & name & mobile){
      this.router.navigate(['/home'])
    }
  }

  doLogin(){
    this.isError = false;
    this.otp = '';
    if(!this.formdata.mobile || this.formdata.mobile == ''){
      this.isError = true;
      this.errorMsg = 'mobile number empty';
      return;
    }
    this.httpClient.post(this.api_url + '/login/checkLogin', this.formdata)
    .subscribe((response: any) => {
      if(response.status == 'success'){
        this.isOtpSent = true;
        this.otp = response.msg;
        this.loggedUserData = response.data;
        return false;
      }else{
        this.isError = true;
        this.errorMsg = 'Mobile number wrong.';
      }
    }, (error)=>{
      this.isError = true;
      this.errorMsg = 'Unexpected error occured. Please try again later.';
    })
  }

  validateOtp(){
    if(!this.formdata.otp || this.formdata.otp == ''){
      this.isOtpError = true;
      this.otpErrorMsg = 'otp empty';
      return;
    }
    if(this.otp == this.formdata.otp){
      window.localStorage.setItem("mobile",this.loggedUserData.bookingphone);
      window.localStorage.setItem('online_id', this.loggedUserData.online_id);
      window.localStorage.setItem('name', this.loggedUserData.fbookingname);
      window.localStorage.setItem('email', this.loggedUserData.bookingemail);
      this.storage.set('mobile', this.loggedUserData.bookingphone);
      this.storage.set('online_id', this.loggedUserData.online_id);
      this.storage.set('name', this.loggedUserData.fbookingname);
      this.storage.set('email', this.loggedUserData.bookingemail);
      this.router.navigate(['/home']);
    }else{
      this.isOtpError = true;
      this.otpErrorMsg = 'Invalid OTP entered.';
    }
  }
  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
}
