import Head from 'next/head'
import Link from 'next/link';

import { useState } from 'react';

import { DropdownButton, Dropdown, SplitButton, Tabs, Tab, Tooltip, OverlayTrigger, Popover, Carousel } from 'react-bootstrap';

import EditorHTML from '../components/EditorHTML';
import FormatTab from '../components/FormatTab';

import fire from '../config/fire-config';

var ColValues = [
    {
        value: 12,
        iconName: "square"
    },
    {
        value: 11,
        iconName: ""
    },
    {
        value: 10,
        iconName: ""
    },
    {
        value: 9,
        iconName: ""
    },
    {
        value: 8,
        iconName: ""
    },
    {
        value: 7,
        iconName: ""
    },
    {
        value: 6,
        iconName: "layout-split"
    },
    {
        value: 5,
        iconName: ""
    },
    {
        value: 4,
        iconName: "layout-three-columns"
    },
    {
        value: 3,
        iconName: ""
    },
    {
        value: 2,
        iconName: ""
    },
    {
        value: 1,
        iconName: ""
    },
]


export default function Davinci() {
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

    const [FocusedIndex, setFocusedIndex] = useState(0);

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

        let colMd = determineCol(newElementArray[FocusedIndex].colMd, "colMd");
        let col = determineCol(newElementArray[FocusedIndex].col, "col")
        let colLg = determineCol(newElementArray[FocusedIndex].colLg, "colLg")

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
        // else if (tag == "mediaCover") {
        //     element = {
        //         tag: tag,
        //         src: "",
        //         responsive: true,
        //         alignment: 'left',
        //         alignSelf: "center",
        //         bgColor: "white",
        //         content: "",
        //         col: col,
        //         colMd: colMd,
        //         colLg: colLg,
        //     }
        // }

        else if (tag == "button") {
            element = {
                tag: tag,
                href: "",
                content: "",
                classes: "",
                btnColor: "light",
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
        let newFocusedIndex=FocusedIndex+1;
        setFocusedIndex(newFocusedIndex);
        setElementArray(newElementArray);
    }

    //delete focused element
    function deleteElement(index) {
        let newElementArray = [...ElementArray];
        newElementArray = newElementArray.filter((e, i) => i !== index);
        let newFocusedIndex=FocusedIndex-1;
        setFocusedIndex(newFocusedIndex);
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

        if (index2 || Number.isInteger(index2)) {
            if (key2) {
                if (key == "slides") {
                    if (key2 == "increase") {
                        newElementArray[index].slides.splice(index2 + 1, 0, {
                            src: "",
                            label: "",
                            caption: "",
                            textColor: "light",
                        });
                    }
                    else if (key2 == "decrease") {
                        if (newElementArray[index].slides.length == 1) {
                            newElementArray = ElementArray.filter((e, i) => i !== index);
                            setFocusedIndex(FocusedIndex - 1);
                        }
                        else {
                            newElementArray[index].slides = newElementArray[index].slides.filter((e, i) => i != index2);
                        }
                    }
                    else {
                        newElementArray[index].slides[index2][key2] = value;
                    }
                }
            }
            else {
                if (key == "typography") {
                    newElementArray[index][key][index2] = !ElementArray[index][key][index2];
                }
            }
        }
        else {
            newElementArray[index][key] = value;
        }
        setElementArray(newElementArray)
    }

    
    // LOGS
    console.log(ElementArray);
    console.log(FocusedIndex);

    function handleFocus(index) {
        setFocusedIndex(index);
    }

    return (
        <>
            <Head>
                <title>Davinci | Paint blog posts</title>
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
                            <button type="button" className="btn btn-dark px-2 py-0" onClick={() => setPreviewStatus(!PreviewStatus)}>{PreviewStatus ?
                                (<span><i className="bi bi-arrows-collapse"></i></span>) :
                                (<i className="bi bi-arrows-expand"></i>)}</button>
                        </div>

                        <div className={PreviewStatus ? ("d-none") : ("rounded border")} style={{ backgroundColor: 'white' }}>
                            <Tabs defaultActiveKey="format" id="uncontrolled-tab-example">
                                <Tab eventKey="insert" title="Insert" className="bg-light">
                                    <div className="d-flex flex-wrap justify-content-start align-items-stretch">
                                        {/* add text elements */}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Text Elements
                                                </Tooltip>
                                            }
                                        >
                                            <DropdownButton id="dropdown-basic-button" variant="light" title={<i className="bi bi-type"></i>}>
                                                <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("h1")}><i className="bi bi-type-h1"></i>{" "}Heading</button></Dropdown.Item>
                                                <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("h2")}><i className="bi bi-type-h2"></i>{" "}Heading</button></Dropdown.Item>
                                                <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("h3")}><i className="bi bi-type-h3"></i>{" "}Heading</button></Dropdown.Item>
                                                <Dropdown.Item><button type="button" className="btn btn-light" onClick={() => addElement("h4")}>H4</button><button type="button" className="btn btn-light" onClick={() => addElement("h5")}>H5</button><button type="button" className="btn btn-light" onClick={() => addElement("h6")}>H6</button></Dropdown.Item>
                                                <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("p")}><i className="bi bi-paragraph"></i>{" "}Paragraph</button></Dropdown.Item>
                                                <Dropdown.Divider />
                                                <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("code")}><i className="bi bi-code"></i>{" "}Code</button></Dropdown.Item>
                                                <Dropdown.Item><button type="button" className="btn" onClick={() => addElement("blockquote")}><i className="bi bi-blockquote-left"></i>{" "}BlockQuote</button></Dropdown.Item>
                                            </DropdownButton>
                                        </OverlayTrigger>


                                        {/*add List Elements */}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Lists
                                                </Tooltip>
                                            }
                                        >
                                            <SplitButton id="dropdown-split-button" disabled variant="light" title={
                                                <i className="bi bi-list-ul"></i>} onClick={() => addElement("ul")}>
                                                <Dropdown.Item>
                                                    <button disable type="button" className="btn" onClick={() => { addElement("ol") }}><i className="bi bi-list-ol"></i>{" "}Numbered List</button>
                                                </Dropdown.Item>
                                                <Dropdown.Item>
                                                    <button disabled type="button" className="btn" onClick={() => { addElement("ul") }}><i className="bi bi-list-ul"></i>{" "}Bulleted List</button>
                                                </Dropdown.Item>
                                            </SplitButton>
                                        </OverlayTrigger>


                                        {/* add Image and Media*/}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Image and Media Elements
                                                </Tooltip>
                                            }
                                        >
                                            <SplitButton variant="light" title={<i className="bi bi-image"></i>} onClick={() => addElement("img")}>
                                                <Dropdown.Item onClick={() => addElement("mediaText")}>
                                                    <i className="bi bi-image-fill"></i><i className="bi bi-text-paragraph"></i>{" "}Media Text
                                            </Dropdown.Item>
                                                <Dropdown.Item onClick={() => addElement("carousel")}>
                                                    <i className="bi bi-collection-play-fill"></i>{" "}Carousel
                                            </Dropdown.Item>
                                            </SplitButton>
                                        </OverlayTrigger>


                                        {/* add Buttons */}
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Button and Button Groups
                                                </Tooltip>
                                            }
                                        >
                                            <SplitButton id="dropdown-split-button" variant="light" title={
                                                <><i className="bi bi-stop-btn-fill"></i></>} onClick={() => addElement("button")}>
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
                                        </OverlayTrigger>
                                        
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Horizontal Line
                                                </Tooltip>
                                            }
                                        >
                                            <button className="btn btn-light" onClick={() => addElement("hr")} >
                                            <i className="bi bi-dash"></i>
                                        </button>
                                        </OverlayTrigger>
                                        
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Navigation 
                                                </Tooltip>
                                            }
                                        >
                                             <button disabled className="btn btn-light" onClick={() => addElement("navbar")}>
                                            <i className="bi bi-menu-app-fill"></i>
                                        </button>
                                        </OverlayTrigger>
                                       
                                    </div>
                                </Tab>

                                <Tab eventKey="format" title="Format" style={{ backgroundColor: '#ffffff' }}>
                                    <div className="pb-1">
                                        {ElementArray[FocusedIndex]?(
                                            <FormatTab element={ElementArray[FocusedIndex]} index={FocusedIndex} updateElement={updateElement} changeElementIndex={changeElementIndex} ElementArrayLength={ElementArray.length}/>
                                        ):(<></>)}
                                    </div>
                                </Tab>
                                {ElementArray[FocusedIndex] ? (ElementArray[FocusedIndex].col ? (
                                    <Tab eventKey="grid" title={
                                        <>
                                            {"Grid "}
                                            < OverlayTrigger
                                                placement="bottom"
                                                delay={{ show: 150, hide: 1500 }}
                                                overlay={<Tooltip id="button-grid-tooltip">
                                                    Entire screen width is divided into 12 columns. If the value is 12, the block will cover entire screen width, if 6 it will cover half and so on. Other elements fit accordingly to cover the screen.<br /><br />
                                                    Choose separately for mobile, tablets and laptops as per your convenience and design. Read about <a href="https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-grid-system.php" target="_blank">Bootstrap Grid System</a>
                                                </Tooltip>}
                                            >
                                                <i className="bi bi-question-circle-fill"></i>
                                            </OverlayTrigger>
                                        </>} className="bg-light">
                                        <div className="container-fluid">
                                            <div className="row text-center">
                                                <div className="col-4 pt-2 justify-content-center align-items-center d-flex">
                                                    <div>
                                                        <i className="bi bi-phone-fill lead"></i>
                                                        <br />
                                                        <small>Mobile</small>
                                                    </div>
                                                    <DropdownButton size="sm" variant="light" title={ElementArray[FocusedIndex].col}>
                                                        {ColValues.map((col, i) =>
                                                            <Dropdown.Item key={i + "colchange"} onClick={() => updateElement(FocusedIndex, "col", "", "", col.value)}>
                                                                {`${col.value}`}
                                                                {/* <i className={`bi bi-${col.iconName}`}></i> */}
                                                            </Dropdown.Item>)}
                                                    </DropdownButton>
                                                </div>
                                                <div className="col-4 pt-2 justify-content-center align-items-center d-flex">
                                                    <div>
                                                        <i className="bi bi-tablet-fill lead"></i>
                                                        <br />
                                                        <small>Tablet</small>
                                                    </div>
                                                    <DropdownButton size="sm" variant="light" title={ElementArray[FocusedIndex].colMd}>
                                                        {ColValues.map((col, i) =>
                                                            <Dropdown.Item key={i + "colchange"} onClick={() => updateElement(FocusedIndex, "colMd", "", "", col.value)}>
                                                                {`${col.value}`}
                                                                {/* <i className={`bi bi-${col.iconName}`}></i> */}
                                                            </Dropdown.Item>)}
                                                    </DropdownButton>
                                                </div>
                                                <div className="col-4 pt-2 justify-content-center align-items-center d-flex">
                                                    <div>
                                                        <i className="bi bi-laptop-fill lead"></i>
                                                        <br />
                                                        <small>Laptop</small>
                                                    </div>
                                                    <DropdownButton size="sm" variant="light" title={ElementArray[FocusedIndex].colLg}>
                                                        {ColValues.map((col, i) =>
                                                            <Dropdown.Item key={i + "colchange"} onClick={() => updateElement(FocusedIndex, "colLg", "", "", col.value)}>
                                                                {`${col.value}`}
                                                                {/* <i className={`bi bi-${col.iconName}`}></i> */}
                                                            </Dropdown.Item>)}
                                                    </DropdownButton>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab>
                                ) : (<></>)) : (<></>)}
                            </Tabs>
                        </div>
                    </div>

                    {/* Elements */}
                    <div className="row">
                        {ElementArray.map((element, index) =>
                            <EditorHTML key={element.tag + index} element={element} index={index} FocusedIndex={FocusedIndex} handleFocus={handleFocus} updateElement={updateElement} deleteElement={deleteElement} addElement={addElement} />
                        )
                        }
                    </div>
                </div>
            ) : (
                LoginStatus !== "failure" ? (
                    // LOADING
                    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '90vh', width: '100vw' }}>
                        <div className=""><i className="display-4 bi bi-hourglass-split"></i>
                            <h4>L O A D I N G</h4>
                            <small className="d-block d-sm-none">Tip: Use Desktop for better experience!</small>
                        </div>
                    </div>) : (
                    //NOT LOGGED IN
                    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '90vh', width: '100vw' }}>
                        <div className=""><i className="display-4 bi bi-door-open-fill"></i>
                            <h4>NOT LOGGED IN</h4>
                            <h5><Link href="/auth/login"><a>Login here</a></Link></h5>
                        </div>
                    </div>)
            )
            }
        </>
    )
}