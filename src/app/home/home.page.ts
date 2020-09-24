import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: string = "";

  constructor(
    private router: Router,
  ) {}


  navigateToDungeon = () => {
    // console.log(this.id);
    this.router.navigate(['/start']);
  }
  navigateToVoucher = () => {
    this.router.navigate(['/voucher']);
  }
  navigateToLogin = () => {
    this.router.navigate(['/login']);
  }

}
