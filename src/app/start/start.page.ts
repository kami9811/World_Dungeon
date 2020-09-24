import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.id = params['id']
    );
    console.log(this.id);
  }

  navigate = () => {
    this.router.navigate(['/game']);
  }

}
