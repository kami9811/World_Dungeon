import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VoucherPage } from './voucher.page';

describe('VoucherPage', () => {
  let component: VoucherPage;
  let fixture: ComponentFixture<VoucherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
