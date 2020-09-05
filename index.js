import { Select } from "./select/select.js";
import "./select/styles.scss";

const select = new Select("#select", {
    placeholder: "Choose an element",
    selectedId: 4,
    data: [
        { id: 1, value: "React" },
        { id: 2, value: "Vue" },
        { id: 3, value: "Angular" },
        { id: 4, value: "Native JS" },
        { id: 5, value: "Webpack" }
    ],
    onSelect: function (item) {
        console.log("Selected item: ", item);
    }
});

select.add({id: 6, value: "C#"});

window.s = select;
