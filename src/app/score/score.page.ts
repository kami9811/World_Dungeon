import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  score: Number;
  rank: string = "";
  getVoucher: Boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  regist = () => {

  }
  navigateToVoucher = () => {
    this.router.navigate(['/voucher']);
  }

}
