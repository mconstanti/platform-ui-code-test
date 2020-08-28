import { Component, OnInit } from "@angular/core";
import { HealthProvider } from "../health-provider";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  public selectedProviders = [];
  public unselectedProviders = [
    {
      id: "1",
      name: "John",
      address: "123 Greenway Blvd",
      phone: "8991234321",
    },
    {
      id: "2",
      name: "Mary",
      address: "443 Windwhisper Road",
      phone: "2233211903",
    },
    {
      id: "3",
      name: "Jason",
      address: "9992 Pumpkin Hollow",
      phone: "4343219384",
    },
  ];
  private selectedProvidersStorage: any;
  private unselectedProvidersStorage: any;

  constructor() {}

  /* Check if items are in localStorage. If they are not, set localStorage.
   * If they are, get from localStorage
   */
  ngOnInit() {
    this.selectedProvidersStorage = JSON.parse(
      localStorage.getItem("selectedProviders")
    );
    this.unselectedProvidersStorage = JSON.parse(
      localStorage.getItem("unselectedProviders")
    );
    if (!this.selectedProvidersStorage || !this.unselectedProvidersStorage) {
      localStorage.setItem(
        "selectedProviders",
        JSON.stringify(this.selectedProviders)
      );
      localStorage.setItem(
        "unselectedProviders",
        JSON.stringify(this.unselectedProviders)
      );
    } else {
      this.selectedProviders = this.selectedProvidersStorage;
      this.unselectedProviders = this.unselectedProvidersStorage;
    }
  }

  /* remove from unselected list and add to selected list.
   * Update localStorage
   */
  onAddToSelected(provider: HealthProvider) {
    const index = this.unselectedProviders.findIndex(
      (p) => p.id === provider.id
    );
    const item = this.unselectedProviders.splice(index, 1);
    this.selectedProviders.push(provider);
    localStorage.setItem(
      "selectedProviders",
      JSON.stringify(this.selectedProviders)
    );
    localStorage.setItem(
      "unselectedProviders",
      JSON.stringify(this.unselectedProviders)
    );
  }

  /* remove from selected list and add to unselected list
   * Update localStorage
   */
  onAddToUnselected(provider: HealthProvider) {
    const index = this.selectedProviders.findIndex((p) => p.id === provider.id);
    const item = this.selectedProviders.splice(index, 1);
    this.unselectedProviders.push(provider);
    localStorage.setItem(
      "selectedProviders",
      JSON.stringify(this.selectedProviders)
    );
    localStorage.setItem(
      "unselectedProviders",
      JSON.stringify(this.unselectedProviders)
    );
  }
}
