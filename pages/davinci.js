import Head from 'next/head'
import Link from 'next/link';

import { useState, useEffect } from 'react';

import { DropdownButton, Dropdown, SplitButton, Tabs, Tab, Tooltip, OverlayTrigger, Popover, Carousel } from 'react-bootstrap';

import { determineElementStructure } from '../functions/BuildFunctions';

import Layout from '../components/Layout';
import EditorHTML from '../components/EditorHTML';
import EditorTabs from '../components/EditorTabs';

import fire from '../config/fire-config';
import PageAttributes from '../components/PageAttributes';

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
        bgColor: "transparent",
        col: 12,
        colMd: 12,
        colLg: 12,
    }])

    const [LoginStatus, setLoginStatus] = useState("");
    const [Notification, setNotification] = useState("");
    const [LiveBlogId, setLiveBlogId] = useState("");
    const [PreviewStatus, setPreviewStatus] = useState(false);

    const [FocusedIndex, setFocusedIndex] = useState(0);
    const [InnerFocusedIndex, setInnerFocusedIndex] = useState(-1);
    const [LastIndex, setLastIndex] = useState(0);
    const [InnerLastIndex, setInnerLastIndex] = useState(-1);

    useEffect(() => {
        if (LoginStatus === true) {
            setLastIndex(ElementArray.length - 1);
            if (ElementArray[FocusedIndex]) {
                if (ElementArray[FocusedIndex].tag !== "custom") {
                    setInnerFocusedIndex(-1);
                    setInnerLastIndex(-1)
                }
                else {
                    setInnerLastIndex(ElementArray[FocusedIndex].elementArray.length - 1)
                }
            }
        }
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
        if (ElementArray[0].content) {
            fire.firestore()
                .collection('blog')
                .add({
                    elementArray: ElementArray
                }).then((docRef) => {
                    setNotification("Blog live at");
                    setLiveBlogId(docRef.id)
                })
                .catch(function (error) {
                    setNotification("Error: " + error);
                });
        }
        else {
            setNotification("Title not added!")
            setTimeout(() => {
                setNotification("")
            }, 7000)
        }
    }

    //FUNCTIONS ON ELEMENTS

    //Add new
    function addElement(tag) {
        let newElementArray = [...ElementArray];
        let element = determineElementStructure(tag, ElementArray, FocusedIndex);
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
            newElementArray[index] = newElementArray[index - 1]
            newElementArray[index - 1] = temp;
            setFocusedIndex(index - 1);
        }
        //increase  index
        else if (value == 1) {
            newElementArray[index] = newElementArray[index + 1]
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
                if (key2 == "decrease") {

                }
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
                else if (key = "elementArray") {
                    if (key2 == "increase") {
                        let newChildrenElement = determineElementStructure(value, ElementArray[FocusedIndex].elementArray, index2)
                        newElementArray[index].elementArray.splice(index2 + 1, 0, newChildrenElement);
                        setInnerFocusedIndex(InnerFocusedIndex + 1);
                    }
                    else if (key2 == "decrease") {
                        newElementArray[index].elementArray = newElementArray[index].elementArray.filter((e, i) => i != index2)
                        setInnerFocusedIndex(InnerFocusedIndex - 1);
                    }
                    else if (key2 == "up") {
                        let temp = newElementArray[index].elementArray[index2];
                        newElementArray[index].elementArray[index2] = newElementArray[index].elementArray[index2 - 1]
                        newElementArray[index].elementArray[index2 - 1] = temp;
                        setInnerFocusedIndex(InnerFocusedIndex - 1);
                    }
                    else if (key2 == "down") {
                        let temp = newElementArray[index].elementArray[index2];
                        newElementArray[index].elementArray[index2] = newElementArray[index].elementArray[index2 + 1]
                        newElementArray[index].elementArray[index2 + 1] = temp;
                        setInnerFocusedIndex(InnerFocusedIndex + 1);
                    }
                    else if (key2 == "typography") {
                        newElementArray[index].elementArray[index2][key2][value] = !newElementArray[index].elementArray[index2][key2][value]
                    }
                    else newElementArray[index].elementArray[index2][key2] = value
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
    // console.log(ElementArray);
    // console.log(InnerFocusedIndex);
    // console.log(InnerLastIndex);
    function handleFocus(index) {
        setFocusedIndex(index);
    }
    function handleInnerFocus(index) {
        setInnerFocusedIndex(index);
    }

    return (
        <Layout loginStatus={LoginStatus} visible={LoginStatus === true || LoginStatus === "failure"}>
            <Head>
                <title>Davinci | Paint blog posts</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {/* Check LOGIN STATUS */}
            {LoginStatus === true ? (
                // LOGGED IN AND LOADED
                <>
                    {/* Notification and publish button */}

                    {/* Add new Element */}
                    <div style={{ position: 'sticky', top: 0, zIndex: 10 }} className="bg-light" >
                        <div className="container-fluid border border-top-0">
                            {/* Toggle button */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <button type="button" className="btn btn-dark px-2 py-0" onClick={() => setPreviewStatus(!PreviewStatus)}>{PreviewStatus ?
                                        (<span><i className="bi bi-arrows-collapse"></i></span>) :
                                        (<i className="bi bi-arrows-expand"></i>)}</button>
                                </div>
                                <div className="text-center">
                                    {Notification + " "}
                                    {LiveBlogId ? (
                                        <Link href={`/blog/${LiveBlogId}`}><a>/blog/{LiveBlogId}</a></Link>
                                    ) : (<></>)}
                                </div>
                                {/* PAGE ATTRIBUTES */}
                                <div>
                                    <OverlayTrigger
                                        trigger="click" placement="bottom"
                                        rootClose={true}
                                        overlay={
                                            <Popover id="popover-basic">
                                                <Popover.Content>
                                                    <PageAttributes />
                                                </Popover.Content>
                                            </Popover>
                                        }
                                    >
                                        <button type="button" disabled className="btn px-1 py-0">
                                            <i className="bi bi-gear-fill lead"></i></button></OverlayTrigger>
                                    <button className="btn btn-primary-x m-1" onClick={() => handlePublish()}
                                    >
                                        Publish
                                    </button>
                                </div>
                            </div>

                            <div className={PreviewStatus ? ("d-none") : ("rounded border")} style={{ backgroundColor: 'white' }}>
                                <EditorTabs elementArray={ElementArray} focusedIndex={FocusedIndex} lastIndex={LastIndex} updateElement={updateElement} changeElementIndex={changeElementIndex} addElement={addElement} customDisabled={false} />
                            </div>
                        </div>
                    </div>

                    {/* Elements */}
                    <div className="container-fluid">
                        <div className="row px-1">
                            {ElementArray.map((element, index) =>
                                <EditorHTML key={element.tag + index} element={element} index={index} focusedIndex={FocusedIndex} handleFocus={handleFocus} innerFocusedIndex={InnerFocusedIndex} handleInnerFocus={handleInnerFocus} updateElement={updateElement} deleteElement={deleteElement} addElement={addElement} innerLastIndex={InnerLastIndex} />
                            )
                            }
                        </div>
                    </div>
                </>
            ) : (
                LoginStatus !== "failure" ? (
                    // LOADING
                    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
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