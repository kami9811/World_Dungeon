import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  id: string = "";
  password: string = "";

  posObj: any = {};  // 登録時のオブジェクト
  resObj: any = {};  // APIから返された値

  constructor(
    private router: Router,
    public gs: GlobalService,
  ) { }

  ngOnInit() {

  }

  navigate = () => {
    this.posObj['id'] = this.id;
    this.posObj['password'] = this.password;
    const body = this.posObj;

    this.gs.http('https://kn46itblog.com/hackathon/Hack2-20200923/php_apis/login.php', body).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));
        this.resObj = res;
        console.log(this.resObj);
        if(this.resObj['status'] == 200){
          this.router.navigate(['/map-regist', this.id]);
        }
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

}
