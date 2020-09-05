const getTemplate = (data = [], placeholder = "") => {
    const items = data.map(item => `
        <li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>
    `);

    return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
        <span data-type="value">${placeholder}</span>
        <i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
        <ul class="select__list" data-type="list">
            ${items.join("")}
        </ul>
    </div>
`;
}

export class Select {
    constructor(selector, options) {
        this.$select = document.querySelector(selector);
        this.options = options;
        this.#render();

        this.$list = this.$select.querySelector("[data-type='list']");
        this.$value = this.$select.querySelector("[data-type='value']");
        this.$arrow = this.$select.querySelector("[data-type='arrow']");

        this.#setup();
        this.selectedId = options.selectedId;
        this.select(this.selectedId);
    }

    #render() {
        const { placeholder, data } = this.options;
        this.$select.classList.add("select");
        this.$select.innerHTML = getTemplate(data, placeholder);
    }

    #clickHandler(e) {
        const {type} = e.target.dataset;

        switch (type) {
            case "input":
                this.toggle();
                break;
            case "value":
                this.toggle();
                break;
            case "item":
                const id = +e.target.dataset.id;
                this.select(id);
                this.close();
                break;
            case "backdrop":
                this.close();
                break;
        }
    }

    #setup() {
        this.$select.addEventListener("click", this.#clickHandler.bind(this));
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.$select.classList.add("open");
        this.$arrow.classList.add("select__arrow_turned");
    }

    get isOpen() {
        return this.$select.classList.contains("open");
    }

    get current() {
        return this.options.data.find(item => item.id === this.selectedId);
    }

    select(id) {
        this.selectedId = id;
        this.$select.querySelectorAll("[data-type='item']").forEach(item => item.classList.remove("select__item_selected"));
        this.$select.querySelector(`[data-id='${this.selectedId}']`).classList.add("select__item_selected");
        this.$value.textContent = this.current.value;
        // this.$select.querySelector("[data-type='value']").textContent = this.current.value;

        if (this.options.onSelect) {
            this.options.onSelect(this.current);
        }
    }

    close() {
        this.$select.classList.remove("open");
        this.$arrow.classList.remove("select__arrow_turned");
    }

    add(item) {
        this.options.data.push(item);
        this.$list.innerHTML += `
            <li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>
        `;
        // this.#render();
    }

    destroy() {
        this.$select.removeEventListener("click", this.#clickHandler.bind(this));
        this.$select.innerHTML = "";
    }
}
