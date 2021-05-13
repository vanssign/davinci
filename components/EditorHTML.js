import { useRef, useEffect, useState } from 'react'
import ImageUploader from './uploadImage';
import { buildClassName } from '../functions/BuildFunctions';
import EditorTabs from './EditorTabs';
import TextareaAutosize from 'react-textarea-autosize';
import { Nav, Navbar, NavDropdown, DropdownButton, Dropdown, Carousel } from 'react-bootstrap';
import styles from '../styles/Davinci.module.css'

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

//Build Element
export default function EditorHTML(props) {

    const FocusedElement = useRef();
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    let tag = props.element.tag;
    let content = props.element.content;
    let allClasses = buildClassName(props.element, props.index)

    const updateUrl = (value, index) => {
        props.updateElement(index, "src", "", "", value)
    }

    const handleResize = (e) => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        // if (LoginStatus == true) {
        if (FocusedElement.current) {
            FocusedElement.current.focus();
        }
        if (windowWidth == 0) {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        // }
    }, [props.focusedIndex])

    //TEXT
    if (tag == "h1") {
        return (
            <div className={props.focusedIndex == props.index ? (`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg} borderPrimary`) : (`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`)}>
                <h1 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H1 heading. Type here.."onKeyDown={function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        props.addElement("p");
                    }
                    if (e.key === 'Backspace' && content === "") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                }} onFocus={() => props.handleFocus(props.index)} /></h1>
            </div>)
    }

    //H2
    else if (tag == "h2") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <h2 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H2 Heading. Type here ..." onKeyDown={function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        props.addElement("p");
                    }
                    if (e.key === 'Backspace' && content === "") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                }} onFocus={() => props.handleFocus(props.index)} /></h2>
            </div>)
    }

    //paragraph
    else if (tag == "p") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <p className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} value={content} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="Paragraph. Type here ..." onKeyDown={function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        props.addElement("p");
                    }
                    if (e.key === 'Backspace' && content === "") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                }} onFocus={() => props.handleFocus(props.index)} />
                </p>
            </div>

        )
    }

    //H3
    else if (tag == "h3") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <h3 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H3 Heading. Type here ..." onKeyDown={function (e) {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        props.addElement("p");
                    }
                    if (e.key === 'Backspace' && content === "") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                }} onFocus={() => props.handleFocus(props.index)} />
                </h3>
            </div>)
    }

    //H4
    else if (tag == "h4") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <h4 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H4 Heading. Type here ..." onKeyDown={function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        props.addElement("p");
                    }
                    if (e.key === 'Backspace' && content === "") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                }} onFocus={() => props.handleFocus(props.index)} />
                </h4>
            </div>)
    }

    //H5
    else if (tag == "h5") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <h5 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H5 heading. Type here ..." onKeyDown={function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        props.addElement("p");
                    }
                    if (e.key === 'Backspace' && content === "") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                }} onFocus={() => props.handleFocus(props.index)} />
                </h5>
            </div>)
    }

    //H6
    else if (tag == "h6") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <h6 className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H6 Heading. Type here ..." onKeyDown={function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        props.addElement("p");
                    }
                    if (e.key === 'Backspace' && content === "") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                }} onFocus={() => props.handleFocus(props.index)} />
                </h6>
            </div>)
    }

    //Code
    else if (tag == "code") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <code className={allClasses}>
                    <TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="Code Snippet. Type here ..."
                        onKeyDown={function (e) {
                            if (e.key === 'Backspace' && content === "") {
                                e.preventDefault();
                                props.deleteElement(props.index);
                            }
                        }} onFocus={() => props.handleFocus(props.index)} />
                </code>
            </div>
        )
    }

    //Blockquote
    else if (tag == "blockquote") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <div className="d-flex justify-content-start">
                    <i className="bi bi-link-45deg"></i>{" "}<TextareaAutosize style={{ overflow: 'hidden' }} value={props.element.cite} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "cite", "", "", e.target.value)} placeholder="Cite Link or source" onFocus={() => props.handleFocus(props.index)} /></div>
                <blockquote className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="BlockQuote text. Type here ..."
                    onKeyDown={function (e) {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            props.addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "") {
                            e.preventDefault();
                            props.deleteElement(props.index);
                        }
                    }}
                    onFocus={() => props.handleFocus(props.index)} /></blockquote>
            </div>
        )
    }

    //LISTS

    //unordered list
    else if (tag == "ul") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <ul className={allClasses}>
                    {props.elementArray[props.index].content.map((c, i) =>
                        <li key={tag + props.index + "c.value" + i}><TextareaAutosize style={{ overflow: 'hidden' }} value={c.value} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", i, "value", e.target.value)} placeholder="List Item" onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                if (c.value === "" && i !== 0) {
                                    props.updateElement(props.index, "content", "decrease", "value", "");
                                    props.addElement("p");
                                }
                                else
                                    props.updateElement(props.index, "content", "increase", "value", "")
                            }
                            if (e.key === 'Backspace' && c.value === "") {
                                e.preventDefault();
                                if (i === 0) {
                                    props.deleteElement(props.index);
                                }
                                else {
                                    props.updateElement(props.index, "content", "decrease", "value", "")
                                }
                            }
                        }} onFocus={() => props.handleFocus(props.index)} /></li>
                    )
                    }
                </ul>
            </div>
        )
    }

    //ordered list
    else if (tag == "ol") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <ol className={allClasses}>
                    {props.elementArray[props.index].content.map((c, i) =>
                        <li key={tag + props.index + "c.value" + i}><TextareaAutosize style={{ overflow: 'hidden' }} value={c.value} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", i, "value", e.target.value)} placeholder="List Item" onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                if (c.value === "" && i !== 0) {
                                    props.updateElement(props.index, "content", "decrease", "", "");
                                    props.addElement("p");
                                }
                                else
                                    props.updateElement(props.index, "content", "increase", "", "")
                            }
                            if (e.key === 'Backspace' && c.value === "") {
                                e.preventDefault();
                                if (i === 0) {
                                    props.deleteElement(props.index);
                                }
                                else {
                                    props.updateElement(props.index, "content", "decrease", "", "")
                                }
                            }
                        }} onFocus={() => props.handleFocus(props.index)} /></li>
                    )
                    }
                </ol>
            </div>
        )
    }

    //IMAGE
    else if (tag == "img") {
        return (
            <div className={`text-${props.element.alignment} py-3 bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`} onClick={() => props.handleFocus(props.index)}>
                <div className={props.index == props.focusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")}>
                    <i className="bi bi-link-45deg lead"></i>
                    <textarea rows="1" cols="10" value={props.element.src} className="btn btn-light btn-light-active" styles={{ resize: 'none' }} onChange={(e) => props.updateElement(props.index, "src", "", "", e.target.value)} placeholder="Image Link" ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} />
                    <ImageUploader index={props.index} parentCallback={updateUrl} />
                    <button type="button" onClick={() => props.deleteElement(props.index)} className="btn btn-danger py-0 px-1"><i className="bi bi-trash lead"></i></button>
                </div>
                <img className={allClasses + " rounded "} src={props.element.src ? (props.element.src) : ("https://i.stack.imgur.com/y9DpT.jpg")} ></img>
            </div>
        )
    }
    //Media Text.
    else if (tag == "mediaText") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}><div className={`text-${props.element.alignment} row align-items-center py-3`} onClick={() => props.handleFocus(props.index)}>
                <div className={`col-12 col-md-6 order-${props.element.order} text-center`}>
                    <div className={props.index == props.focusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")}>
                        <i className="bi bi-link-45deg lead"></i>
                        <textarea rows="1" cols="10" value={props.element.src} className="btn btn-light btn-light-active" styles={{ resize: 'none' }} onChange={(e) => props.updateElement(props.index, "src", "", "", e.target.value)} placeholder="Image Link" />
                        <ImageUploader index={props.index} parentCallback={updateUrl} />
                        <button type="button" onClick={() => props.deleteElement(props.index)} className="btn btn-danger py-0 px-1"><i className="bi bi-trash lead"></i></button>
                    </div>
                    <img className={allClasses + " rounded "} src={props.element.src ? (props.element.src) : ("https://i.stack.imgur.com/y9DpT.jpg")} ></img>
                </div>
                <div className={`col-12 col-md-6`}>
                    <p className={allClasses}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} className={styles.textareaInherit} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="A picture is worth a thousand words but a picture with a thousand words is better. Type here ..." onKeyDown={function (e) {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            props.addElement("p");
                        }
                        if (e.key === 'Backspace' && content === "") {
                            e.preventDefault();
                            props.deleteElement(props.index);
                        }
                    }} onFocus={() => props.handleFocus(props.index)} />
                    </p>
                </div>
            </div>
            </div>
        )
    }
    //carousel
    else if (tag == "carousel") {
        return (
            <div className={`bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`}>
                <div className="px-0 col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2"
                    onClick={() => props.handleFocus(props.index)}>
                    <Carousel
                        fade={props.element.animation == "fade" ? (true) : (false)}
                        interval={props.element.interval}
                        indicators={props.element.indicators}
                        controls={props.element.controls}
                    >
                        {props.element.slides.map((slide, i) =>
                            <Carousel.Item key={tag + props.index + "slide" + i}>
                                <div className={props.index == props.focusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")} >
                                    <i className="bi bi-link-45deg lead"></i>
                                    <textarea rows="1" cols="10" value={slide.src} className="btn btn-light btn-light-active" styles={{ resize: 'none' }} onChange={(e) => props.updateElement(props.index, "slides", i, "src", e.target.value)} placeholder="Image Link" />
                                    <DropdownButton title={<i className="bi bi-fonts"></i>} variant={slide.textColor}>
                                        <Dropdown.Item>
                                            {BootstrapColors.map((color, j) =>
                                                <button key={props.index + "propertieschange" + j + "color"} style={{ borderRadius: '100%', paddingTop: '12px' }} type="button" className={`btn btn-${color.name}`}
                                                    onClick={() => props.updateElement(props.index, "slides", i, "textColor", color.name)}>
                                                </button>
                                            )}
                                        </Dropdown.Item>
                                    </DropdownButton>
                                    <button type="button" className="btn btn-primary py-0 px-1" onClick={() => props.updateElement(props.index, "slides", i, "increase", "")}>
                                        <i className="bi bi-plus-circle-fill lead"></i>
                                    </button>
                                    <button type="button" className="btn btn-danger py-0 px-1" onClick={() => props.updateElement(props.index, "slides", i, "decrease", "")}>
                                        <i className="bi bi-trash lead"></i></button>
                                </div>
                                <img
                                    className="d-block w-100 rounded"
                                    src={slide.src ? (slide.src) : ("https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png")}
                                    height={windowWidth < windowHeight ? (windowWidth * 9 / 16) : (windowHeight * 5 / 6)}
                                />
                                <Carousel.Caption className={`text-${slide.textColor}`}>
                                    <h3><TextareaAutosize style={{ overflow: 'hidden' }} value={slide.label} className={styles.textareaInherit} onChange={(e) =>
                                        props.updateElement(props.index, "slides", i, "label", e.target.value)} placeholder="Slide Label" onFocus={() => props.handleFocus(props.index)} /></h3>
                                    <p><TextareaAutosize style={{ overflow: 'hidden' }} value={slide.caption} className={styles.textareaInherit} onChange={(e) =>
                                        props.updateElement(props.index, "slides", i, "caption", e.target.value)} placeholder="Images will be stretched. Type caption here ..." onFocus={() => props.handleFocus(props.index)} /></p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>
            </div>
        )
    }

    //BUTTONS
    else if (tag == "button") {
        return (<div className={`text-${props.element.alignment} bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg} `} >
            <button type="button" className={props.element.btnOutline ? (`btn btn-outline-${props.element.btnColor}`) : (`btn btn-${props.element.btnColor}`)} style={{ position: 'relative' }}>
                <div className="d-flex justify-content-start">
                    {props.element.iconName ? (
                        <>
                            <i className={`bi bi-${props.element.iconName} font-weight-bolder`}></i>{" "}
                        </>
                    ) : (<></>)}
                    <TextareaAutosize style={{ overflow: 'hidden' }} value={content} className={styles.textareaInheritBtn} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} placeholder="Button Text. Type here ..." onFocus={() => props.handleFocus(props.index)} />
                </div>
            </button>
            <button type="button" onClick={() => props.deleteElement(props.index)} className={styles.delBtn}><i className="bi bi-x-circle-fill lead"></i></button>
        </div >)
    }
    //SOCIAL BUTTONS
    else if (tag == "socialbtns") {
        return (
            <div className={`text-${props.element.alignment} bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`} aria-label="btn-group" onClick={() => props.handleFocus(props.index)}>
                <div role="group" className="btn-group" onClick={() => props.handleFocus(props.index)}>
                    {SocialLinks.filter((s, i) => props.element[s.name] !== "")
                        .map((sb, i) =>
                            <button key={tag + sb.name + props.index} type="button" className="btn btn-secondary"><i className={`bi bi-${sb.name} lead`}></i></button>)
                    }
                </div>
                <button type="button" onClick={() => props.deleteElement(props.index)} className={styles.delBtn}><i className="bi bi-x-circle-fill lead"></i></button>
            </div>
        )
    }

    //NAVIGATION 
    else if (tag == "navbar") {
        return (
            <div className={`text-${props.element.alignment} bg-${props.element.bgColor} align-self-${props.element.alignSelf} p-0 col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg} ` + allClasses} onClick={() => props.handleFocus(props.index)}>
                <Navbar bg={props.element.bgColor} variant={props.element.bgColor} expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Navbar.Text>
                            <button type="button" onClick={() => props.deleteElement(props.index)} className={styles.delBtn}><i className="bi bi-x-circle-fill lead"></i></button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

    //horizontal rule
    else if (tag == "hr") {
        return (
            <div className={`col-12 bg-${props.element.bgColor}`}>
                <div className="row" onClick={() => props.handleFocus(props.index)}>
                    <div className="col-11 pr-0">
                        <hr />
                    </div>
                    <div className="col-1 p-0 text-center">
                        <button type="button" onClick={() => props.deleteElement(props.index)} className={styles.delBtn}><i className="bi bi-x-circle-fill"></i></button>
                    </div>
                </div>
            </div>
        )
    }

    else if (tag == "custom") {
        function addChildElement(tag) {
            props.updateElement(props.index, "elementArray", props.innerFocusedIndex, "increase", tag)
        }
        function deleteChildElement(index) {
            props.updateElement(props.index, "elementArray", props.innerFocusedIndex, "decrease", "")
        }
        function updateChildElement(index, key, index2, key2, value) {
            if (key == "typography") {
                props.updateElement(props.index, "elementArray", index, "typography", index2)
            }
            else
                props.updateElement(props.index, "elementArray", index, key, value)
        }
        function changeChildElementIndex(index, value) {
            if (value == -1) {
                props.updateElement(props.index, "elementArray", index, "up", "")
            }
            else if (value == 1) {
                props.updateElement(props.index, "elementArray", index, "down", "")
            }
        }

        const nestedItems = props.element.elementArray.map((e, i) => {
            return <EditorHTML key={props.element.tag + "children" + i} element={e} index={i} focusedIndex={props.innerFocusedIndex} handleFocus={props.handleInnerFocus} updateElement={updateChildElement} deleteElement={deleteChildElement} addElement={addChildElement} />
        });
        return (
            <>
                <div className={`text-${props.element.alignment} bg-${props.element.bgColor} align-self-${props.element.alignSelf} col-${props.element.col} col-md-${props.element.colMd} col-lg-${props.element.colLg}`} onClick={() => props.handleFocus(props.index)} >
                    {props.focusedIndex === props.index ? (
                        <EditorTabs elementArray={props.element.elementArray} focusedIndex={props.innerFocusedIndex} lastIndex={props.innerLastIndex} updateElement={updateChildElement} addElement={addChildElement}
                        changeElementIndex={changeChildElementIndex} customDisabled={true}
                        />
                    ) : (
                        props.element.elementArray.length == 0 ? (
                        <div style={{ minHeight: '8vh' }} className="d-flex align-items-center justify-content-around border text-center rounded">
                            <span><i className="bi bi-hammer lead"></i> Build your own Custom Element here</span>
                            <button type="button" onClick={() => props.deleteElement(props.index)} className="btn btn-danger my-1 py-0 px-1"><i className="bi bi-trash lead"></i></button>
                        </div>
                    ) : (<></>))
                    }
                    <div className={props.index==props.focusedIndex?("row border"):("row")}>
                        {nestedItems}
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <></>
        )
    }

}