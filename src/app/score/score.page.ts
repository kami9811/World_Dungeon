import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {
  score: Number;
  rank: string = "";
  getVoucher: Boolean = true;
  name: string = '';

  id: string = '';

  // moveButton: string = "登録・クーポン獲得";
  moveButton: string = "スコア登録";

  posObj: any = {};
  getObj: any = {};

  constructor(
    public gs: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.score = params['bingoScore'];
      }
    )
    console.log(this.id);
    console.log(this.score);
    if(this.score > 1500){
      this.rank = "S";
    }
    else if(this.score > 1000){
      this.rank = "A";
    }
    else{
      this.rank = "B";
    }
  }

  navigateToVoucher = () => {
    // this.router.navigate(['/voucher']);
    this.router.navigate(['/']);
  }

  regist = () => {
    this.posObj['id'] = this.id;
    this.posObj['score'] = this.score;
    this.posObj['name'] = this.name;
    const body = this.posObj;
    this.gs.http('https://kn46itblog.com/hackathon/Hack2-20200923/php_apis/registScore.php', body).subscribe(
      res => {
        console.log(res['status']);
        this.navigateToVoucher();
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

}
