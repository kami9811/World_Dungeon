import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  photo_num: string = '';
  currentImage: any;
  photo_description: string = 'ヒントの撮影には下のボタンを押してください';

  postObj: any = {};
  getObj: any = {};

  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private camera: Camera,
    private gs: GlobalService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.photo_num = params['num'].split('photo')[1];
        this.id = params['id'];
        console.log(this.id);
      }
    );
  }

  takePicture = () => {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
      this.postObj['image'] = this.currentImage;
      this.postObj['id'] = this.id;
      this.postObj['beacon_id'] = this.photo_num;

      const body = this.postObj;
      this.gs.http('https://kn46itblog.com/hackathon/Hack2-20200923/php_apis/registImg.php', body).subscribe(
        res => {
          console.log(res['status']);
        },
        error => {}
      )
    }, (err) => {
      // Handle error
      console.log("Camera issue:" + err);
    });
  }


}
