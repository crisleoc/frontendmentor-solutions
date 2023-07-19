class Button {
    img = document.createElement("img");
    default = true;

    constructor(button) {
        this.button = button;
        this.defaultButton();
    }

    buildButton() {
        this.button.appendChild(this.img);
    }

    defaultButton() {
        this.default = true;
        this.img.src = "./assets/images/icon-arrow.svg";
        this.img.alt = "Submit";
        this.button.innerHTML = "";
        this.buildButton();
    }

    resetButton() {
        this.default = false;
        this.img.src = "./assets/images/reset.png";
        this.img.alt = "Reset";
        this.button.innerHTML = "";
        this.buildButton();
    }
}

export { Button };
