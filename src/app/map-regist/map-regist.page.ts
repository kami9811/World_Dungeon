import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-map-regist',
  templateUrl: './map-regist.page.html',
  styleUrls: ['./map-regist.page.scss'],
})
export class MapRegistPage implements OnInit {
  mapNum: Number[] = [...new Array(16).keys()];  // 描画用リスト
  mapAtt: Number[] = new Array(256);  // 描画内容メモ
  mapCla: string[] = new Array(256);  // 描画クラス
  beaNum: string[] = new Array(256);  // 描画ビーコンナンバー書き込み
  // ボタン状態検知
  load: Boolean = false;
  forrest: Boolean = false;
  water: Boolean = false;
  del: Boolean = false;
  bea: Boolean[] = [false, false, false];
  // 描画マップのid管理
  id1: any = 0;
  id2: any = 0;
  id: any = 0;
  // 重複ビーコンチェック
  beacon_check: Boolean = true;

  posObj: any = {};  // 登録時のオブジェクト
  getObj: any = {};  // 更新時のオブジェクト

  user_id: string = '';

  constructor(
    public gs: GlobalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // 初めての人用にマップ初期化するやつやってない

    this.route.params.subscribe(
      params => {
        this.user_id = params['id'];
      }
    );
    console.log(this.user_id);
    this.posObj['id'] = this.user_id;
    // this.posObj['id'] = 'myhome';

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
          if(this.mapAtt[i] == 0 || this.mapAtt[i] == undefined){
            this.mapCla[i] = 'white';
            this.mapAtt[i] = 0;
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

  // ボタン状態の更新
  onLoad = () => {
    this.load = true;
    this.forrest = false;
    this.water = false;
    this.del = false;
    this.bea[0] = false;
    this.bea[1] = false;
    this.bea[2] = false;
  }
  onForrest = () => {
    this.load = false;
    this.forrest = true;
    this.water = false;
    this.del = false;
    this.bea[0] = false;
    this.bea[1] = false;
    this.bea[2] = false;
  }
  onWater = () => {
    this.load = false;
    this.forrest = false;
    this.water = true;
    this.del = false;
    this.bea[0] = false;
    this.bea[1] = false;
    this.bea[2] = false;
  }
  onDel = () => {
    this.load = false;
    this.forrest = false;
    this.water = false;
    this.del = true;
    this.bea[0] = false;
    this.bea[1] = false;
    this.bea[2] = false;
  }
  onBeacon = (e: any) => {
    this.load = false;
    this.forrest = false;
    this.water = false;
    this.del = false;
    this.bea[0] = false;
    this.bea[1] = false;
    this.bea[2] = false;
    this.bea[e.target.id.split("beacon")[1]-1] = true;
  }

  // 描画内容の更新
  onClick = (e: any) => {
    if(this.load == true){
      // mapAttの書き換え
      // idの取得から
      this.id1 = Number(e.target.id.split(":")[1]);
      this.id2 = Number(e.target.id.split(":")[2]);
      this.id = (this.id1 * 16) + this.id2;
      // console.log(this.id);
      this.mapAtt[String(this.id)] = -1;
      this.beaNum[String(this.id)] = ' ';
      // console.log(this.mapAtt);
      // classの書き換え
      this.mapCla[String(this.id)] = 'load';
    }
    else if(this.forrest == true){
      // mapAttの書き換え
      // idの取得から
      this.id1 = Number(e.target.id.split(":")[1]);
      this.id2 = Number(e.target.id.split(":")[2]);
      this.id = (this.id1 * 16) + this.id2;
      // console.log(this.id);
      this.mapAtt[String(this.id)] = -2;
      this.beaNum[String(this.id)] = ' ';
      // console.log(this.mapAtt);
      // classの書き換え
      this.mapCla[String(this.id)] = 'forrest';
    }
    else if(this.water == true){
      // mapAttの書き換え
      // idの取得から
      this.id1 = Number(e.target.id.split(":")[1]);
      this.id2 = Number(e.target.id.split(":")[2]);
      this.id = (this.id1 * 16) + this.id2;
      // console.log(this.id);
      this.mapAtt[String(this.id)] = -3;
      this.beaNum[String(this.id)] = ' ';
      // console.log(this.mapAtt);
      // classの書き換え
      this.mapCla[String(this.id)] = 'water';
    }
    else if(this.del == true){
      // mapAttの書き換え
      // idの取得から
      this.id1 = Number(e.target.id.split(":")[1]);
      this.id2 = Number(e.target.id.split(":")[2]);
      this.id = (this.id1 * 16) + this.id2;
      this.mapAtt[String(this.id)] = 0;
      this.beaNum[String(this.id)] = ' ';
      // classの書き換え
      this.mapCla[String(this.id)] = 'white';
    }
    else if(this.bea[0] == true){
      for(let i = 0; i < 256; i++){
        if(this.mapAtt[i] == 1){
          this.beacon_check = false;
        }
      }
      if(this.beacon_check == true){
        // mapAttの書き換え
        // idの取得から
        this.id1 = Number(e.target.id.split(":")[1]);
        this.id2 = Number(e.target.id.split(":")[2]);
        this.id = (this.id1 * 16) + this.id2;
        this.mapAtt[String(this.id)] = 1;
        this.beaNum[String(this.id)] = '1';
        // classの書き換え
        this.mapCla[String(this.id)] = 'beacon1';
      }
    }
    else if(this.bea[1] == true){
      for(let i = 0; i < 256; i++){
        if(this.mapAtt[i] == 2){
          this.beacon_check = false;
        }
      }
      if(this.beacon_check == true){
        // mapAttの書き換え
        // idの取得から
        this.id1 = Number(e.target.id.split(":")[1]);
        this.id2 = Number(e.target.id.split(":")[2]);
        this.id = (this.id1 * 16) + this.id2;
        this.mapAtt[String(this.id)] = 2;
        this.beaNum[String(this.id)] = '2';
        // classの書き換え
        this.mapCla[String(this.id)] = 'beacon2';
      }
    }
    else if(this.bea[2] == true){
      for(let i = 0; i < 256; i++){
        if(this.mapAtt[i] == 3){
          this.beacon_check = false;
        }
      }
      if(this.beacon_check == true){
        // mapAttの書き換え
        // idの取得から
        this.id1 = Number(e.target.id.split(":")[1]);
        this.id2 = Number(e.target.id.split(":")[2]);
        this.id = (this.id1 * 16) + this.id2;
        this.mapAtt[String(this.id)] = 3;
        this.beaNum[String(this.id)] = '3';
        // classの書き換え
        this.mapCla[String(this.id)] = 'beacon3';
      }
    }
    this.beacon_check = true;
  }

  registMap = () => {
    // マップ情報のオブジェクト化
    for(let i = 0; i < 256; i++){
      // console.log(i);
      let n = String(i);
      this.posObj[n] = this.mapAtt[i];
    }
    // this.posObj['id'] = 'myhome';

    // POST
    const body = this.posObj;
    console.log(body);
    this.gs.http('https://kn46itblog.com/hackathon/SumHackV220200916/php_apis/registMap.php', body).subscribe(
      res => {
        console.log('success: ' + JSON.stringify(res));
      },
      error => {
        console.log('error: ' + JSON.stringify(error));
      }
    );
  }

  navigateToQr = () => {
    this.router.navigate(['/qr']);
  }
  navigateToPhoto = (e: any) => {
    this.router.navigate(['/photo', e.target.id, this.user_id]);
  }

}
