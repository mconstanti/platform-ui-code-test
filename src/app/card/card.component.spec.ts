import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CardComponent } from "./card.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("CardComponent", () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MatCardModule, MatIconModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.provider = {
      id: "1",
      name: "John",
      address: "123 Greenway Blvd",
      phone: "8991234321",
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the provider data", () => {
    const name = el.query(By.css(".card-title"));
    const address = el.query(By.css(".provider-address"));
    const phone = el.query(By.css(".provider-phone"));
    expect(name.nativeElement.textContent).toBe(component.provider.name);
    expect(address.nativeElement.textContent).toBe(component.provider.address);
    expect(phone.nativeElement.textContent).toBe(component.provider.phone);
  });

  it("should call onAddToSelected if clicked if provider is not selected", () => {
    spyOn(component, "onAddToSelected");
    component.selected = false;
    fixture.detectChanges();
    const card = el.query(By.css(".mat-card")).nativeElement;
    card.click();
    fixture.detectChanges();
    expect(component.onAddToSelected).toHaveBeenCalled();
  });

  it("should not display 'X' if provider is not selected", () => {
    component.selected = false;
    fixture.detectChanges();
    expect(el.query(By.css(".remove-button"))).toBeNull();
  });

  it("should display 'X' if provider is selected", () => {
    component.selected = true;
    fixture.detectChanges();
    expect(el.query(By.css(".remove-button"))).not.toBeNull();
  });

  it("should call onRemoveFromSelected if provider is selected and 'X' is clicked", () => {
    spyOn(component, "onRemoveFromSelected");
    component.selected = true;
    fixture.detectChanges();
    const button = el.query(By.css(".remove-button")).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(component.onRemoveFromSelected).toHaveBeenCalled();
  });
});
