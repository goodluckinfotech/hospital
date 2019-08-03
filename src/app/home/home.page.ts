import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  appoinment : any;
  message : any = false;
  constructor(
    @Inject('API_URL') private api_url: string,
    private httpClient: HttpClient,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.getAppointment();
  }
  getAppointment(){
    let mobile = null;
    this.storage.get('mobile').then((data)=>{ 
      mobile = data;
    });
    if(!mobile || mobile == ''){
      mobile =  window.localStorage.getItem('mobile');
    }
    let requestData = {
      mobile : window.localStorage.getItem("mobile")
    };
    this.httpClient.post(this.api_url + '/Appoinment/getLast', requestData)
    .subscribe((response: any) => {
      if(response.status == 'success'){
        this.appoinment = response.msg;
      }else{
        this.message = 'No active appoinment found. You can book new appoinment.';
      }
    }, (error)=>{console.log(error)})
  }

}
