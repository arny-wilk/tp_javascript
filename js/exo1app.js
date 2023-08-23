import Section, { Article } from "../js/class/exo1ClassArticle.js";
import ButtonSection, { Button } from "../js/class/exo1ClassBouton.js";

const buttonSection = new ButtonSection();

const sectionArticle = new Section();
for (let i = 0; i < 16; i++) {
  const article = new Article();
}

let subjects = ["TOUS", "HTML", "CSS", "JS"];

for (let subject of subjects) {
  const button = new Button(subject);
  document.getElementById(subject).addEventListener(
    "click",
    () => {
      let result = document.querySelectorAll(`#${subject}_id`);
      for (let htmlElement of result) {
        htmlElement.setAttribute("class", "hidden-article");
      }
    },
    false
  );
}

document.querySelector("#TOUS").addEventListener(
  "click",
  () => {
    let result = document.querySelectorAll(".hidden-article");
    for (let elt of result) {
      elt.setAttribute("class", "article-box");
    }
  },
  false
);
