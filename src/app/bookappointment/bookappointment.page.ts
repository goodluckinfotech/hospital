import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.page.html',
  styleUrls: ['./bookappointment.page.scss'],
})
export class BookappointmentPage implements OnInit {

  constructor( public toastController :ToastController ) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Booking Appoinment Sucessfully',
      duration: 2000
    });
    toast.present();
  }



  

}
