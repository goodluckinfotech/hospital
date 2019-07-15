import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formData = {
    name : '',
    email : '',
    mobile : '',
    password : ''
  }


  constructor(public toastController : ToastController) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Registration Sucessfully',
      duration: 2000
    });
    toast.present();
  }


}
