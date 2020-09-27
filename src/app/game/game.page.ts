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
  treasure_description: string = "トレジャーボタンタップで宝の信号を受信！";
  hint_button: string = "探す宝をタップ！";

  bottom_title: string = "ビンゴ";
  bottom_bingo: Boolean = true;
  bottom_photo: Boolean = false;
  bingo_description: Boolean = true;
  // ビンゴの選出された数
  bingo: Number[] = [1, 3, 9];  // 仮置き
  bingo_num: Number[] = [...new Array(3).keys()];  // 開けられる数, 仮置き
  // ビンゴの開け閉めの管理
  bingo_status: Boolean[] = [
                              false, false, false,
                              false, false, false,
                              false, false, false
                            ]
  bingoScore: any = 0;  // ビンゴの結果
  // ビンゴの画像操作用変数
  bingoId1: any = 0;
  bingoId2: any = 0;
  bingoId: Number = 0;
  // ビンゴパネルをあけれるときに光らせるように、Class用の変数を作る
  bingoCla: string[] = new Array(9);
  // ビンゴのパネルを開ける枚数
  bingoOpenable: any = 0;

  // 描画情報
  mapNum: Number[] = [...new Array(16).keys()];  // マップサイズ
  mapAtt: Number[] = new Array(256);  // マップ値
  mapCla: string[] = new Array(256);  // マップクラス
  beaNum: string[] = new Array(256);  // ビーコンマップ情報
  posObj: any = {};  // 登録時のオブジェクト
  getObj: any = {};  // 更新時のオブジェクト

  // 画像格納
  image1: string = "";
  image1Flag: Boolean = false;
  image2: string = "";
  image2Flag: Boolean = false;
  image3: string = "";
  image3Flag: Boolean = false;
  imageScoreFlag: Boolean[] = [false, false, false];

  // ビーコンフラグ
  beaconFlag1: Boolean = false;
  beaconFlag2: Boolean = false;
  beaconFlag3: Boolean = false;
  beaconId1: any = 0;
  beaconId2: any = 0;
  beaconId: any = 0;
  beaconAlready: Boolean[] = [true, true, true]

  constructor(
    public gs: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
    private ble: BLE,
  ) { }

  ngOnInit() {
    for(let i = 0; i < 9; i++){
      this.bingoCla[i] = 'bingo_img';
    }

    this.route.params.subscribe(
      params => this.id = params['id']
    );
    console.log(this.id);
    this.posObj['id'] = this.id;
    // this.posObj['id'] = 'myhome';

    const body = this.posObj;
    console.log(body);

    // マップ情報の取得
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

    this.gs.http('https://kn46itblog.com/hackathon/Hack2-20200923/php_apis/getImg.php', body).subscribe(
      res => {
        console.log(res);
        this.image1 = res['1'];
        this.image2 = res['2'];
        this.image3 = res['3'];
      }
    )
  }

  navigateToScore = () => {
    // スコアリングしてから遷移
    this.bingoScore = 100;
    if(this.bingo_status[0] == true && this.bingo_status[1] == true && this.bingo_status[2] == true){
      this.bingoScore = this.bingoScore * 1.5;
    }
    if(this.bingo_status[3] == true && this.bingo_status[4] == true && this.bingo_status[5] == true){
      this.bingoScore = this.bingoScore * 1.5;
    }
    if(this.bingo_status[6] == true && this.bingo_status[7] == true && this.bingo_status[8] == true){
      this.bingoScore = this.bingoScore * 1.5;
    }
    if(this.bingo_status[0] == true && this.bingo_status[3] == true && this.bingo_status[6] == true){
      this.bingoScore = this.bingoScore * 1.5;
    }
    if(this.bingo_status[1] == true && this.bingo_status[4] == true && this.bingo_status[7] == true){
      this.bingoScore = this.bingoScore * 1.5;
    }
    if(this.bingo_status[2] == true && this.bingo_status[5] == true && this.bingo_status[8] == true){
      this.bingoScore = this.bingoScore * 1.5;
    }
    if(this.bingo_status[0] == true && this.bingo_status[4] == true && this.bingo_status[8] == true){
      this.bingoScore = this.bingoScore * 1.5;
    }
    if(this.bingo_status[2] == true && this.bingo_status[4] == true && this.bingo_status[6] == true){
      this.bingoScore = this.bingoScore * 1.5;
    }

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
        if(res['sec'] - this.first_sec <= 0){
          this.remaining_min = this.remaining_min + 1;
        }
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

  // ビーコンを検知するときの処理
  onBLE = () => {
    this.getTime();
    console.log(this.beaconAlready);
    this.ble.scan([], 1).subscribe(
      device => {
        // 1号機
        if(device['id'] == "180A0B3E-FC28-C7F3-EFC5-60A4E95125A8" && this.beaconAlready[0] && this.bingoOpenable == 0){
          if(Number(device['rssi']) > -40){
            if((this.set_min - this.remaining_min) <= 5){
              this.bingoOpenable = 3;
              if(this.imageScoreFlag[0] == true){
                this.bingoOpenable = this.bingoOpenable - 1;
              }
            }
            else if((this.set_min - this.remaining_min) <= 10){
              this.bingoOpenable = 2;
              if(this.imageScoreFlag[0] == true){
                this.bingoOpenable = this.bingoOpenable - 1;
              }
            }
            else{
              this.bingoOpenable = 1;
            }
            this.treasure_description = "お宝ゲット！ビンゴの中央から" + this.bingoOpenable+ "個あけられるよ！";
            this.beaconAlready[0] = false;
            for(let i = 0; i < 3; i++){
              this.bingoCla[3 * i + 1] = 'bingo_img_openable';
            }
          }
          else if(Number(device['rssi']) > -50){
            this.treasure_description = "宝の至近距離でトレジャーボタンをタップ！";
          }
          else if(Number(device['rssi']) > -80){
            this.treasure_description = "お宝の匂いがするぞ！";
          }
        }
        // 2号機
        else if(device['id'] == "C5CD47FD-3C74-35BB-551B-C8995C88BC0A" && this.beaconAlready[1] && this.bingoOpenable == 0){
          if(Number(device['rssi']) > -40){
            if((this.set_min - this.remaining_min) <= 5){
              this.bingoOpenable = 3;
              if(this.imageScoreFlag[1] == true){
                this.bingoOpenable = this.bingoOpenable - 1;
              }
            }
            else if((this.set_min - this.remaining_min) <= 10){
              this.bingoOpenable = 2;
              if(this.imageScoreFlag[1] == true){
                this.bingoOpenable = this.bingoOpenable - 1;
              }
            }
            else{
              this.bingoOpenable = 1;
            }
            this.treasure_description = "お宝ゲット！ビンゴの左列から" + 3 + "個あけられるよ！";
            this.beaconAlready[1] = false;
            for(let i = 0; i < 3; i++){
              this.bingoCla[3 * i] = 'bingo_img_openable';
            }
          }
          else if(Number(device['rssi']) > -50){
            this.treasure_description = "宝の至近距離でトレジャーボタンをタップ！";
          }
          else if(Number(device['rssi']) > -80){
            this.treasure_description = "お宝の匂いがするぞ！";
          }
        }
        // 3号機
        else if(device['id'] == "3866D0DC-04FC-3DD1-FB3B-F600E88ABC57" && this.beaconAlready[2] && this.bingoOpenable == 0){
          if(Number(device['rssi']) > -40){
            if((this.set_min - this.remaining_min) <= 5){
              this.bingoOpenable = 3;
              if(this.imageScoreFlag[2] == true){
                this.bingoOpenable = this.bingoOpenable - 1;
              }
            }
            else if((this.set_min - this.remaining_min) <= 10){
              this.bingoOpenable = 2;
              if(this.imageScoreFlag[2] == true){
                this.bingoOpenable = this.bingoOpenable - 1;
              }
            }
            else{
              this.bingoOpenable = 1;
            }
            this.treasure_description = "お宝ゲット！ビンゴの右列から" + 3 + "個あけられるよ！";
            this.beaconAlready[2] = false;
            for(let i = 0; i < 3; i++){
              this.bingoCla[3 * i + 2] = 'bingo_img_openable';
            }
          }
          else if(Number(device['rssi']) > -50){
            this.treasure_description = "宝の至近距離でトレジャーボタンをタップ！";
          }
          else if(Number(device['rssi']) > -80){
            this.treasure_description = "お宝の匂いがするぞ！";
          }
        }
      }
    );
  }

  // ビーコンエリアをタップした時の処理
  onBeacon = (e: any) => {
    this.getTime();
    this.beaconId1 = Number(e.target.id.split(":")[1]);
    this.beaconId2 = Number(e.target.id.split(":")[2]);
    this.beaconId = 16 * this.beaconId1 + this.beaconId2;

    if(this.mapAtt[this.beaconId] == 1){
      this.beaconFlag1 = true;
      this.beaconFlag2 = false;
      this.beaconFlag3 = false;
      this.hint_button = "ヒントを表示する";
    }
    else if(this.mapAtt[this.beaconId] == 2){
      this.beaconFlag1 = false;
      this.beaconFlag2 = true;
      this.beaconFlag3 = false;
      this.hint_button = "ヒントを表示する";
    }
    else if(this.mapAtt[this.beaconId] == 3){
      this.beaconFlag1 = false;
      this.beaconFlag2 = false;
      this.beaconFlag3 = true;
      this.hint_button = "ヒントを表示する";
    }
    else{
      this.beaconFlag1 = false;
      this.beaconFlag2 = false;
      this.beaconFlag3 = false;
      this.hint_button = "探す宝をタップ！"
    }
    // console.log(this.beaconFlag1);
    // console.log(this.beaconFlag2);
    // console.log(this.beaconFlag3);
    // console.log(e.target.id);
    // console.log(this.beaconId);
  }

  // ヒント写真の開示
  onHint = () => {
    this.getTime();
    if(this.image1Flag == false && this.image2Flag == false && this.image3Flag == false){
      if(this.beaconFlag1 == true){
        this.image1Flag = true;
        this.bottom_bingo = false;
        this.bottom_photo = true;
        this.bottom_title = "ヒント";
        this.hint_button = "ヒントを非表示に";
        this.imageScoreFlag[0] = true;
      }
      else if(this.beaconFlag2 == true){
        this.image2Flag = true;
        this.bottom_bingo = false;
        this.bottom_photo = true;
        this.bottom_title = "ヒント";
        this.hint_button = "ヒントを非表示に";
        this.imageScoreFlag[1] = true;
      }
      else if(this.beaconFlag3 == true){
        this.image3Flag = true;
        this.bottom_bingo = false;
        this.bottom_photo = true;
        this.bottom_title = "ヒント";
        this.hint_button = "ヒントを非表示に";
        this.imageScoreFlag[2] = true;
      }
    }
    else{
      this.image1Flag = false;
      this.image2Flag = false;
      this.image3Flag = false;
      this.bottom_bingo = true;
      this.bottom_photo = false;
      this.bottom_title = "ビンゴ";
      this.hint_button = "探す宝をタップ！";
    }
    console.log(this.image1Flag);
    console.log(this.image2Flag);
    console.log(this.image3Flag);
  }

  // ビンゴをひっくり返すときの処理
  onBingo = (e: any) => {
    this.getTime();
    this.bingoId1 = Number(e.target.id.split(':')[1]);
    this.bingoId2 = Number(e.target.id.split(':')[2]);
    // 判定項目: bingoClaの該当エリアがOpenableか、Openableが1以上か
    // Openableが0になるか、ひっくり返したときにbingoClaを戻す
    if(this.bingoCla[3 * this.bingoId1 + this.bingoId2] == 'bingo_img_openable'){
      this.bingo_status[3 * this.bingoId1 + this.bingoId2] = !this.bingo_status[3 * this.bingoId1 + this.bingoId2];
      this.bingoCla[3 * this.bingoId1 + this.bingoId2] == 'bingo_img';
      this.bingoOpenable = this.bingoOpenable - 1;
    }
    if(this.bingoOpenable == 0){
      for(let i = 0; i < 9; i++){
        this.bingoCla[i] = 'bingo_img';
      }
      // トレジャーボタンの記述も初期化する.
      this.treasure_description = "トレジャーボタンタップで宝の信号を受信！";
    }
    // console.log(e.target.id);
    // console.log(this.bingo_status);
  }
}
