/**
 * Classe contenant les propriétés et les méthodes qui vont permettre d'intéragir avec l'API du gouv
 */
export default class ApiGouv {
  #url_region;
  #url_departements;
  #url_departement;
  #url_communes;
  #url_commune;

  constructor() {
    this.#url_region = "https://geo.api.gouv.fr/regions";
  }

  async getRegions() {
    const response = await fetch(this.#url_region, { method: "GET" });
    const data = await response.json();
    return data;
  }

  async getDepartements(region_number) {
    // On utilise le Point d'entrée passé en paramètre du constructeur pour récupérer la liste des régions
    this.#url_departements = `https://geo.api.gouv.fr/regions/${region_number}/departements`;
    const response = await fetch(this.#url_departements, { method: "GET" });
    const data = await response.json();
    return data;
  }

  async getDepartement(departement_number) {
    // On récupère le point d'entrée initialisé dans le second constructeur pour récuperer la liste des départements
    this.#url_departement = `https://geo.api.gouv.fr/departements/${departement_number}/`;
    const response = await fetch(this.#url_departement, { method: "GET" });
    const data = await response.json();
    return data;
  }

  async getCommunes(departement_number) {
    // On utilise les propriétés initialisées dans le troisième constructeur pour récupérer la liste des communes
    this.#url_communes = `https://geo.api.gouv.fr/departements/${departement_number}/communes`;
    const response = await fetch(this.#url_communes, { method: "GET" });
    const data = await response.json();
    return data;
  }

  async getCommune(code_commune) {
    // Ici on récupère les données de la commune en utlisant le dernier constructeur
    this.#url_commune = `https://geo.api.gouv.fr/communes/${code_commune}`;
    const response = await fetch(this.#url_commune, { method: "GET" });
    const data = await response.json();
    return data;
  }
}
