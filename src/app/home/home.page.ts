import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: string = "";

  posObj: any = {};  // 登録時のオブジェクト
  resObj: any = {};  // APIから返された値

  constructor(
    private router: Router,
    public gs: GlobalService,
  ) {}


  navigateToDungeon = () => {
    // console.log(this.id);
    this.posObj['id'] = this.id;
    const body = this.posObj;

    this.gs.http('https://kn46itblog.com/hackathon/Hack2-20200923/php_apis/checkId.php', body).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));
        this.resObj = res;
        console.log(this.resObj);
        if(this.resObj['status'] == 200){
          this.router.navigate(['/start', this.id]);
        }
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }
  navigateToVoucher = () => {
    this.router.navigate(['/voucher']);
  }
  navigateToLogin = () => {
    this.router.navigate(['/login']);
  }

}
