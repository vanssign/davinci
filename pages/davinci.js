import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link';

import { useState, useRef, useEffect } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import { DropdownButton, Dropdown, SplitButton, Tabs, Tab, Tooltip, OverlayTrigger, Popover, Carousel } from 'react-bootstrap';
import ImageUploader from '../components/uploadImage';
//functions
import { buildClassName } from '../functions/BuildFunctions';

import fire from '../config/fire-config';

import styles from '../styles/Davinci.module.css'

const renderIconTooltip = (props) => (
    <Tooltip id="button-icon-tooltip" {...props}>
        Visit <a href="https://icons.getbootstrap.com/" target="_blank" rel="noreferrer">Bootstrap Icons</a> and add the name of the icon ex:alarm
    </Tooltip>
);

var TextTags = [
    {
        tag: "h1",
        shortName: "H1",
        iconName: ""
    },
    {
        tag: "h2",
        shortName: "H2",
        iconName: ""
    },
    {
        tag: "h3",
        shortName: "H3",
        iconName: ""
    },
    {
        tag: "p",
        shortName: "",
        iconName: "bi-paragraph"
    },
    {
        tag: "h4",
        shortName: "H4",
        iconName: ""
    },
    {
        tag: "h5",
        shortName: "H5",
        iconName: ""
    },
    {
        tag: "h6",
        shortName: "H6",
        iconName: ""
    },
    {
        tag: "code",
        shortName: "",
        iconName: "bi-code"
    }
];

var BootstrapColors = [
    {
        name: 'primary',
    },
    {
        name: 'secondary',
    },
    {
        name: 'success',
    },
    {
        name: 'danger',
    },
    {
        name: 'warning',
    }
    ,
    {
        name: 'info',
    },
    {
        name: 'light',
    },
    {
        name: 'dark',
    }
]

var SocialLinks = [
    { name: 'instagram' },
    { name: 'facebook' },
    { name: 'twitter' },
    { name: 'whatsapp' },
    { name: 'github' },
    { name: 'linkedin' },
    { name: 'youtube' },
    { name: 'google' },
    { name: 'telegram' },
    { name: 'slack' },
    { name: 'discord' },
    { name: 'twitch' }
]


