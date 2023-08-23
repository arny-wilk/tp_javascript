import DOM from "../utils/DOM.js";

export default class RegionList extends DOM {
  constructor(region, id) {
    super();
    this.region = region;
    this.id = id;
  }

  renderRegions() {
    this.createMarkup(
      "option",
      `${this.region}`,
      document.querySelector("#region-select"),
      [{name:"id", value:`${this.id}`},{ name: "value", value: `${this.region}` }]
    );
  }
}

export class DepartementList extends DOM {
  constructor(departements, id) {
    super();
    this.departements = departements;
    this.id = id;
  }

  renderDepartement() {
    this.createMarkup(
      "option",
      `${this.departements}`,
      document.querySelector("#departements-select"),
      [{name:"id", value:`${this.id}`},{ name: "value", value: `${this.departements}` }]
    );
  }
}

export class CommuneList extends DOM {
  constructor(commune, id) {
    super();
    this.commune = commune;
    this.id = id;
  }

  renderCommunes() {
    this.createMarkup(
      "option",
      `${this.commune}`,
      document.querySelector("#communes-select"),
      [{name:"id", value:`${this.id}`},{ name: "value", value: `${this.commune}`}]
    );
  }
}

export class Commune extends DOM {
  constructor(nom, nb_hab, zipcode) {
    super();
    this.nom = nom;
    this.nb_hab = nb_hab;
    this.zipcode = zipcode;
  }

  renderCommune() {
    let article = this.createMarkup("article", "", document.body, [
      { name: "class", value: "box-article" },
    ]);
    this.createMarkup("h2", `${this.nom}`, article, [
      { name: "class", value: "" },
    ]);
    this.createMarkup("h2", `Population : ${this.nb_hab}`, article, [
      { name: "class", value: "" },
    ]);
    this.createMarkup("p", `Code postal : ${this.zipcode}`, article, [
      { name: "class", value: "" },
    ]);
  }
}
