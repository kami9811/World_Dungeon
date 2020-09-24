import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  id: string = '';

  firstName: string = "";
  firstScore: Number = 0;
  secondName: string = "";
  secondScore: Number = 0;
  thirdName: string = "";
  thirdScore: Number = 0;
  forthName: string = "";
  forthScore: Number = 0;
  fifthName: string = "";
  fifthScore: Number = 0;

  posObj: any = {};
  getObj: any = {};  // API取得のオブジェクト

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public gs: GlobalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.id = params['id']
    );
    console.log(this.id);
    this.posObj['id'] = this.id;

    const body = this.posObj;
    this.gs.http('https://kn46itblog.com/hackathon/Hack2-20200923/php_apis/getRanking.php', body).subscribe(
      res => {
        this.firstName = res['score_list']['rank1']['name'];
        this.firstScore = res['score_list']['rank1']['score'];
        this.secondName = res['score_list']['rank2']['name'];
        this.secondScore = res['score_list']['rank2']['score'];
        this.thirdName = res['score_list']['rank3']['name'];
        this.thirdScore = res['score_list']['rank3']['score'];
        this.forthName = res['score_list']['rank4']['name'];
        this.forthScore = res['score_list']['rank4']['score'];
        this.fifthName = res['score_list']['rank5']['name'];
        this.fifthScore = res['score_list']['rank5']['score'];
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  navigate = () => {
    this.router.navigate(['/game', this.id]);
  }

}