export default function DaVinci() {
    //states
    const [ElementArray, setElementArray] = useState([{
        tag: "h1",
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
        bgColor: "white",
        col: 12,
        colMd: 12,
        colLg: 12,
    }])

    const [LoginStatus, setLoginStatus] = useState("");
    const [Notification, setNotification] = useState("Check out all blogs");
    const [LiveBlogId, setLiveBlogId] = useState("");
    const [PreviewStatus, setPreviewStatus] = useState(false);

    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    const [FocusedIndex, setFocusedIndex] = useState(0);
    const FocusedElement = useRef();

    const router = useRouter();

    useEffect(() => {
        if (LoginStatus == true) {
            if (FocusedElement.current) {
                FocusedElement.current.focus();
            }
            if (windowWidth == 0) {
                setWindowHeight(window.innerHeight);
                setWindowWidth(window.innerWidth);
            }
            window.addEventListener("resize", handleResize);
        }
    })

    const handleResize = (e) => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    //Auth Check
    fire.auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoginStatus(true);
            }
            else {
                setLoginStatus("failure");
            }
        })

    //Publish
    const handlePublish = (event) => {
        event.preventDefault();
        if (ElementArray[0]) {
            fire.firestore()
                .collection('blog')
                .add({
                    elementArray: ElementArray
                }).then((docRef) => {
                    setNotification("Blog live");
                    setLiveBlogId(docRef.id)
                })
                .catch(function (error) {
                    setNotification("Error adding document: " + error);
                });
        }
        else {
            setNotification("Title not added! Check all blogs")
            setTimeout(() => {
                setNotification("Check out all blogs")
            }, 7000)
        }
    }

    //auto determine col for newly inserted element
    function determineCol(currentCol, screenSize) {
        let nextCol = 12, status = 0;
        if ((currentCol == 4) || (currentCol == 6) || (currentCol == 3)) {
            if (ElementArray[FocusedIndex]) {
                if (ElementArray[FocusedIndex][screenSize]) {
                    for (let i in ElementArray) {
                        if (ElementArray[ElementArray.length - i - 1][screenSize] == currentCol) {
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
    //FUNCTIONS ON ELEMENTS

    //Add new
    function addElement(tag) {

        let newElementArray = [...ElementArray];
        let element;

        let colMd = determineCol(ElementArray[FocusedIndex].colMd, "colMd");
        let col = determineCol(ElementArray[FocusedIndex].col, "col")
        let colLg = determineCol(ElementArray[FocusedIndex].colLg, "colLg")

        if (tag == "ul" || tag == "ol") {
            element = {
                tag: tag,
                content: [{ value: "" },],
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
                bgColor: "white",
                col: col,
                colMd: colMd,
                colLg: colLg,
            }
        }
        else if (tag == "img") {
            element = {
                tag: tag,
                src: "",
                responsive: true,
                alignment: 'center',
                alignSelf: "center",
                bgColor: "white",
                col: col,
                colMd: colMd,
                colLg: colLg,
            }
        }
        else if (tag == "mediaText") {
            element = {
                tag: tag,
                src: "",
                responsive: true,
                alignment: 'left',
                alignSelf: "center",
                bgColor: "white",
                order: 0,
                content: "",
                textColor: "dark",
                col: col,
                colMd: colMd,
                colLg: colLg,
            }
        }
        else if (tag == "mediaCover") {
            element = {
                tag: tag,
                src: "",
                responsive: true,
                alignment: 'left',
                alignSelf: "center",
                bgColor: "white",
                content: "",
                col: col,
                colMd: colMd,
                colLg: colLg,
            }
        }

        else if (tag == "button") {
            element = {
                tag: tag,
                href: "",
                content: "",
                classes: "",
                btnColor: "secondary",
                btnOutline: false,
                iconName: "",
                alignment: 'center',
                alignSelf: "center",
                bgColor: "white",
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
                bgColor: "white",
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
                bgColor: "white",
                col: col,
                colMd: colMd,
                colLg: colLg,
            }
        }
        else if (tag == "hr") {
            element = {
                tag: tag,
                bgColor: "white",
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
                activeSlide: 0,
                alignSelf: "center",
                bgColor: "white",
                col: col,
                colMd: colMd,
                colLg: colLg,
            }
        }
        else if (tag == "custom") {
            element = {
                tag: tag,
                elementArray: [{
                    tag: "p",
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
                    col: col,
                    colMd: colMd,
                    colLg: colLg,
                }],
                alignment: "left",
                alignSelf: "center",
                bgColor: "white",
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
                bgColor: "white",
                col: col,
                colMd: colMd,
                colLg: colLg,
            }
        }
        newElementArray.splice(FocusedIndex + 1, 0, element);
        setFocusedIndex(FocusedIndex + 1);
        setElementArray(newElementArray);
    }

    //delete focused element
    function deleteElement(index) {
        let newElementArray = ElementArray.filter((e, i) => i !== index);
        setFocusedIndex(index - 1);
        setElementArray(newElementArray);
    }

    //change index of focused element
    function changeElementIndex(index, value) {
        let newElementArray = [...ElementArray];
        let temp = newElementArray[index];
        //decrease index
        if (value === -1) {
            newElementArray[index] = newElementArray[index - 1];
            newElementArray[index - 1] = temp;
            setFocusedIndex(index - 1);
        }
        //increase  index
        else if (value == 1) {
            newElementArray[index] = newElementArray[index + 1];
            newElementArray[index + 1] = temp;
            setFocusedIndex(index + 1);
        }
        setElementArray(newElementArray);
    }

    //update element
    function updateElement(index, key, index2, key2, value) {
        let newElementArray = [...ElementArray];
        if (!index2) {
            newElementArray[index][key] = value;
        }
        else if (index2) {
            if (key2) {
                if (index2 == "increase") {
                    newElementArray[index][key].push({ key2: value })
                }
                else if (index2 == "decrease") {
                    newElementArray[index][key].pop();
                }
                else {
                    newElementArray[index][key][index2][key2] = value;
                }
            }
            else {
                if (key == "typography") {
                    newElementArray[index][key][index2] = !ElementArray[index][key][index2];
                }
            }

        }
        setElementArray(newElementArray);
    }

    function updateCarousel(index, slideIndex, key, value) {
        let newElementArray = [...ElementArray];
        if (key == "increase") {
            newElementArray[index].slides.splice(slideIndex + 1, 0, {
                src: "",
                label: "",
                caption: "",
                textColor: "light",
            });
            setElementArray(newElementArray)
        }
        else if (key == "decrease") {
            if (newElementArray[index].slides.length == 1) {
                deleteElement(index);
            }
            else {
                newElementArray[index].slides = newElementArray[index].slides.filter((e, i) => i !== slideIndex);
                setElementArray(newElementArray)
            }
        }
        else {
            newElementArray[index].slides[slideIndex][key] = value;
            setElementArray(newElementArray)
        }
    }

    const updateUrl = (value, index) => {
        updateElement(index, "src", "", "", value)
    }


    //Build Element
    function buildtextareaHTML(element, index) {

        let tag = element.tag;
        let content = element.content;
        let allClasses = buildClassName(element, index)

        //TEXT
        if (tag == "h1") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <h1 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder={index == 0 ? ("Title.Type here..") : ("H1 heading. Type here..")} onKeyDown={function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "" && index !== 0) {
                            e.preventDefault();
                            deleteElement(index);
                        }
                    }} onFocus={() => setFocusedIndex(index)} /></h1>
                </div>)
        }

        //H2
        if (tag == "h2") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <h2 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="H2 Heading. Type here ..." onKeyDown={function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "") {
                            e.preventDefault();
                            deleteElement(index);
                        }
                    }} onFocus={() => setFocusedIndex(index)} /></h2>
                </div>)
        }

        //paragraph
        if (tag == "p") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <p className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} ref={FocusedIndex == index ? (FocusedElement) : (null)} value={content} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="Paragraph. Type here ..." onKeyDown={function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "") {
                            e.preventDefault();
                            deleteElement(index);
                        }
                    }} onFocus={() => setFocusedIndex(index)} />
                    </p>
                </div>

            )
        }

        //H3
        if (tag == "h3") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <h3 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="H3 Heading. Type here ..." onKeyDown={function (e) {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "") {
                            e.preventDefault();
                            deleteElement(index);
                        }
                    }} onFocus={() => setFocusedIndex(index)} />
                    </h3>
                </div>)
        }

        //H4
        if (tag == "h4") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <h4 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="H4 Heading. Type here ..." onKeyDown={function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "") {
                            e.preventDefault();
                            deleteElement(index);
                        }
                    }} onFocus={() => setFocusedIndex(index)} />
                    </h4>
                </div>)
        }

        //H5
        if (tag == "h5") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <h5 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="H5 heading. Type here ..." onKeyDown={function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "") {
                            e.preventDefault();
                            deleteElement(index);
                        }
                    }} onFocus={() => setFocusedIndex(index)} />
                    </h5>
                </div>)
        }

        //H6
        if (tag == "h6") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <h6 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="H6 Heading. Type here ..." onKeyDown={function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "") {
                            e.preventDefault();
                            deleteElement(index);
                        }
                    }} onFocus={() => setFocusedIndex(index)} />
                    </h6>
                </div>)
        }

        //Code
        if (tag == "code") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <code className={allClasses}>
                        <TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="Code Snippet. Type here ..."
                            onKeyDown={function (e) {
                                if (e.key === 'Backspace' && content === "") {
                                    e.preventDefault();
                                    deleteElement(index);
                                }
                            }} onFocus={() => setFocusedIndex(index)} />
                    </code>
                </div>
            )
        }

        //Blockquote
        if (tag == "blockquote") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <div className="d-flex justify-content-start">
                        <i className="bi bi-link-45deg"></i>{" "}<TextareaAutosize style={{ overflow: 'hidden' }} value={element.cite} className={styles.textareaInherit} onChange={(e) => updateElement(index, "cite", "", "", e.target.value)} placeholder="Cite Link or source" onFocus={() => setFocusedIndex(index)} /></div>
                    <blockquote className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="BlockQuote text. Type here ..."
                        onKeyDown={function (e) {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addElement("p");
                            }
                            if (e.key === 'Backspace' && content === "") {
                                e.preventDefault();
                                deleteElement(index);
                            }
                        }}
                        onFocus={() => setFocusedIndex(index)} /></blockquote>
                </div>
            )
        }

        //LISTS

        //unordered list
        if (tag == "ul") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <ul className={allClasses}>
                        {ElementArray[index].content.map((c, i) =>
                            <li key={tag + index + "c.value" + i}><TextareaAutosize style={{ overflow: 'hidden' }} value={c.value} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", i, "value", e.target.value)} placeholder="List Item" onKeyDown={function (e) {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (c.value === "" && i !== 0) {
                                        updateElement(index, "content", "decrease", "value", "");
                                        addElement("p");
                                    }
                                    else
                                        updateElement(index, "content", "increase", "value", "")
                                }
                                if (e.key === 'Backspace' && c.value === "") {
                                    e.preventDefault();
                                    if (i === 0) {
                                        deleteElement(index);
                                    }
                                    else {
                                        updateElement(index, "content", "decrease", "value", "")
                                    }
                                }
                            }} onFocus={() => setFocusedIndex(index)} /></li>
                        )
                        }
                    </ul>
                </div>
            )
        }

        //ordered list
        if (tag == "ol") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <ol className={allClasses}>
                        {ElementArray[index].content.map((c, i) =>
                            <li key={tag + index + "c.value" + i}><TextareaAutosize style={{ overflow: 'hidden' }} value={c.value} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", i, "value", e.target.value)} placeholder="List Item" onKeyDown={function (e) {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (c.value === "" && i !== 0) {
                                        updateElement(index, "content", "decrease", "", "");
                                        addElement("p");
                                    }
                                    else
                                        updateElement(index, "content", "increase", "", "")
                                }
                                if (e.key === 'Backspace' && c.value === "") {
                                    e.preventDefault();
                                    if (i === 0) {
                                        deleteElement(index);
                                    }
                                    else {
                                        updateElement(index, "content", "decrease", "", "")
                                    }
                                }
                            }} onFocus={() => setFocusedIndex(index)} /></li>
                        )
                        }
                    </ol>
                </div>
            )
        }

        //IMAGE
        if (tag == "img") {
            return (
                <div key={tag + index} className={`text-${element.alignment} py-3 bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`} onClick={() => setFocusedIndex(index)}>
                    <div className={index == FocusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")}>
                        <i className="bi bi-link-45deg lead"></i>
                        <textarea rows="1" cols="10" value={element.src} className="btn btn-light btn-light-active" styles={{ resize: 'none' }} onChange={(e) => updateElement(index, "src", "", "", e.target.value)} placeholder="Image Link" ref={FocusedIndex == index ? (FocusedElement) : (null)} />
                        <ImageUploader index={index} parentCallback={updateUrl} />
                        <button type="button" onClick={() => deleteElement(index)} className="btn btn-danger py-0 px-1"><i className="bi bi-trash lead"></i></button>
                    </div>
                    <img className={allClasses + " rounded "} src={element.src ? (element.src) : ("https://i.stack.imgur.com/y9DpT.jpg")} ></img>
                </div>
            )
        }
        //Media Text.
        if (tag == "mediaText") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><div className={`text-${element.alignment} row align-items-center py-3`} onClick={() => setFocusedIndex(index)}>
                    <div className={`col-12 col-md-6 order-${element.order} text-center`}>
                        <div className={index == FocusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")}>
                            <i className="bi bi-link-45deg lead"></i>
                            <textarea rows="1" cols="10" value={element.src} className="btn btn-light btn-light-active" styles={{ resize: 'none' }} onChange={(e) => updateElement(index, "src", "", "", e.target.value)} placeholder="Image Link" ref={FocusedIndex == index ? (FocusedElement) : (null)} />
                            <ImageUploader index={index} parentCallback={updateUrl} />
                            <button type="button" onClick={() => deleteElement(index)} className="btn btn-danger py-0 px-1"><i className="bi bi-trash lead"></i></button>
                        </div>
                        <img className={allClasses + " rounded "} src={element.src ? (element.src) : ("https://i.stack.imgur.com/y9DpT.jpg")} ></img>
                    </div>
                    <div className={`col-12 col-md-6`}>
                        <p className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} ref={FocusedIndex == index ? (FocusedElement) : (null)} value={content} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="A picture is worth a thousand words but a picture with a thousand words is better. Type here ..." onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addElement("p");
                            }
                            if (e.key === 'Backspace' && content === "") {
                                e.preventDefault();
                                deleteElement(index);
                            }
                        }} onFocus={() => setFocusedIndex(index)} />
                        </p>
                    </div>
                </div>
                </div>
            )
        }
        //carousel
        if (tag == "carousel") {
            return (
                <div key={tag + index} className={`bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                    <div className="px-0 col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2"
                        onClick={() => setFocusedIndex(index)}>
                        <Carousel
                            fade={element.animation == "fade" ? (true) : (false)}
                            interval={element.interval}
                            indicators={element.indicators}
                            controls={element.controls}
                        >
                            {element.slides.map((slide, i) =>
                                <Carousel.Item key={tag + index + "slide" + i}>
                                    <div className={index == FocusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")} >
                                        <i className="bi bi-link-45deg lead"></i>
                                        <textarea rows="1" cols="10" value={slide.src} className="btn btn-light btn-light-active" styles={{ resize: 'none' }} onChange={(e) => updateCarousel(index, i, "src", e.target.value)} placeholder="Image Link" />
                                        {/* <ImageUploader index={index} parentCallback={updateCarouselSrc(index, i, "src", e.target.value)} /> */}
                                        <DropdownButton title={<><i className="bi bi-fonts"></i>Color</>} variant={slide.textColor}>
                                            <Dropdown.Item>
                                                {BootstrapColors.map((color, j) =>
                                                    <button key={index + "propertieschange" + j + "color"} style={{ borderRadius: '100%', paddingTop: '12px' }} type="button" className={`btn btn-${color.name}`}
                                                        onClick={() => updateCarousel(index, i, "textColor", color.name)}>
                                                    </button>
                                                )}
                                            </Dropdown.Item>
                                        </DropdownButton>
                                        <button type="button" className="btn btn-primary py-0 px-1" onClick={() => updateCarousel(index, i, "increase", "")}>
                                            <i className="bi bi-plus-circle-fill lead"></i>
                                        </button>
                                        <button type="button" className="btn btn-danger py-0 px-1" onClick={() => updateCarousel(index, i, "decrease", "")}>
                                            <i className="bi bi-trash lead"></i></button>
                                    </div>
                                    <img
                                        className="d-block w-100 rounded"
                                        src={slide.src ? (slide.src) : ("https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png")}
                                        height={windowWidth < windowHeight ? (windowWidth * 9 / 16) : (windowHeight * 5 / 6)}
                                    />
                                    <Carousel.Caption className={`text-${slide.textColor}`}>
                                        <h3><TextareaAutosize style={{ overflow: 'hidden' }} value={slide.label} className={styles.textareaInherit} onChange={(e) =>
                                            updateCarousel(index, i, "label", e.target.value)} placeholder="Slide Label" onFocus={() => setFocusedIndex(index)} /></h3>
                                        <p><TextareaAutosize style={{ overflow: 'hidden' }} value={slide.caption} className={styles.textareaInherit} onChange={(e) =>
                                            updateCarousel(index, i, "caption", e.target.value)} placeholder="Images will be stretched. Type caption here ..." onFocus={() => setFocusedIndex(index)} /></p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                </div>
            )
        }

        //BUTTONS
        if (tag == "button") {
            return (<div key={tag + index} className={`text-${element.alignment} bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg} `} >
                <button type="button" className={element.btnOutline ? (`btn btn-outline-${element.btnColor}`) : (`btn btn-${element.btnColor}`)} style={{ position: 'relative' }}>
                    <div className="d-flex justify-content-start">
                        {element.iconName ? (
                            <>
                                <i className={`bi bi-${element.iconName} font-weight-bolder`}></i>{" "}
                            </>
                        ) : (<></>)}
                        <TextareaAutosize style={{ overflow: 'hidden' }} value={content} className={styles.textareaInheritBtn} onChange={(e) => updateElement(index, "content", "", "", e.target.value)} placeholder="Button Text. Type here ..." onFocus={() => setFocusedIndex(index)} />
                    </div>
                </button>
                <button type="button" onClick={() => deleteElement(index)} className={styles.delBtn}><i className="bi bi-x-circle-fill lead"></i></button>
            </div >)
        }
        //SOCIAL BUTTONS
        if (tag == "socialbtns") {
            return (
                <div key={tag + index} className={`text-${element.alignment} bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`} aria-label="btn-group" onClick={() => setFocusedIndex(index)}>
                    <div role="group" className="btn-group" onClick={() => setFocusedIndex(index)}>
                        {SocialLinks.filter((s, i) => element[s.name] !== "")
                            .map((sb, i) =>
                                <button type="button" className="btn btn-secondary"><i className={`bi bi-${sb.name} lead`}></i></button>)
                        }
                    </div>
                    <button type="button" onClick={() => deleteElement(index)} className={styles.delBtn}><i className="bi bi-x-circle-fill lead"></i></button>
                </div>
            )
        }

        //horizontal rule
        if (tag == "hr") {
            return (
                <div className={`col-12 bg-${element.bgColor}`}>
                    <div className="row" onClick={() => setFocusedIndex(index)}>
                        <div className="col-11 pr-0">
                            <hr />
                        </div>
                        <div className="col-1 p-0 text-center">
                            <button type="button" onClick={() => deleteElement(index)} className={styles.delBtn}><i className="bi bi-x-circle-fill"></i></button>
                        </div>
                    </div>
                </div>

            )
        }

        if (tag == "custom") {
            return (
                <div key={tag + index} className={`text-${element.alignment} bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg} `} >
                    {element.elementArray.map((children, i) => {
                        buildtextareaHTML(children, i)
                    })}
                </div>
            )
        }
    }

    //Properties in Format tab
    function buildActiveElementProperties(element, index) {
        if (index === FocusedIndex) {
            return (
                <div key={index + "properties"} className="d-flex justify-content-start align-items-center">
                    <div className="px-2 text-center">
                        <small>Type</small>
                        {((element.tag == "h1" || element.tag === "h2" || element.tag === "h3" || element.tag === "p" || element.tag === "h4" || element.tag === "h5" || element.tag === "h6" || element.tag === "code") && index != 0) ?
                            (<DropdownButton title={element.tag} variant="secondary">
                                {TextTags.map((t, i) =>
                                    <Dropdown.Item key={index + "propertieschange" + i} onClick={() => updateElement(FocusedIndex, "tag", "", "", t.tag)} >
                                        <i className={`bi ${t.iconName}`}></i>
                                        {t.shortName}
                                    </Dropdown.Item>)}
                            </DropdownButton>) : (
                                <>
                                    <br />
                                    <button role="button" className="btn btn-secondary">{element.tag}</button>
                                </>
                            )}
                    </div>
                    <div className="px-2 text-center">
                        <small>Reorder</small>
                        <br />
                        <button type="button" className="btn btn-secondary py-0 px-1" onClick={() => changeElementIndex(FocusedIndex, -1)} disabled={(FocusedIndex === 0) || (FocusedIndex === 1) ? (true) : (false)}>
                            <i className="bi bi-chevron-compact-up"></i>
                        </button>
                        <button type="button" className="btn btn-secondary py-0 px-1" onClick={() => changeElementIndex(FocusedIndex, 1)} disabled={(FocusedIndex === ElementArray.length - 1) || (FocusedIndex === 0) ? (true) : (false)}>
                            <i className="bi bi-chevron-compact-down"></i>
                        </button>
                    </div>

                    <div className="px-2 text-center">
                        <small>Span</small>
                        <br />
                        {/* <DropdownButton title={<i className="bi bi-phone"></i>} variant="secondary" size="sm">
                            <button type="button" className={element.col === "12" ? ("btn btn -light btn-light-active py-0 px-2") : ("btn btn-light py-0 px-2")} onClick={() => updateElement(FocusedIndex, "col", "", "", 12)} >
                                <i className="bi  bi-square lead"></i>
                            </button>
                            <button type="button" className={element.col === "6" ? ("btn btn -light btn-light-active py-0 px-2") : ("btn btn-light py-0 px-2")} onClick={() => updateElement(FocusedIndex, "col", "", "", 6)} >
                                <i className="bi  bi-layout-split lead"></i>
                            </button>
                            <button type="button" className={element.col === "4" ? ("btn btn -light btn-light-active py-0 px-2") : ("btn btn-light py-0 px-2")} onClick={() => updateElement(FocusedIndex, "col", "", "", 4)} >
                                <i className="bi  bi-layout-three-columns lead"></i>
                            </button>
                        </DropdownButton> */}
                        <textarea rows="1" cols="1" value={element.col} className="btn btn-light my-1 p-0" styles={{ resize: 'none !important' }} onChange={(e) => updateElement(index, "col", "", "", e.target.value)} placeholder="s" onFocus={() => setFocusedIndex(index)} />
                        <textarea rows="1" cols="1" value={element.colMd} className="btn btn-light my-1 p-0" styles={{ resize: 'none !important' }} onChange={(e) => updateElement(index, "colMd", "", "", e.target.value)} placeholder="m" onFocus={() => setFocusedIndex(index)} />
                        <textarea rows="1" cols="1" value={element.colLg} className="btn btn-light my-1 p-0" styles={{ resize: 'none !important' }} onChange={(e) => updateElement(index, "colLg", "", "", e.target.value)} placeholder="l" onFocus={() => setFocusedIndex(index)} />
                    </div>

                    {element.alignment ? (
                        <div className="px-2 text-center">
                            <small>Align</small>
                            <DropdownButton title={<i className={`bi bi-text-${element.alignment}`}></i>} variant="secondary">
                                <Dropdown.Item>
                                    <button type="button" className={element.alignment === "left" ? ("btn btn -light btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignment", "", "", "left")}  >
                                        <i className="bi  bi-text-left"></i>
                                    </button>

                                    <button type="button" className={element.alignment === "center" ? ("btn btn-light btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignment", "", "", "center")}>
                                        <i className="bi  bi-text-center"></i>
                                    </button>

                                    <button type="button" className={element.alignment === "right" ? ("btn btn -light btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignment", "", "", "right")}>
                                        <i className="bi  bi-text-right"></i>
                                    </button>

                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                    ) : (<></>)}

                    {element.alignSelf ?
                        (
                            <div className="px-2 text-center">
                                <small>Align</small>
                                <DropdownButton title={element.alignSelf == " " ? (<i className="bi  bi-align-top"></i>) : (
                                    element.alignSelf == "center" ? (<i className="bi  bi-align-center"></i>) : (<i className="bi  bi-align-bottom"></i>)
                                )} variant="secondary">
                                    <Dropdown.Item>
                                        <button type="button" className={element.alignSelf === " " ? ("btn btn -light btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignSelf", "", "", " ")}  >
                                            <i className="bi  bi-align-top"></i>
                                        </button>

                                        <button type="button" className={element.alignSelf === "center" ? ("btn btn-light btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignSelf", "", "", "center")}>
                                            <i className="bi  bi-align-center"></i>
                                        </button>

                                        <button type="button" className={element.alignSelf === "end" ? ("btn btn -light btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignSelf", "", "", "end")}>
                                            <i className="bi  bi-align-bottom"></i>
                                        </button>

                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        ) : (<></>)}


                    {element.typography ? (
                        <div className="px-2 text-center">
                            <small>Typography</small>
                            <br />
                            {Object.entries(element.typography).map((t, i) => {
                                return (
                                    <button key={index + t[0]} type="button" className={t[1] ? ("btn btn-light-active py-0 px-1") : ("btn btn-light py-0 px-1")} onClick={() => updateElement(FocusedIndex, "typography", t[0], "", "")}>
                                        <i className={`bi  bi-type-${t[0]}`}></i>
                                    </button>
                                )
                            })}
                        </div>
                    ) : (<></>)}


                    {element.btnColor ? (
                        <div className="px-2 text-center">
                            <small>Color</small>
                            <div className="bg-white rounded">
                                <DropdownButton title=" " variant={element.btnColor}>
                                    {BootstrapColors.map((color, i) =>
                                        <Dropdown.Item key={index + "propertieschange" + i + "color"}>
                                            <button type="button" className={element.btnOutline ? (`btn btn-outline-${color.name}`) : (`btn btn-${color.name}`)}
                                                onClick={() => updateElement(FocusedIndex, "btnColor", "", "", color.name)}>
                                                {color.name}
                                            </button>
                                        </Dropdown.Item>)}
                                    <Dropdown.Item>
                                        <button type="button" className="btn btn-link" onClick={() => updateElement(FocusedIndex, "btnColor", "", "", "link")}>
                                            link
                                        </button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <button type="button" className="btn " onClick={() => updateElement(FocusedIndex, "btnColor", "", "", " ")}>
                                            transparent
                                        </button>
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                    ) : (<></>)}
                    {element.textColor ? (
                        <div className="px-2 text-center">
                            <small><i className="bi bi-fonts"></i> Color</small>
                            <div className="bg-white rounded">
                                <DropdownButton title=" " variant={element.textColor}>
                                    <Dropdown.Item>
                                        {BootstrapColors.map((color, i) =>
                                            <button key={index + "propertieschange" + i + "color"} style={{ borderRadius: '100%', paddingTop: '12px' }} type="button" className={`btn btn-${color.name} border`}
                                                onClick={() => updateElement(FocusedIndex, "textColor", "", "", color.name)}>
                                            </button>
                                        )}
                                        <button style={{ borderRadius: '100%', paddingTop: '12px' }} type="button" className={`btn border`}
                                            onClick={() => updateElement(FocusedIndex, "textColor", "", "", "white")}>
                                        </button>
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>
                    ) : (<></>)}
                    {element.bgColor ? (
                        <div className="px-2 text-center">
                            <small><i className="bi bi-back"></i> Color</small>
                            <div className="bg-white rounded">
                                <DropdownButton title=" " variant={element.bgColor} >
                                    <Dropdown.Item>
                                        {BootstrapColors.map((color, i) =>
                                            <button key={index + "propertieschange" + i + "color"} style={{ borderRadius: '100%', paddingTop: '12px' }} type="button" className={`btn btn-${color.name} border`}
                                                onClick={() => updateElement(FocusedIndex, "bgColor", "", "", color.name)}>
                                            </button>
                                        )}
                                        <button style={{ borderRadius: '100%', paddingTop: '12px' }} type="button" className={`btn border`}
                                            onClick={() => updateElement(FocusedIndex, "bgColor", "", "", "white")}>
                                        </button>
                                    </Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </div>) : (<></>)}

                    {element.tag === "button" ?
                        (<>
                            <div className="px-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultChecked={element.btnOutline} id="btnOutlineCheck" onChange
                                        ={() => updateElement(FocusedIndex, "btnOutline", "", "", !element.btnOutline)} />
                                    <label className="form-check-label" htmlFor="defaultCheck1">
                                        Outline</label>
                                </div>
                            </div>
                            <div className="px-2 text-center">
                                <small><i className="bi bi-link-45deg"></i>{" "}Link</small>
                                <br />
                                <textarea rows="1" cols="5" value={element.href} className="btn btn-light" styles={{ resize: 'none !important' }} onChange={(e) => updateElement(index, "href", "", "", e.target.value)} placeholder="Link" onFocus={() => setFocusedIndex(index)} />
                            </div>
                            <div className="px-2 text-center">
                                <small>Icon{" "}</small>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 150, hide: 1500 }}
                                    overlay={renderIconTooltip}
                                >
                                    <i className="bi bi-info-circle-fill"></i>
                                </OverlayTrigger>
                                <br />
                                <textarea rows="1" cols="3" value={element.iconName} className="btn btn-light" styles={{ resize: 'none !important' }} onChange={(e) => updateElement(index, "iconName", "", "", e.target.value)} placeholder="icon" onFocus={() => setFocusedIndex(index)} />
                            </div>
                        </>

                        ) : (<></>)}

                    {element.tag === "socialbtns" ?
                        (<div className="px-2 text-center">
                            <small>Add Links</small>
                            <br />
                            <OverlayTrigger
                                trigger="click" placement="right"
                                delay={{ hide: 20000 }}
                                overlay={
                                    <Popover id="popover-basic">
                                        <Popover.Title as="h3">Social Links</Popover.Title>
                                        <Popover.Content>
                                            <>
                                                {SocialLinks.map((s, i) =>
                                                    <div key={index + "propertieschange" + i}>
                                                        <i className={`bi bi-${s.name} lead mr-2`}></i>
                                                        <textarea rows="1" cols="10" value={element[s.name]} className="btn btn-light my-1" styles={{ resize: 'none !important' }} onChange={(e) => updateElement(index, s.name, "", "", e.target.value)} placeholder={s.name} onFocus={() => setFocusedIndex(index)} />
                                                    </div>)}
                                            </>
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <button type="button" className="btn btn-light">Links <i className="bi bi-chevron-right"></i></button></OverlayTrigger>


                        </div>
                        ) : (<></>)}

                    {element.tag === "mediaText" ? (
                        <div className="px-2 text-center">
                            <small>Order</small>
                            <br />
                            <button type="button" className={element.order === 0 ? ("btn btn-light btn-light-active p-0") : ("btn btn-light p-0")} onClick={() => updateElement(FocusedIndex, "order", "", "", 0)} >
                                <i className="bi bi-image-fill"></i><i className="bi bi-text-paragraph"></i>
                            </button>
                            <button type="button" className={element.order === 1 ? ("btn btn-light btn-light-active p-0") : ("btn btn-light p-0")} onClick={() => updateElement(FocusedIndex, "order", "", "", 1)} >
                                <i className="bi bi-text-paragraph"></i><i className="bi bi-image-fill"></i>
                            </button>
                        </div>) : (<></>)}

                    {element.tag === "img" || element.tag === "mediaText" ?
                        (
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultChecked={element.responsive} id="imgResponsiveCheck" onChange
                                    ={() => updateElement(FocusedIndex, "responsive", "", "", !element.responsive)} />
                                <label className="form-check-label" htmlFor="imgResponsiveCheck">
                                    Responsive</label>
                            </div>
                        ) : (<></>)}

                    {element.tag == "carousel" ?
                        (
                            <>
                                <div className="px-2 text-center">
                                    <small>Animation</small>
                                    <DropdownButton title={element.animation} variant="light">
                                        <Dropdown.Item onClick={() => updateElement(FocusedIndex, "animation", "", "", "fade")} >
                                            fade
                                    </Dropdown.Item>
                                        <Dropdown.Item onClick={() => updateElement(FocusedIndex, "animation", "", "", "slide")} >
                                            slide
                                    </Dropdown.Item>
                                    </DropdownButton>
                                </div>
                                <div className="px-2 text-center">
                                    <small>Interval(ms)</small><br />
                                    <textarea rows="1" cols="4" value={element.interval} className="btn btn-light" styles={{ resize: 'none !important' }} onChange={(e) => updateElement(FocusedIndex, "interval", "", "", e.target.value)} placeholder="Interval" onFocus={() => setFocusedIndex(index)} />
                                </div>
                                <div className="px-2 text-left">
                                    <small>Settings</small>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" defaultChecked={element.controls} id="controlsCheck" onChange
                                            ={() => updateElement(FocusedIndex, "controls", "", "", !element.controls)} />
                                        <label className="form-check-label" htmlFor="controlsCheck">
                                            Controls</label>
                                    </div>
                                    <div className="form-check font-weight-smaller">
                                        <input className="form-check-input" type="checkbox" defaultChecked={element.indicators} id="indicatorsCheck" onChange
                                            ={() => updateElement(FocusedIndex, "indicators", "", "", !element.indicators)} />
                                        <label className="form-check-label" htmlFor="indicatorsCheck">
                                            Indicators</label>
                                    </div>
                                </div>
                            </>
                        ) : (<></>)}
                </div>
            )
        }
        else return (<span key={"none" + index} ></span>)
    }
    // LOGS
    console.log(ElementArray);
    console.log(FocusedIndex);

    return (
        <>
            <Head>
                <title>DaVinci | Paint blog posts</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {/* Check LOGIN STATUS */}
            {LoginStatus === true ? (
                // LOGGED IN AND LOADED
                <div className="container-fluid py-2">

                    {/* Notification and publish button */}
                    <div className="d-flex justify-content-between">
                        <div>
                            {Notification + " at "}
                            <Link href={`/blog/${LiveBlogId}`}><a>https://davinci.vercel.app/blog/{LiveBlogId}</a></Link>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={(e) => handlePublish(e)}>
                            Publish</button>
                    </div>

                    {/* Add new Element */}
                    <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        {/* Toggle button */}
                        <div>
                            <button type="button" className="btn btn-dark" onClick={() => setPreviewStatus(!PreviewStatus)}>{PreviewStatus ?
                                (<span><i className="bi bi-arrows-collapse"></i></span>) :
                                (<i className="bi bi-arrows-expand"></i>)}</button>
                        </div>

                        <div className={PreviewStatus ? ("d-none") : ("rounded border")} style={{ backgroundColor: 'white' }}>
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                <Tab eventKey="home" title="Insert" className="bg-light">
                                    <div className="d-flex justify-content-start align-items-stretch" >
                                        {/* add text elements */}
                                        <DropdownButton id="dropdown-basic-button" variant="light" title={<><i className="bi bi-type"></i>{" "}Text</>}>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("h1")}><i className="bi bi-type-h1"></i>{" "}Heading</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("h2")}><i className="bi bi-type-h2"></i>{" "}Heading</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("h3")}><i className="bi bi-type-h3"></i>{" "}Heading</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn btn-light" onClick={() => addElement("h4")}>H4</button><button type="button" className="btn btn-light" onClick={() => addElement("h5")}>H5</button><button type="button" className="btn btn-light" onClick={() => addElement("h6")}>H6</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("p")}><i className="bi bi-paragraph"></i>{" "}Paragraph</button></Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("code")}><i className="bi bi-code"></i>{" "}Code</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("blockquote")}><i className="bi bi-blockquote-left"></i>{" "}BlockQuote</button></Dropdown.Item>
                                        </DropdownButton>

                                        {/*add List Elements */}
                                        <SplitButton id="dropdown-split-button" variant="light" title={
                                            <><i className="bi bi-list-ul"></i>{" "}List</>} onClick={() => addElement("ul")}>
                                            <Dropdown.Item>
                                                <button disable type="button" className="btn" onClick={() => { addElement("ol") }}><i className="bi bi-list-ol"></i>{" "}Numbered List</button>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <button disabled type="button" className="btn" onClick={() => { addElement("ul") }}><i className="bi bi-list-ul"></i>{" "}Bulleted List</button>
                                            </Dropdown.Item>
                                        </SplitButton>

                                        {/* add Image and Media*/}
                                        <SplitButton variant="light" title={<span><i className="bi bi-image"></i> Image</span>} onClick={() => addElement("img")}>
                                            <Dropdown.Item onClick={() => addElement("mediaText")}>
                                                <i className="bi bi-image-fill"></i><i className="bi bi-text-paragraph"></i>{" "}Media Text
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => addElement("carousel")}>
                                                <i className="bi bi-collection-play-fill"></i>{" "}Carousel
                                            </Dropdown.Item>
                                        </SplitButton>

                                        {/* add Buttons */}
                                        <SplitButton id="dropdown-split-button" variant="light" title={
                                            <><i className="bi bi-stop-btn-fill"></i>{" "}Button</>} onClick={() => addElement("button")}>
                                            <Dropdown.Item onClick={() => addElement("socialbtns")}>
                                                Social Group<br />
                                                <i className="bi bi-instagram"></i>
                                                <i className="bi bi-facebook"></i>
                                                <i className="bi bi-twitter"></i>
                                                <i className="bi bi-whatsapp"></i>
                                                <i className="bi bi-github"></i>
                                                <i className="bi bi-linkedin"></i>
                                                <i className="bi bi-youtube"></i>
                                            </Dropdown.Item>
                                        </SplitButton>
                                        <button className="btn btn-light" onClick={() => addElement("hr")}>
                                            <i className="bi bi-dash"></i>{" "}Line
                                        </button>
                                        <button className="btn btn-light" onClick={() => addElement("custom")}>
                                            <i className="bi bi-dash"></i>{" "}Custom
                                        </button>
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Format" style={{ backgroundColor: '#f5f5f5' }}>
                                    <div className="pb-3">
                                        {
                                            ElementArray.map((element, index) =>
                                                buildActiveElementProperties(element, index)
                                            )
                                        }
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>

                    {/* Elements */}
                    <div className="row">
                        {ElementArray.map((e, index) =>
                            buildtextareaHTML(e, index)
                        )
                        }
                    </div>
                </div>
            ) : (
                LoginStatus !== "failure" ? (
                    // LOADING
                    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
                        <div className=""><i className="display-4 bi bi-hourglass-split"></i>
                            <h4>L O A D I N G</h4>
                            <textarea ref={FocusedElement} className="d-none" />
                            <small className="d-block d-sm-none">Tip: Use Desktop for better experience!</small>
                        </div>
                    </div>) : (
                    //NOT LOGGED IN
                    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
                        <div className=""><i className="display-4 bi bi-door-open-fill"></i>
                            <h4>NOT LOGGED IN</h4>
                            <h5><Link href="/auth/login"><a>Login here</a></Link></h5>
                            <textarea ref={FocusedElement} className="d-none" /></div>
                    </div>)
            )
            }
        </>
    )
}