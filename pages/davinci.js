import Head from 'next/head'
import Link from 'next/link';

import { useState } from 'react';

import { DropdownButton, Dropdown, SplitButton, Tabs, Tab, Tooltip, OverlayTrigger, Popover, Carousel } from 'react-bootstrap';

import Layout from '../components/Layout';
import EditorHTML from '../components/EditorHTML';
import FormatTab from '../components/FormatTab';
import GridTab from '../components/GridTab';

import fire from '../config/fire-config';
import InsertTab from '../components/InsertTab';

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
        if (ElementArray[0].content) {
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
        let newFocusedIndex = FocusedIndex + 1;
        setFocusedIndex(newFocusedIndex);
        setElementArray(newElementArray);
    }

    //delete focused element
    function deleteElement(index) {
        let newElementArray = [...ElementArray];
        newElementArray = newElementArray.filter((e, i) => i !== index);
        let newFocusedIndex = FocusedIndex - 1;
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
        <Layout loginStatus={LoginStatus}>
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
                            <button type="button" className={!PreviewStatus ?(`btn btn-dark px-2 py-0`):(
                                `btn btn-dark px-2 py-0 opacityHalf`
                            )} onClick={() => setPreviewStatus(!PreviewStatus)}>{PreviewStatus ?
                                (<span><i className="bi bi-arrows-collapse"></i></span>) :
                                (<i className="bi bi-arrows-expand"></i>)}</button>
                        </div>

                        <div className={PreviewStatus ? ("d-none") : ("rounded border")} style={{ backgroundColor: 'white' }}>
                            <Tabs defaultActiveKey="format" id="uncontrolled-tab-example">
                                <Tab eventKey="insert" title="Insert" className="bg-light">
                                    {ElementArray[FocusedIndex] ? (
                                        <InsertTab addElement={addElement} />
                                    ) : (<div className="text-center py-3">
                                        Select an Element after which you want to insert new Element
                                    </div>)}
                                </Tab>
                                {ElementArray[FocusedIndex] ? (
                                    <Tab eventKey="format" title="Format" style={{ backgroundColor: '#ffffff' }}>
                                        <div className="pb-1">

                                            <FormatTab element={ElementArray[FocusedIndex]} index={FocusedIndex} updateElement={updateElement} changeElementIndex={changeElementIndex} ElementArrayLength={ElementArray.length} />
                                        </div>
                                    </Tab>
                                ) : (<></>)}

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
                                        <GridTab index={FocusedIndex} col={ElementArray[FocusedIndex].col} colMd={ElementArray[FocusedIndex].colMd} colLg={ElementArray[FocusedIndex].colLg} updateElement={updateElement} />
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
        </Layout>
    )
}