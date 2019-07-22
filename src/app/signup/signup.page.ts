import { Component, OnInit, Inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formdata = {
    name : '',
    email : '',
    mobile : '',
    password : ''
  }
  errorMsg = '';
  isError = false;
  isSuccess = false;
  constructor(
    public toastController : ToastController,
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage,
    @Inject('API_URL') private api_url: string
    ) { }

  ngOnInit() {
  }

  doRegister(){
    this.isError = false;
    this.isSuccess = false;
    if(!this.formdata.name || this.formdata.name == ''){
      this.isError = true;
      this.errorMsg = 'name empty';
      return;
    }
    if(!this.formdata.email || this.formdata.email == ''){
      this.isError = true;
      this.errorMsg = 'email empty';
      return;
    }
    if(!this.formdata.mobile || this.formdata.mobile == ''){
      this.isError = true;
      this.errorMsg = 'mobile number empty';
      return;
    }
    if(!this.formdata.password || this.formdata.password == ''){
      this.isError = true;
      this.errorMsg = 'password empty';
      return;
    }
    this.httpClient.post(this.api_url + '/login/register', this.formdata)
    .subscribe((response: any) => {
      if(response.status == 'success'){
        this.isSuccess = true;
        this.storage.clear();
        this.storage.set('name', this.formdata.mobile);
        this.storage.set('email', this.formdata.mobile);
        this.storage.set('mobile', this.formdata.mobile);
        this.storage.set('password', this.formdata.password);
        this.storage.set('online_id', response.msg.online_id);
        window.localStorage.clear();
        window.localStorage.setItem('name', this.formdata.mobile);
        window.localStorage.setItem('email', this.formdata.mobile);
        window.localStorage.setItem('mobile', this.formdata.mobile);
        window.localStorage.setItem('password', this.formdata.password);
        window.localStorage.setItem('online_id', response.msg.online_id);
        window.localStorage.navigate(['/home'])
      }else{
        this.isError = true;
        this.errorMsg = response.msg;
      }
    }, (error)=>{console.log(error)})
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registration Sucessfully',
      duration: 2000
    });
    toast.present();
  }


}
