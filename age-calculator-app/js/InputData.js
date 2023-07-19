class InputData {

    stateError = false;
    errorMsg = "";

    constructor({ label, input, spanError, stateError, checkFunction }) {
        this.label = label;
        this.input = input;
        this.spanError = spanError;
        this.stateError = stateError;
        this.checkFunction = checkFunction;
    }

    toggleLabel() {
        if (this.stateError)
            this.label.classList.add("error-label");
        else
            this.label.classList.remove("error-label");
    }

    toggleInput() {
        if (this.stateError)
            this.input.classList.add("error-input");
        else
            this.input.classList.remove("error-input");
    }

    toggleSpanError() {
        if (this.stateError)
            this.spanError.classList.add("error-span");
        else
            this.spanError.classList.remove("error-span");
    }

    isEmpty() {
        if (this.input.value == "") {
            this.stateError = true;
            this.errorMsg = "This field is required";
            return true;
        } else {
            this.stateError = false;
            this.errorMsg = "";
            return false;
        }
    }

    checkData() {
        if (!this.isEmpty())
            this.errorMsg = this.checkFunction(this.input.value);
        this.stateError = this.errorMsg != "";
    }

    getData() {
        return this.input.value;
    }

    refreshErrorMsg() {
        this.spanError.innerHTML = this.errorMsg;
    }


    refresh() {
        this.toggleLabel();
        this.toggleInput();
        this.refreshErrorMsg();
        this.toggleSpanError();
    }

    resetAllInput() {
        this.errorMsg = "";
        this.input.value = "";
        this.stateError = false;
        this.refresh();
    }

    focus() {
        this.input.focus();
    }

}

export { InputData };