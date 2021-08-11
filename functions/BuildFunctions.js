//Build Classes
export function buildClassName(element, index) {
    var allClasses = " ";
    //typograhy classes
    if (element.typography) {
        if (element.typography["bold"]) allClasses = allClasses.concat("styleBold ")
        if (element.typography["italic"]) allClasses = allClasses.concat("styleItalic ")

        if (element.typography["underline"] && element.typography["strikethrough"]) allClasses = allClasses.concat("styleUnderlineStrikethrough ")
        if (element.typography["underline"] && !element.typography["strikethrough"]) allClasses = allClasses.concat("styleUnderline ")
        if (element.typography["strikethrough"] && !element.typography["underline"]) allClasses = allClasses.concat("styleStrikethrough ")
    }
    if (element.alignment) {
        allClasses = allClasses.concat("text-" + element.alignment + " ");
    }
    if (element.tag === "img") {
        if (element.responsive) allClasses = allClasses.concat("img-fluid ");
    }
    if (element.textColor) {
        allClasses = allClasses.concat(`text-${element.textColor} `)
    }
    return allClasses;
}

export function buildElementContainerClasses(e) {
    var containerClasses = "d-flex align-items-stretch "
    if (e.bgColor) {
        containerClasses = containerClasses.concat(`bg-${e.bgColor} `)
    }
    if (Number.isInteger(e.col)) {
        containerClasses = containerClasses.concat(`col-${e.col} col-md-${e.colMd} col-lg-${e.colLg} `);
    }
    if (!e.col) {
        containerClasses = containerClasses.concat(`col-12 `)
    }
    return containerClasses;
}

//auto determine col for newly inserted element
function determineCol(elementArray, currentIndex, screenSize) {
    let nextCol = 12, status = 0;

    if (elementArray[currentIndex]) {
        if (elementArray[currentIndex][screenSize]) {
            let currentCol = elementArray[currentIndex][screenSize]
            if ((currentCol == 4) || (currentCol == 6) || (currentCol == 3)) {
                for (let i in elementArray) {
                    if (elementArray[elementArray.length - i - 1][screenSize] == currentCol) {
                        status += 1
                    }
                    else break;
                }
                if (status % (12 / currentCol) != 0) nextCol = currentCol;
            }
        }
    }
    return nextCol;
}

export function determineElementStructure(tag, elementArray, currentIndex) {
    let colMd = determineCol(elementArray, currentIndex, "colMd");
    let col = determineCol(elementArray, currentIndex, "col")
    let colLg = determineCol(elementArray, currentIndex, "colLg")
    let element;
    if (tag == "ul" || tag == "ol") {
        element = {
            tag: tag,
            elementArray: [{
            }],
            typography: {
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
            },
            textColor: "dark",
            alignment: "left",
            alignSelf: "center",
            bgColor: "transparent",
            col: col,
            colMd: colMd,
            colLg: colLg,
        }
    }
    else if (tag == "li") {
        element = {
            tag: tag,
            content: ""
        }
    }
    else if (tag == "img") {
        element = {
            tag: tag,
            src: "",
            responsive: true,
            alignment: 'center',
            alignSelf: "center",
            bgColor: "transparent",
            col: col,
            colMd: colMd,
            colLg: colLg,
        }
    }
    else if (tag == "embed") {
        element = {
            tag: tag,
            src: "",
            alignment: 'center',
            alignSelf: "center",
            bgColor: "transparent",
            col: col,
            colMd: colMd,
            colLg: colLg,
            aspectRatio: "16by9",
        }
    }
    else if (tag == "button") {
        element = {
            tag: tag,
            href: "",
            content: "",
            classes: "",
            btnColor: "light",
            btnOutline: false,
            iconName: "",
            iconPosition: "start",
            alignment: 'center',
            alignSelf: "center",
            bgColor: "transparent",
            size: "rg",
            col: col,
            colMd: colMd,
            colLg: colLg,
        }
    }
    else if (tag == "socialbtns") {
        element = {
            tag: tag,
            instagram: "",
            facebook: "",
            twitter: "",
            whatsapp: "",
            github: "https://github.com/vanssign",
            linkedin: "https://www.linkedin.com/in/vansh-singh/",
            youtube: "",
            google: "",
            telegram: "",
            slack: "",
            discord: "",
            twitch: "",
            alignment: "center",
            alignSelf: "center",
            bgColor: "transparent",
            size: "rg",
            col: col,
            colMd: colMd,
            colLg: colLg,
        }
    }
    else if (tag == "blockquote") {
        element = {
            tag: tag,
            content: "",
            cite: "",
            footerContent: "",
            classes: "",
            typography: {
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
            },
            textColor: "dark",
            alignment: "left",
            alignSelf: "center",
            bgColor: "transparent",
            col: col,
            colMd: colMd,
            colLg: colLg,
        }
    }
    else if (tag == "hr") {
        element = {
            tag: tag,
            bgColor: "transparent",
        }
    }
    else if (tag == "spacer") {
        element = {
            tag: tag,
            height: "30",
            bgColor: "transparent",
        }
    }
    else if (tag == "gutter") {
        element = {
            tag: tag,
            bgColor: "transparent",
            col: 1,
            colMd: 1,
            colLg: 1,
        }
    }
    else if (tag == 'carousel') {
        element = {
            tag: tag,
            slides: [
                {
                    src: "",
                    label: "",
                    caption: "",
                    textColor: "light",
                },
                {
                    src: "",
                    label: "",
                    caption: "",
                    textColor: "light",
                },
            ],
            animation: "slide",
            interval: 5000,
            controls: true,
            indicators: true,
            alignSelf: "center",
            bgColor: "transparent",
            col: col,
            colMd: colMd,
            colLg: colLg,
        }
    }
    else if (tag == "custom") {
        element = {
            tag: tag,
            elementArray: [],
            alignment: "left",
            alignSelf: "center",
            bgColor: "transparent",
            col: col,
            colMd: colMd,
            colLg: colLg,
        }
    }
    else {
        element = {
            tag: tag,
            content: "",
            classes: "",
            typography: {
                bold: false,
                italic: false,
                underline: false,
                strikethrough: false,
            },
            textColor: "dark",
            alignment: "left",
            alignSelf: "center",
            bgColor: "transparent",
            col: col,
            colMd: colMd,
            colLg: colLg,
        }
    }
    return element;
}
