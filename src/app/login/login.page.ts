import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) { }
  formdata = {
    mobile : '',
    password : ''
  };
  errorMsg = '';
  isError = false;
  ngOnInit() {
  }

  doLogin(){
    this.isError = false;
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
    this.httpClient.post('http://demo.goodluckinfotech.com/skinclinic/api/login/checkLogin', this.formdata)
    .subscribe((response: any) => {
      if(response.status == 'success'){
        this.router.navigate(['/home'])
      }else{
        this.isError = true;
        this.errorMsg = 'Mobile / Password wrong.';
      }
    }, (error)=>{console.log(error)})
  }

}
