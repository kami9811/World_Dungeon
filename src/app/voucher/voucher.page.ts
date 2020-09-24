import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.page.html',
  styleUrls: ['./voucher.page.scss'],
})
export class VoucherPage implements OnInit {
  // 仮置き
  voucher_contents: any = [
    "ラーメン1杯プレゼント",
    "魚雷つけ麺1杯プレゼント",
    "いきなり団子1個プレゼント",
    "ドリンク１本プレゼント",
    "お土産1品プレゼント"
  ]

  constructor() { }

  ngOnInit() {
  }

}
