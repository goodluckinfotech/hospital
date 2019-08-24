import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appoinmenthistory',
  templateUrl: './appoinmenthistory.page.html',
  styleUrls: ['./appoinmenthistory.page.scss'],
})
export class AppoinmenthistoryPage implements OnInit {

  constructor( private router: Router,) { }

  ngOnInit() {
  }


  // GotoPrescription(){
  //   this.router.navigate(['/prescriptionlist'])
  // }

}
