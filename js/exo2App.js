import ApiGouv from "./class/exo2ClassfetchData.js";
import RegionList, {
  Commune,
  CommuneList,
  DepartementList,
} from "./class/exo2ClassForm.js";
import DOM from "./utils/DOM.js";

/**
 * initialisation de l'instance d'objet api
 */
const api = new ApiGouv();

/**
 * Création d'un tableau pour recevoir les données des Régions
 */
let regions = [];

/**
 * Création des balises selectes pour les listes déroulantes Régions, Départements, Communes
 */
new DOM().createMarkup("select", "", document.body, [
  { name: "id", value: "region-select" },
  { name: "class", value: "regSelect" },
  { name: "name", value: "regions" },
  { name: "onchange", value: `` },
]);

new DOM().createMarkup("select", "", document.body, [
  { name: "id", value: "departements-select" },
  { name: "class", value: "depSelect" },
  { name: "name", value: "departements" },
  { name: "onchange", value: `` },
]);

new DOM().createMarkup("select", "", document.body, [
  { name: "id", value: "communes-select" },
  { name: "class", value: "comSelect" },
  { name: "name", value: "commune" },
  { name: "onchange", value: `` },
]);

/**
 * Récupération et traitement des données de la promesse api.getRegions()
 * On utilise les méthodes stringify et parse de l'objet JSON pour avoir un tableau des régions
 * On boucle sur les données du tableau et on fait un rendu des options contenant le nom des régions
 */
const dataApiRegions = await api.getRegions();
const stringifyDataApiReg = JSON.stringify(dataApiRegions);
regions = JSON.parse(stringifyDataApiReg);

/**
 * récupération des id des balises HTML select avec document.getElementById
 * Nous les réutiliserons plus loin avec les addEventListeners pour prendre
 *  en compte l'événement onclick
 */
let selectRegionOnChange = document.getElementById("region-select");
let selectDepartementOnChange = document.getElementById("departements-select");
let selectCommuneOnChange = document.getElementById("communes-select");

/**
 * Liste déroulante Région
 */
for (let region of regions) {
  const optionRegion = new RegionList(region.nom, region.code);
  optionRegion.renderRegions();

  document
    .querySelector("#region-select")
    .addEventListener("change", (event) => {
      let result = document.querySelector("#departements-select");
      result.textContent = event.target.value;
    });

  document.getElementById(region.code).addEventListener(
    "click",
    async () => {
      selectRegionOnChange.setAttribute(`onchange`, `${region.code}`);
    },
    false
  );
}

/**
 * Récupération des données de l'api sur le point d'entré https://geo.api.gouv.fr/regions/xx/departements
 * avec xx correspondant ici à notre variable selectRegionOnChange.getAttribute("onchange")
 */

selectRegionOnChange.addEventListener(
  "click",
  async () => {
    const apigetDepartements = await api.getDepartements(
      selectRegionOnChange.getAttribute("onchange")
    );
    const stringifyDataApiDep = JSON.stringify(apigetDepartements);
    const departements = JSON.parse(stringifyDataApiDep);

    for (let dep of departements) {
      const optionDeps = new DepartementList(dep.nom, dep.code);
      optionDeps.renderDepartement();

      document
        .querySelector("#departements-select")
        .addEventListener("change", (event) => {
          let result = document.querySelector("#communes-select");
          result.textContent = event.target.value;
        });

      document.getElementById(dep.code).addEventListener(
        "click",
        async () => {
          selectDepartementOnChange.setAttribute("onchange", dep.code);
        },
        false
      );
    }
  },
  false
);

/**
 * Après l'événement clique permettant de choisir le département, nous récupérons la promesse de l'api
 * api.getCommunes contenant la liste des communes du département. Procéder identique pour enrichir
 * la liste déroulante des communes du département (petit problème je n'arrive pas à filtrer quand on
 * re-clique sur les options)
 */

selectDepartementOnChange.addEventListener("click", async () => {
  const dataApiCommunes = await api.getCommunes(
    selectDepartementOnChange.getAttribute("onchange")
  );

  let stringifyDataApiCommunes = JSON.stringify(dataApiCommunes);
  let communes = JSON.parse(stringifyDataApiCommunes);

  for (let commune of communes) {
    const optionCommunes = new CommuneList(commune.nom, commune.code);
    optionCommunes.renderCommunes();

    document.querySelector('#communes-select').addEventListener("change", (event) => {
      let result = document.querySelector(".box-article");
      result.textContent = event.target.value;
    });

    document.getElementById(commune.code).addEventListener(
      "click",
      () => {
        /**
         * Enfin nous créons un article avec le nom de la commune, le nombre d'habitant et son code postal
         */
        const metadata = new Commune(
          commune.nom,
          commune.population,
          commune.codesPostaux[0]
        );
        metadata.renderCommune();
      },
      false
    );
  }
});
