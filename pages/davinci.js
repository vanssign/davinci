import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link';

import { useState, useRef, useEffect } from 'react';

import TextareaAutosize from 'react-textarea-autosize';
import { DropdownButton, Dropdown, SplitButton, Tabs, Tab } from 'react-bootstrap';
import ImageUploader from '../components/uploadImage';

import fire from '../config/fire-config';

import styles from '../styles/Davinci.module.css'

var TextTags = [
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

var BtnColors = [
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


export default function DaVinci() {
    //states
    const [Title, setTitle] = useState("");
    const [ElementArray, setElementArray] = useState([])

    const [LoginStatus, setLoginStatus] = useState("");
    const [Notification, setNotification] = useState("Check out all blogs");
    const [LiveBlogId, setLiveBlogId] = useState("");
    const [PreviewStatus, setPreviewStatus] = useState(true);

    const [FocusedIndex, setFocusedIndex] = useState(-1);
    const FocusedElement = useRef();

    const router = useRouter();

    useEffect(() => {
        if (FocusedElement.current) {
            FocusedElement.current.focus();
        }
        // var newFocusedElementArray = ElementArray.filter((e, index) => index == FocusedIndex);
        // setFocusedElementArray(newFocusedElementArray);
    })

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
        if (Title) {
            fire.firestore()
                .collection('blog')
                .add({
                    title: Title,
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

    //FUNCTIONS ON ELEMENTS

    //Add new
    function addElement(tag) {
        let newElementArray = [...ElementArray];
        let element;
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
                alignment: "left",
            }
        }
        else if (tag == "img") {
            element = {
                tag: tag,
                src: "",
                classes: "img-fluid",
            }
        }
        else if (tag == "button") {
            element = {
                tag: tag,
                href: "",
                content: "",
                classes: "",
                typography: {
                    bold: false,
                    italic: false,
                    underline: false,
                    strikethrough: false,
                },
                btnColor: "secondary",
                btnOutline: false,
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
                alignment: "left",
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
                alignment: "left",
            }
        }
        newElementArray.splice(FocusedIndex + 1, 0, element);
        setFocusedIndex(FocusedIndex + 1);
        setElementArray(newElementArray);
    }

    //delete focussed element
    function deleteElement(index) {
        let newElementArray = ElementArray.filter((e, i) => i !== index);
        setFocusedIndex(index - 1);
        setElementArray(newElementArray);
    }

    //update element
    function updateElement(index, key, index2, value) {
        let newElementArray = [...ElementArray];
        if (!index2) {
            newElementArray[index][key] = value;
        }
        else if (index2) {
            if (key == "content") {
                if (index2 == "increase") {
                    newElementArray[index].content.push({ value: "" });
                }
                else if (index2 == "decrease") {
                    newElementArray[index].content.pop();
                }
                else {
                    newElementArray[index].content[index2].value = value;
                }
            }
            if (key == "typography") {
                newElementArray[index].typography[index2] = !ElementArray[index].typography[index2];
            }
        }
        setElementArray(newElementArray);
    }

    function buildClassName(element, index) {
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
            allClasses = allClasses.concat("text-" + element.alignment);
        }
        return allClasses;
    }

    const updateUrl = (value, index) => {
        updateElement(index, "src", "", value)
    }


    //Build Element
    function buildtextareaHTML(element, index) {

        let tag = element.tag;
        let content = element.content;
        let classes = element.classes;
        let allClasses = buildClassName(element, index)

        //TEXT

        //H2
        if (tag == "h2") {
            return (<h2 key={tag + index} className={allClasses}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="H2 Heading" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} /></h2>)
        }

        //paragraph
        if (tag == "p") {
            return (<p key={tag + index} className={allClasses}><TextareaAutosize ref={FocusedIndex == index ? (FocusedElement) : (null)} value={content} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="Paragraph" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </p>)
        }

        //H3
        if (tag == "h3") {
            return (<h3 key={tag + index} className={allClasses}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} styles={{ textDecoration: 'underline' }} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="H3 Heading" onKeyDown={function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </h3>)
        }

        //H4
        if (tag == "h4") {
            return (<h4 key={tag + index} className={allClasses}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="H4 Heading" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </h4>)
        }

        //H5
        if (tag == "h5") {
            return (<h5 key={tag + index} className={allClasses}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="H5 headiing" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </h5>)
        }

        //H6
        if (tag == "h6") {
            return (<h6 key={tag + index} className={allClasses}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="H6 Heading" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </h6>)
        }

        //Code
        if (tag == "code") {
            return (
                <code key={tag + index} className={allClasses}>
                    <TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="Code Snippet"
                        onKeyDown={function (e) {
                            if (e.key === 'Backspace' && content === "") {
                                e.preventDefault();
                                deleteElement(index);
                            }
                        }} onFocus={() => setFocusedIndex(index)} />
                </code>
            )
        }

        //Blockquote
        if (tag == "blockquote") {
            return (
                <div key={tag + index}>
                    <div className="d-flex justify-content-start">
                        <i className="bi bi-link"></i>{" "}<TextareaAutosize value={element.cite} className={styles.textareaInherit} onChange={(e) => updateElement(index, "cite", e.target.value)} placeholder="Cite Link or source" onFocus={() => setFocusedIndex(index)} /></div>
                    <blockquote className={allClasses}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="BlockQuote text"
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
                <ul key={tag + index} className={allClasses}>
                    {ElementArray[index].content.map((c, i) =>
                        <li key={tag + index + "c.value" + i}><TextareaAutosize value={c.value} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", i, e.target.value)} placeholder="List Item" onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                if (c.value === "" && i !== 0) {
                                    updateElement(index, "content", "decrease", "");
                                    addElement("p");
                                }
                                else
                                    updateElement(index, "content", "increase", "")
                            }
                            if (e.key === 'Backspace' && c.value === "") {
                                e.preventDefault();
                                if (i === 0) {
                                    deleteElement(index);
                                }
                                else {
                                    updateElement(index, "content", "decrease", "")
                                }
                            }
                        }} onFocus={() => setFocusedIndex(index)} /></li>
                    )
                    }
                </ul>
            )
        }

        //ordered list
        if (tag == "ol") {
            return (
                <ol key={tag + index} className={allClasses}>
                    {ElementArray[index].content.map((c, i) =>
                        <li key={tag + index + "c.value" + i}><TextareaAutosize value={c.value} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", i, e.target.value)} placeholder="List Item" onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                if (c.value === "" && i !== 0) {
                                    updateElement(index, "content", "decrease", "");
                                    addElement("p");
                                }
                                else
                                    updateElement(index, "content", "increase", "")
                            }
                            if (e.key === 'Backspace' && c.value === "") {
                                e.preventDefault();
                                if (i === 0) {
                                    deleteElement(index);
                                }
                                else {
                                    updateElement(index, "content", "decrease", "")
                                }
                            }
                        }} onFocus={() => setFocusedIndex(index)} /></li>
                    )
                    }
                </ol>
            )
        }

        //IMAGE
        if (tag == "img") {
            return (
                <div key={tag + index} className={allClasses}>
                    <div className="d-flex justify-content-start">
                        <i className="bi bi-link"></i>{" "}
                        <textarea rows={1} value={element.src} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInheritLink} onChange={(e) => updateElement(index, "src", "", e.target.value)} placeholder="Image Link" onFocus={() => setFocusedIndex(index)} />
                        <ImageUploader index={index} parentCallback={updateUrl} />
                    </div>
                    <div className="d-flex align-items-start">
                        <img src={element.src ? (element.src) : ("https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg")} ></img>
                        <button type="button" onClick={() => deleteElement(index)} className={styles.delBtn}><i className="bi bi-x-circle-fill"></i></button></div>
                </div>
            )
        }

        //BUTTONS
        if (tag == "button") {
            return (<div key={tag + index}>
                <div className="d-flex justify-content-start">
                    <i className="bi bi-link"></i>{" "}
                    <TextareaAutosize value={element.href} className={styles.textareaInherit} onChange={(e) => updateElement(index, "href", e.target.value)} placeholder="Link" onFocus={() => setFocusedIndex(index)} />
                </div>
                <div className="d-flex align-items-start">
                    <button type="button" className={element.btnOutline ? (`btn btn-outline-${element.btnColor}`) : (`btn btn-${element.btnColor}`)} style={{ position: 'relative' }}>
                        <TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", "", e.target.value)} placeholder="button" onFocus={() => setFocusedIndex(index)} />
                    </button>
                    <button type="button" onClick={() => deleteElement(index)} className={styles.delBtn}><i className="bi bi-x-circle-fill"></i></button>
                </div>
            </div>)
        }
    }


    function buildActiveElementProperties(element, index) {
        if (index === FocusedIndex) {
            return (
                <div key={index + "properties"} className="d-flex justify-content-start align-items-center">
                    <div className="px-2 text-center">
                        <small>TYPE</small>
                        {(element.tag === "h2" || element.tag === "h3" || element.tag === "p" || element.tag === "h4" || element.tag === "h5" || element.tag === "h6" || element.tag === "code") ?
                            (<DropdownButton title={element.tag} variant="light">
                                {TextTags.map((t, i) =>
                                    <Dropdown.Item key={index + "propertieschange" + i}>
                                        <button type="button" className="btn" onClick={() => updateElement(FocusedIndex, "tag", "", t.tag)}>
                                            <i className={`bi ${t.iconName}`}></i>
                                            {t.shortName}
                                        </button>
                                    </Dropdown.Item>)}
                            </DropdownButton>) : (
                                <>
                                    <br />
                                    <button role="button" className="btn btn-light">{element.tag}</button>
                                </>
                            )}
                    </div>
                    {element.alignment ? (
                        <div className="px-2 text-center">
                            <small>ALIGN</small>
                            <br />
                            <button type="button" className={element.alignment === "left" ? ("btn btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignment", "", "left")}  >
                                <i className="bi  bi-text-left"></i>
                            </button>
                            <button type="button" className={element.alignment === "center" ? ("btn btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignment", "", "center")}>
                                <i className="bi  bi-text-center"></i>
                            </button>
                            <button type="button" className={element.alignment === "right" ? ("btn btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "alignment", "", "right")}>
                                <i className="bi  bi-text-right"></i>
                            </button>
                        </div>
                    ) : (<></>)}


                    {element.typography ? (
                        <div className="px-2 text-center">
                            <small>TYPOGRAPHY</small>
                            <br />
                            {Object.entries(element.typography).map((t, i) => {
                                return (
                                    <button key={index + t[0]} type="button" className={t[1] ? ("btn btn-light-active") : ("btn btn-light")} onClick={() => updateElement(FocusedIndex, "typography", t[0], "")}>
                                        <i className={`bi  bi-type-${t[0]}`}></i>
                                    </button>
                                )
                            })}
                        </div>
                    ) : (<></>)}
                    {element.btnColor ? (
                        <div className="px-2 text-center">
                            <small>COLOR</small>
                            <br />
                            <DropdownButton title="  " variant={element.btnColor}>
                                {BtnColors.map((color, i) =>
                                    <Dropdown.Item key={index + "propertieschange" + i + "color"}>
                                        <button type="button" className={element.btnOutline ? (`btn btn-outline-${color.name}`) : (`btn btn-${color.name}`)}
                                            onClick={() => updateElement(FocusedIndex, "btnColor", "", color.name)}>
                                            {color.name}
                                        </button>
                                    </Dropdown.Item>)}
                            </DropdownButton>
                        </div>
                    ) : (<></>)}
                    {element.tag === "button" ?
                        (
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" defaultChecked={element.btnOutline} id="defaultCheck1" onChange
                                    ={() => updateElement(FocusedIndex, "btnOutline", "", !element.btnOutline)} />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Outline</label>
                            </div>

                        ) : (<></>)}
                </div>
            )
        }
        else return (<span key={"none" + index} ></span>)
    }

    function buildTitleProperties() {
        return (
            <div key={FocusedIndex + "properties"} className="d-flex justify-content-start align-items-center">
                <div className="px-2 text-center">
                    <small>TYPE</small><br />
                    <button type="button" className="btn btn-secondary">h1</button>
                </div>

                <div className="px-2 text-center">
                    <small>ALIGN</small>
                    <br />
                    <button type="button" className="btn btn-light">
                        <i className="bi  bi-text-left"></i>
                    </button>
                    <button type="button" className="btn btn-light">
                        <i className="bi  bi-text-center"></i>
                    </button>
                    <button type="button" className="btn btn-light">
                        <i className="bi  bi-text-right"></i>
                    </button>
                </div>
            </div>
        )
    }
    //LOGS
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
                <div className="container-fluid pt-2">

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

                        <div className={PreviewStatus ? ("d-none") : ("rounded")}>
                            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                                <Tab eventKey="home" title="Insert">
                                    <div className="d-flex justify-content-start align-items-stretch bg-light" >
                                        {/* add text elements */}
                                        <DropdownButton id="dropdown-basic-button" variant="light" title={<><i className="bi bi-type"></i>{" "}Text</>}>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("h2")}><i className="bi bi-type-h2"></i>{" "}Heading</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("h3")}><i className="bi bi-type-h3"></i>{" "}Heading</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn btn-light" onClick={() => addElement("h4")}>H4</button><button type="button" className="btn btn-light" onClick={() => addElement("h5")}>H5</button><button type="button" className="btn btn-light" onClick={() => addElement("h6")}>H6</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("p")}><i className="bi bi-paragraph"></i>{" "}Paragraph</button></Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("code")}><i className="bi bi-code"></i>{" "}Code</button></Dropdown.Item>
                                            <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("blockquote")}><i className="bi bi-blockquote-left"></i>{" "}BlockQuote</button></Dropdown.Item>
                                        </DropdownButton>

                                        {/*add List Elements */}
                                        <SplitButton disabled id="dropdown-split-button" variant="light" title={
                                            <><i className="bi bi-list-ul"></i>{" "}List</>} onClick={() => addElement("ul")}>
                                            <Dropdown.Item>
                                                <button disable type="button" className="btn" onClick={() => { addElement("ol") }}><i className="bi bi-list-ol"></i>{" "}Numbered List</button>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <button disabled type="button" className="btn" onClick={() => { addElement("ul") }}><i className="bi bi-list-ul"></i>{" "}Bulleted List</button>
                                            </Dropdown.Item>
                                        </SplitButton>

                                        {/* add Image */}
                                        <button type="button" className="btn btn-light" onClick={() => addElement("img")}><i className="bi bi-image"></i>{" "}Image</button>

                                        {/* add Buttons */}
                                        <SplitButton id="dropdown-split-button" variant="light" title={
                                            <><i className="bi bi-stop-btn-fill"></i>{" "}Button</>} onClick={() => addElement("button")}>
                                            <Dropdown.Item>
                                                SOCIAL BUTTONS
                                    </Dropdown.Item>
                                        </SplitButton>
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Format">
                                    <div >
                                        {FocusedIndex === -1 ?
                                            (
                                                buildTitleProperties()
                                            ) :
                                            (
                                                ElementArray.map((element, index) =>
                                                    buildActiveElementProperties(element, index)
                                                )
                                            )
                                        }
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>

                    {/* Elements */}
                    <div >
                        <h1><TextareaAutosize ref={FocusedIndex == -1 ? (FocusedElement) : (null)} value={Title} className={styles.textareaInherit} onChange={(e) => setTitle(e.target.value)} placeholder="Title" onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addElement("p");
                            }
                        }} onFocus={() => setFocusedIndex(-1)} /></h1>
                        {ElementArray.map((e, index) =>
                            buildtextareaHTML(e, index)
                        )
                        }
                        {/* {ElementArray.map((e, index) => buildActiveElementProperties(e, index))} */}
                    </div>
                </div>
            ) : (
                LoginStatus !== "failure" ? (
                    // LOADING
                    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
                        <div className=""><i className="display-4 bi bi-hourglass-split"></i>
                            <h4>L O A D I N G</h4>
                            <textarea ref={FocusedElement} className="d-none" /></div>
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