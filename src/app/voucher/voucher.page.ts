import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  // 仮置き
  voucher_contents: any = [
    "お土産1品プレゼント"
  ]

  constructor() { }

  ngOnInit() {
  }

}
