export function KeyDown(e,tag) {
    if (e.key === 'Enter') {
        e.preventDefault();
        props.addElement("p");
    }
    if ((e.key === 'Backspace' || e.key === 'Delete') && content === "") {
        e.preventDefault();
        props.deleteElement(props.index);
    }
    if (e.key === "Control" && e.key === "Shift" && e.key === "Delete") {
        e.preventDefault();
        props.deleteElement(props.index);
    }
}

//On enter : new line
//On enter twice: new paragraph