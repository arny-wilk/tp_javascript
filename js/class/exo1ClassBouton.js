import DOM from "../utils/DOM.js";

export default class ButtonSection extends DOM {
  constructor() {
    super();
    this.renderSection();
  }

  renderSection() {
    this.createMarkup("section", "", document.body, [
      { name: "class", value: "btn-section" },
    ]);
  }
}

export class Button extends DOM {
  #selector = document.querySelector(".btn-section");

  constructor(subject) {
    super();
    this.subject =subject
    this.renderButton();
  }

  renderButton() {
    this.createMarkup("button", `${this.subject}`, this.#selector, [
      { name: "type", value: "button" },
      { name: "id", value: this.subject },
      { name: "value", value: this.subject },
      { name: "class", value: "btn" },
    ]);
  }
}
