import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-token-display',
  templateUrl: './token-display.page.html',
  styleUrls: ['./token-display.page.scss'],
})
export class TokenDisplayPage implements OnInit {
  appoinments : any;
  statuses : any;
  message : any = false;
  constructor(
    @Inject('API_URL') private api_url: string,
    private httpClient: HttpClient,
  ) { }

  ngOnInit() {
    this.getAppointments();
    setInterval(() => {
      this.getAppointments(); 
    }, 10000);
  }

  getAppointments(){
    let requestData = {
      mobile : window.localStorage.getItem("mobile"),
      password : window.localStorage.getItem("password")
    };
    this.httpClient.post(this.api_url + '/Appoinment/getTokenDisplay', requestData)
    .subscribe((response: any) => {
      if(response.status == 'success'){
        this.appoinments = response.msg.online_appointments;
        this.statuses = response.msg.statuses;
      }else{
        this.message = 'No active appoinment found. You can book new appoinment.';
      }
    }, (error)=>{console.log(error)})
  }

  formatPhone(phone){
    let formattedPhone = '';
    formattedPhone += phone.slice(0,2);
    formattedPhone += '******';
    formattedPhone += phone.slice(-2);
    return formattedPhone;
  }

}
