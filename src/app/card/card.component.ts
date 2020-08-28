import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HealthProvider } from "../health-provider";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"],
})
export class CardComponent implements OnInit {
  @Input() provider: HealthProvider;
  @Input() selected: boolean;
  @Output() addToSelected = new EventEmitter();
  @Output() addToUnselected = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  onAddToSelected() {
    this.addToSelected.emit(this.provider);
  }

  onRemoveFromSelected() {
    this.addToUnselected.emit(this.provider);
  }
}
