import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  remaining_hour: string = "";
  remaining_min: string = "";
  remaining_sec: string = "";

  treasure_times: Number = 0;

  bottom_title: string = "ビンゴ";
  bottom_bingo: Boolean = true;
  bottom_photo: Boolean = false;
  bingo_description: Boolean = true;
  // ビンゴの選出された数
  // bingo: Number[];
  bingo: Number[] = [1, 3, 9];  // 仮置き
  // bingo_num: Number [];
  bingo_num: Number[] = [...new Array(3).keys()];  // 開けられる数, 仮置き

  // 描画情報
  mapNum: Number[] = [...new Array(16).keys()];  // マップサイズ
  mapAtt: Number[] = new Array(256);  // マップ値
  mapCla: string[] = new Array(256);  // マップクラス
  beaNum: string[] = new Array(256);  // ビーコンマップ情報
  posObj: any = {};  // 登録時のオブジェクト
  getObj: any = {};  // 更新時のオブジェクト

  constructor(
    public gs: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.posObj['id'] = 'myhome';

    const body = this.posObj;
    console.log(body);
    this.gs.http('https://kn46itblog.com/hackathon/SumHackV220200916/php_apis/getMap.php', body).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));
        this.getObj = res;
        console.log(this.getObj);
        for(let i = 0; i < 256; i++){
          this.mapAtt[i] = this.getObj['map_list'][i];
          this.beaNum[i] = ' ';
          if(this.mapAtt[i] == 0){
            this.mapCla[i] = 'white';
          }
          else if(this.mapAtt[i] == -1){
            this.mapCla[i] = 'load';
          }
          else if(this.mapAtt[i] == -2){
            this.mapCla[i] = 'forrest';
          }
          else if(this.mapAtt[i] == -3){
            this.mapCla[i] = 'water';
          }
          else if(this.mapAtt[i] == 1){
            this.mapCla[i] = 'beacon1';
            this.beaNum[i] = String(this.getObj['map_list'][i]);
          }
          else if(this.mapAtt[i] == 2){
            this.mapCla[i] = 'beacon2';
            this.beaNum[i] = String(this.getObj['map_list'][i]);
          }
          else if(this.mapAtt[i] == 3){
            this.mapCla[i] = 'beacon3';
            this.beaNum[i] = String(this.getObj['map_list'][i]);
          }
        }
        console.log(this.mapAtt);
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  navigateToScore = () => {
    this.router.navigate(['/score']);
  }

}
