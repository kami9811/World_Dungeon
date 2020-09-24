import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapRegistPage } from './map-regist.page';

describe('MapRegistPage', () => {
  let component: MapRegistPage;
  let fixture: ComponentFixture<MapRegistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRegistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapRegistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
