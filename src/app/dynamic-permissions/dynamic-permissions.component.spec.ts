import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicPermissionsComponent } from './dynamic-permissions.component';

describe('DynamicPermissionsComponent', () => {
  let component: DynamicPermissionsComponent;
  let fixture: ComponentFixture<DynamicPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicPermissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
