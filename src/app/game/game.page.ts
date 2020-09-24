import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  id: string = "";

  first_hour: any;
  first_min: any;
  first_sec: any;
  set_hour: any = 0;
  set_min: any = 20;
  set_sec: any = 0;
  remaining_hour: any = 0;
  remaining_min: any = 20;
  remaining_sec: any = 0;

  treasure_times: Number = 0;

  bottom_title: string = "ビンゴ";
  bottom_bingo: Boolean = true;
  bottom_photo: Boolean = false;
  bingo_description: Boolean = true;
  // ビンゴの選出された数
  // bingo: Number[];
  bingo: Number[] = [1, 3, 9];  // 仮置き
  bingo1: Number[] = [1, 2, 3];
  bingo2: Number[] = [4, 5, 6];
  bingo3: Number[] = [7, 8, 9];
  // bingo_num: Number [];
  bingo_num: Number[] = [...new Array(3).keys()];  // 開けられる数, 仮置き
  bingoScore: any = 0;  // ビンゴの結果

  // 描画情報
  mapNum: Number[] = [...new Array(16).keys()];  // マップサイズ
  mapAtt: Number[] = new Array(256);  // マップ値
  mapCla: string[] = new Array(256);  // マップクラス
  beaNum: string[] = new Array(256);  // ビーコンマップ情報
  posObj: any = {};  // 登録時のオブジェクト
  getObj: any = {};  // 更新時のオブジェクト

  // BLE
  bleContents1: string = "";
  bleContents2: string = "";
  bleContents3: string = "";
  bleContents4: string = "";


  constructor(
    public gs: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private ble: BLE,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.id = params['id']
    );
    console.log(this.id);
    // this.posObj['id'] = this.id;
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
    this.gs.http('https://kn46itblog.com/hackathon/Hack2-20200923/php_apis/getTime.php', body).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));
        this.getObj = res;
        console.log(this.getObj);
        this.first_hour = res['hour'];
        this.first_min = res['min'];
        this.first_sec = res['sec'];
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  navigateToScore = () => {
    this.router.navigate(['/score', this.id, this.bingoScore]);
  }

  getTime = () => {
    const body = this.posObj;
    this.gs.http('https://kn46itblog.com/hackathon/Hack2-20200923/php_apis/getTime.php', body).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));
        this.getObj = res;
        console.log(this.getObj);
        this.remaining_min = this.set_min - (res['min'] - this.first_min) - 1;
        if(this.remaining_min < 0){
          this.remaining_min = 60 + this.remaining_min;
        }
        this.remaining_sec = this.set_sec - (res['sec'] - this.first_sec);
        if(this.remaining_sec < 0){
          this.remaining_sec = 60 + this.remaining_sec;
        }
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  onBLE = () => {
    this.getTime();
    this.ble.scan([], 1).subscribe(
      device => {
        // 1号機
        if(device['id'] == "180A0B3E-FC28-C7F3-EFC5-60A4E95125A8"){
          this.bleContents1 = "信号の強度: ";
          this.bleContents2 =  device['rssi'];
          // this.bleContents = device.rssi;
          if(Number(device['rssi']) > -40){
            this.bleContents3 = "1番の宝発見！";

            this.bingoScore = this.bingoScore + 100;
          }
          else{
            this.bleContents3 = "";
          }
        }
        // 2号機
        if(device['id'] == "C5CD47FD-3C74-35BB-551B-C8995C88BC0A"){
          this.bleContents1 = "信号の強度: ";
          this.bleContents2 =  device['rssi'];
          // this.bleContents = device.rssi;
          if(Number(device['rssi']) > -40){
            this.bleContents3 = "2番の宝発見！スコアが増えました";

            this.bingoScore = this.bingoScore + 100;
          }
          else{
            this.bleContents3 = "";
          }
        }
        // 3号機
        if(device['id'] == "C5CD47FD-3C74-35BB-551B-C8995C88BC0A"){
          this.bleContents1 = "信号の強度: ";
          this.bleContents2 =  device['rssi'];
          // this.bleContents = device.rssi;
          if(Number(device['rssi']) > -40){
            this.bleContents3 = "3番の宝発見！スコアが増えました";

            this.bingoScore = this.bingoScore + 100;
          }
          else{
            this.bleContents3 = "";
          }
        }
      }
    );
  }

}
