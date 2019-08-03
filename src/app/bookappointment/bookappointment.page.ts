import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.page.html',
  styleUrls: ['./bookappointment.page.scss'],
})
export class BookappointmentPage implements OnInit {

  constructor( public toastController :ToastController ) { }


  sessionList: Array<any> = [
    { 
      name: 'Morning', 
      timeList : [
        { name : 'Morning', value : 1 }
      ] 
    },
    { name: 'Evening', 
      timeList : [
        { name : '7:30 pm', value : 2 },
        { name : '8:00 pm', value : 3 },
        { name : '8:30 pm', value : 4 },
        { name : '9:00 pm', value : 5 }
      ] 
    },
  ];
  time: Array<any>;
  changeTime(count) {
    this.time = this.sessionList.find(con => con.name == count).time;
  }

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
