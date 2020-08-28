import { ListComponent } from "./list.component";

describe("ListComponent", () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("unselected providers", () => {
    it("should have an initial length of 3", () => {
      expect(component.unselectedProviders.length).toEqual(3);
    });

    it("should have an id", () => {
      expect(component.unselectedProviders[0].id).toEqual("1");
    });

    it("should have a name", () => {
      expect(component.unselectedProviders[0].name).toEqual("John");
    });

    it("should have an address", () => {
      expect(component.unselectedProviders[0].address).toEqual(
        "123 Greenway Blvd"
      );
    });

    it("should have a phone", () => {
      expect(component.unselectedProviders[0].phone).toEqual("8991234321");
    });
  });

  describe("selected providers", () => {
    it("should have no initial length", () => {
      expect(component.selectedProviders.length).toEqual(0);
    });
  });

  describe("onAddToSelected", () => {
    it("should move a provider from unselected to selected", () => {
      component.onAddToSelected(component.unselectedProviders[0]);
      expect(component.selectedProviders.length).toEqual(
        1,
        "Unexpected selectedProviders length"
      );
      expect(component.selectedProviders[0].name).toEqual("John");
      expect(component.unselectedProviders.length).toEqual(
        2,
        "Unexpected selectedProviders length"
      );
      expect(component.unselectedProviders[0].name).toEqual("Mary");
    });
  });
  describe("onAddToUnselected", () => {
    it("should move a provider from selected to unselected", () => {
      /* Initially populate selected list with one item */
      component.onAddToSelected(component.unselectedProviders[0]);
      component.onAddToUnselected(component.selectedProviders[0]);
      expect(component.unselectedProviders.length).toEqual(
        3,
        "Unexpected unselectedProviders length"
      );
      expect(component.selectedProviders.length).toEqual(
        0,
        "Unexpected selectedProviders length"
      );
      expect(component.unselectedProviders[2].name).toEqual("John");
      expect(component.unselectedProviders.length).toEqual(
        3,
        "Unexpected unselectedProviders length"
      );
    });
  });
  describe("localStorage", () => {
    beforeEach(() => {
      localStorage.clear();
    });
    it("onAddToSelected should save data to selectedProviders localStorage", () => {
      component.onAddToSelected(component.unselectedProviders[0]);
      expect(localStorage.getItem("selectedProviders")).not.toBe(
        null,
        "Expected selectedProviders localStorage not to be null"
      );
      const selectedProvidersStorage = JSON.parse(
        localStorage.getItem("selectedProviders")
      );
      expect(selectedProvidersStorage.length).toEqual(
        1,
        "Unexpedted selectedProviders localStorage length"
      );
      expect(selectedProvidersStorage[0]["name"]).toBe("John");
    });

    it("onAddToSelected should save data to unselectedProviders localStorage", () => {
      component.onAddToSelected(component.unselectedProviders[0]);
      expect(localStorage.getItem("unselectedProviders")).not.toBe(
        null,
        "Expected unselectedProviders localStorage not to be null"
      );
      const unselectedProvidersStorage = JSON.parse(
        localStorage.getItem("unselectedProviders")
      );
      expect(unselectedProvidersStorage.length).toEqual(
        2,
        "Unexpedted unselectedProviders localStorage length"
      );
      expect(unselectedProvidersStorage[0]["name"]).toBe("Mary");
    });

    it("onAddToUnselected should save data to unselectedProviders localStorage", () => {
      /* Initially populate selected list with one item */
      component.onAddToSelected(component.unselectedProviders[0]);
      component.onAddToUnselected(component.selectedProviders[0]);
      expect(localStorage.getItem("selectedProviders")).not.toBe(
        null,
        "Expected selectedProviders localStorage not to be null"
      );
      const unselectedProvidersStorage = JSON.parse(
        localStorage.getItem("unselectedProviders")
      );
      expect(unselectedProvidersStorage.length).toEqual(
        3,
        "Unexpedted unselectedProviders localStorage length"
      );
      expect(unselectedProvidersStorage[0]["name"]).toBe("Mary");
      expect(unselectedProvidersStorage[2]["name"]).toBe("John");
    });

    it("onAddToUnselected should save data to selectedProviders localStorage", () => {
      /* Initially populate selected list with one item */
      component.onAddToSelected(component.unselectedProviders[0]);
      component.onAddToUnselected(component.selectedProviders[0]);
      const selectedProvidersStorage = JSON.parse(
        localStorage.getItem("selectedProviders")
      );
      expect(selectedProvidersStorage.length).toEqual(
        0,
        "Unexpedted selectedProviders localStorage length"
      );
    });
  });
});
