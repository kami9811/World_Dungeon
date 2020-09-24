import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate = () => {
    this.router.navigate(['/game']);
  }

}
