import DOM from "../utils/DOM.js";

export default class Section extends DOM {
  constructor() {
    super();
    this.renderSection();
  }

  renderSection() {
    this.createMarkup("section", "", document.body, [
      { name: "class", value: "article-section" },
    ]);
  }
}

export class Article extends DOM {
  #theme;
  #themes = ["CSS", "HTML", "JS"];
  #section = document.querySelector(".article-section");

  constructor() {
    super();
    this.#theme = this.getRandomItem();
    this.renderArticle();
  }

  getRandomItem() {
    const randomIndex = Math.floor(Math.random() * this.#themes.length);
    const item = this.#themes[randomIndex];
    return item;
  }

  renderArticle() {
    let article = this.createMarkup("article", "", this.#section, [
        { name: "id", value: `${this.#theme}_id` },
      { name: "class", value: `article-box` },
    ]);
    this.createMarkup("h2", `Article sur ${this.#theme}`, article, [
      { name: "class", value: "title" },
    ]);
  }
}
