import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
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
  ngOnInit() {
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
      this.router.navigate(['/home'])
    }else{
      this.isOtpError = true;
      this.otpErrorMsg = 'Invalid OTP entered.';
    }
    // this.httpClient.post(this.api_url + '/login/validateOtp', this.formdata)
    // .subscribe((response: any) => {
    //   if(response.status == 'success'){
    //     window.localStorage.setItem("mobile",this.formdata.mobile);
    //     window.localStorage.setItem('online_id', response.msg.online_id);
    //     window.localStorage.setItem('name', response.msg.fbookingname);
    //     window.localStorage.setItem('email', response.msg.bookingemail);
    //     this.storage.set('mobile', this.formdata.mobile);
    //     this.storage.set('online_id', response.msg.online_id);
    //     this.storage.set('name', response.msg.fbookingname);
    //     this.storage.set('email', response.msg.bookingemail);
    //     this.router.navigate(['/home'])
    //   }else{
    //     this.isOtpError = true;
    //     this.otpErrorMsg = 'Invalid OTP entered.';
    //   }
    // }, (error)=>{
    //   this.isOtpError = true;
    //   this.otpErrorMsg = 'Unexpected error occured. Please try again later.';
    // })
  }

}
