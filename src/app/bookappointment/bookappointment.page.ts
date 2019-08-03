import { Component, OnInit, Inject } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.page.html',
  styleUrls: ['./bookappointment.page.scss'],
})
export class BookappointmentPage implements OnInit {

  constructor( 
    public toastController :ToastController,
    private httpClient: HttpClient,
    private router: Router,
    private storage: Storage,
    @Inject('API_URL') private api_url: string 
    ) { }

  formdata = {
    name : '',
    mobile : '',
    date : '',
    age : null,
    session : null,
    time : null
  };
  errorMsg = '';
  isError = false;
  isSuccess = false;
  sessionList: Array<any> = [
    { 
      sessionName: 'Morning',
      sessionValue: 1, 
      timeList : [
        { name : 'Morning', value : 1 }
      ] 
    },
    { 
      sessionName: 'Evening', 
      sessionValue: 2, 
      timeList : [
        { name : '7:30 pm', value : 2 },
        { name : '8:00 pm', value : 3 },
        { name : '8:30 pm', value : 4 },
        { name : '9:00 pm', value : 5 }
      ] 
    },
  ];
  selectedSessionTimeList : Array<any> = [];
  changeTime(session:any) {
    this.selectedSessionTimeList = session.timeList;
    this.formdata.session = session.sessionValue;
  }

  ngOnInit() {
    this.storage.get('mobile').then((data)=>{ 
      this.formdata.mobile = data;
    });
    if(!this.formdata.mobile || this.formdata.mobile == ''){
      this.formdata.mobile =  window.localStorage.getItem('name');
    }
  }

  bookAppointment(){
    this.isError = false;
    this.isSuccess = false;
    if(!this.formdata.name || this.formdata.name == ''){
      this.isError = true;
      this.errorMsg = 'name empty';
      return;
    }
    if(!this.formdata.mobile || this.formdata.mobile == ''){
      this.isError = true;
      this.errorMsg = 'mobile number empty';
      return;
    }
    if(!this.formdata.age || this.formdata.age == ''){
      this.isError = true;
      this.errorMsg = 'Age empty';
      return;
    }
    if(!this.formdata.date || this.formdata.date == ''){
      this.isError = true;
      this.errorMsg = 'Date empty';
      return;
    }
    if(!this.formdata.session || this.formdata.session == ''){
      this.isError = true;
      this.errorMsg = 'Choose session';
      return;
    }
    if(!this.formdata.time || this.formdata.time == ''){
      this.isError = true;
      this.errorMsg = 'Choose time';
      return;
    }
    this.formdata.date = this.getFormattedDate(this.formdata.date);
    this.httpClient.post(this.api_url + '/appoinment/book_appointment', this.formdata)
    .subscribe((response: any) => {
      if(response.status == 'success'){
        this.isSuccess = true;
        this.router.navigate(['/home']);
      }else{
        this.isError = true;
        this.errorMsg = response.msg;
      }
    }, (error)=>{console.log(error)})
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Booking Appoinment Sucessfully',
      duration: 2000
    });
    toast.present();
  }

  minDate(){	
    let today = new Date();  
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    return date;
  }

  getFormattedDate(date){
    let today = new Date(date);  
    let d : any = today.getDate();
    let m : any = today.getMonth() + 1;
    let y : any = today.getFullYear();
    if(d<10) 
    {
        d='0'+d;
    } 

    if(m<10) 
    {
        m='0'+m;
    } 
    let dateFormatted = d + '/' + m + '/' + y;
    return dateFormatted;
  }
  

}
