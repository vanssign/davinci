import Link from 'next/link';
import { useState, useEffect } from 'react';
import { determineElementStructure } from '../functions/BuildFunctions';
import EditorHTML from './EditorHTML';
import EditorTabs from './EditorTabs';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import PageAttributes from '../components/PageAttributes';
export default function Davinci({ LoginStatus, elementArray, updateelementArray, LiveBlogId, Notification, pageInfo, updatepageInfo, handlePublish }) {

    const [ElementArray, setElementArray] = useState(elementArray)
    const [PageInfo, setPageInfo] = useState(
        pageInfo
    )
    const [FocusedIndex, setFocusedIndex] = useState(0);
    const [InnerFocusedIndex, setInnerFocusedIndex] = useState(-1);
    const [LastIndex, setLastIndex] = useState(0);
    const [InnerLastIndex, setInnerLastIndex] = useState(-1);
    const [PreviewStatus, setPreviewStatus] = useState(false);

    useEffect(() => {
        if (LoginStatus === true) {
            updateelementArray(ElementArray);
            setLastIndex(ElementArray.length - 1);
            if (ElementArray[FocusedIndex]) {
                if (ElementArray[FocusedIndex].tag != "custom") {
                    setInnerFocusedIndex(-1);
                    setInnerLastIndex(-1)
                }
                else {
                    setInnerLastIndex(ElementArray[FocusedIndex].elementArray.length - 1)
                }
            }
        }
    }, [ElementArray, LoginStatus])


    useEffect(() => {
        updatepageInfo(PageInfo)
    }, [PageInfo])

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

    function handleFocus(index) {
        setFocusedIndex(index);
    }
    function handleInnerFocus(index) {
        setInnerFocusedIndex(index);
    }
    function updatePageInfo(key, value) {
        let newPageInfo = { ...PageInfo }
        newPageInfo[key] = value;
        setPageInfo(newPageInfo);
    }
    console.log(ElementArray);
    return (
        <>

            {/* Notification and publish button */}
            {/* Add new Element */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10 }} className="bg-light" >
                <div className="container-fluid border border-top-0">
                    {/* Toggle button */}
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="align-self-end">
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
                                            <PageAttributes pageInfo={PageInfo} updatePageInfo={updatePageInfo} />
                                        </Popover.Content>
                                    </Popover>
                                }
                            >
                                <button type="button" className="btn px-1 py-0">
                                    <i className="bi bi-gear-fill lead"></i></button></OverlayTrigger>
                            {LoginStatus == 'preview' ? (
                                //For preview landing page
                                <>
                                    <Link href={`/auth/login`}>
                                        <a className="btn btn-info m-1">
                                            Login
                                        </a>
                                    </Link>
                                    <Link href={`/davinci`}>
                                        <a className="btn btn-primary-x m-1">
                                            Editor
                                        </a>
                                    </Link>
                                </>

                            ) : (
                                <button className="btn btn-primary-x m-1" onClick={() => handlePublish()}
                                >
                                    Publish
                                </button>
                            )}

                        </div>
                    </div>

                    <div className={PreviewStatus ? ("d-none") : ("rounded border")} style={{ backgroundColor: 'white' }}>
                        <EditorTabs elementArray={ElementArray} focusedIndex={FocusedIndex} lastIndex={LastIndex} updateElement={updateElement} changeElementIndex={changeElementIndex} addElement={addElement} customDisabled={false} />
                    </div>
                </div>
            </div>
            {/* Elements */}
            <div className="container-fluid pb-3">
                <div className="row px-1">
                    {ElementArray.map((element, index) =>
                        <EditorHTML key={element.tag + index} element={element} index={index} focusedIndex={FocusedIndex} handleFocus={handleFocus} innerFocusedIndex={InnerFocusedIndex} handleInnerFocus={handleInnerFocus} updateElement={updateElement} deleteElement={deleteElement} addElement={addElement} innerLastIndex={InnerLastIndex} parentActive={true} />
                    )
                    }
                </div>
            </div>
        </>
    )
}