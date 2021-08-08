import { useRef, useEffect, useState } from 'react'
import ImageUploader from './uploadImage';
import { buildClassName, buildElementContainerClasses } from '../functions/BuildFunctions';
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

    //blue active outline for focused element
    const activeClass = () => {
        if (props.index == props.focusedIndex)
            return " borderPrimary my-1 zIndex5 "
        else return ""
    }
    let activeBorder = activeClass();
    
    //visible utility class to hide and show items
    const visibleClass = () => {
        if (props.index !== props.focusedIndex)
            return " d-none "
        else return ""
    }

    const FocusedElement = useRef();
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    let tag = props.element.tag;
    let content = props.element.content;
    
    //building all classes as per attributes
    let allClasses = buildClassName(props.element, props.index)
    let containerClasses = buildElementContainerClasses(props.element);

    //src update callback for img and carousels
    const updateUrl = (value, index) => {
        props.updateElement(index, "src", "", "", value)
    }

    const handleResize = (e) => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        if (FocusedElement.current) {
            FocusedElement.current.focus();
        }
    }, [props.focusedIndex])

    useEffect(() => {
        //new added scroll into view
        // if (!(props.index < props.lastIndex)) {
        //     if (FocusedElement.current) {
        //         FocusedElement.current.scrollIntoView();
        //     }
        // }

        //window width and height for carousel -- update needed
        if (windowWidth == 0) {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize)
    })

    //TEXT
    if (tag == "h1") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <h1 className={allClasses + `w-100 align-self-${props.element.alignSelf}`}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H1 heading. Type here.." onKeyDown={function (e) {
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
                }} onFocus={() => props.handleFocus(props.index)} /></h1>
            </div>)
    }

    //H2
    else if (tag == "h2") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <h2 className={allClasses + `w-100 align-self-${props.element.alignSelf}`}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H2 Heading. Type here ..." onKeyDown={function (e) {
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
                }} onFocus={() => props.handleFocus(props.index)} /></h2>
            </div>)
    }

    //paragraph
    else if (tag == "p") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <p className={allClasses + `w-100 align-self-${props.element.alignSelf}`}><TextareaAutosize style={{ overflow: 'hidden' }} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} value={content} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="Paragraph. Type here ..." onKeyDown={function (e) {
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
                }} onFocus={() => props.handleFocus(props.index)} />
                </p>
            </div>

        )
    }

    //H3
    else if (tag == "h3") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <h3 className={allClasses + `w-100 align-self-${props.element.alignSelf}`}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H3 Heading. Type here ..." onKeyDown={function (e) {
                    if (e.key === "Enter") {
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
                }} onFocus={() => props.handleFocus(props.index)} />
                </h3>
            </div>)
    }

    //H4
    else if (tag == "h4") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <h4 className={allClasses + `w-100 align-self-${props.element.alignSelf}`}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H4 Heading. Type here ..." onKeyDown={function (e) {
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
                }} onFocus={() => props.handleFocus(props.index)} />
                </h4>
            </div>)
    }

    //H5
    else if (tag == "h5") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <h5 className={allClasses + `w-100 align-self-${props.element.alignSelf}`}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H5 heading. Type here ..." onKeyDown={function (e) {
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
                }} onFocus={() => props.handleFocus(props.index)} />
                </h5>
            </div>)
    }

    //H6
    else if (tag == "h6") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <h6 className={allClasses + `w-100 align-self-${props.element.alignSelf}`}><TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="H6 Heading. Type here ..." onKeyDown={function (e) {
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
                }} onFocus={() => props.handleFocus(props.index)} />
                </h6>
            </div>)
    }

    //Code
    else if (tag == "code") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <code className={allClasses + ` w-100 align-self-${props.element.alignSelf}`}>
                    <TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="Code Snippet. Type here ..."
                        onKeyDown={function (e) {
                            if ((e.key === 'Backspace' || e.key === 'Delete') && content === "") {
                                e.preventDefault();
                                props.deleteElement(props.index);
                            }
                            if (e.key === "Control" && e.key === "Shift" && e.key === "Delete") {
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
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
                <div className={`w-100 align-self-${props.element.alignSelf}`}>
                    <blockquote className={allClasses + " blockquote"}>
                        <p className="mb-0">
                            <TextareaAutosize style={{ overflow: 'hidden' }} value={content} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="BlockQuote text. Type here ..."
                                onKeyDown={function (e) {
                                    if (e.key === "Enter") {
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
                                }}
                                onFocus={() => props.handleFocus(props.index)} />
                        </p>
                        <footer className="blockquote-footer">
                            <TextareaAutosize style={{ overflow: 'hidden', width: '20vw' }} value={props.element.cite} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "cite", "", "", e.target.value)} placeholder="Cite Title here..."
                                onKeyDown={function (e) {
                                    if (e.key === "Control" && e.key === "Shift" && e.key === "Delete") {
                                        e.preventDefault();
                                        props.deleteElement(props.index);
                                    }
                                }}
                                onFocus={() => props.handleFocus(props.index)} />
                        </footer>
                    </blockquote>
                </div>
            </div>
        )
    }

    //IMAGE
    else if (tag == "img") {
        return (
            <div className={"py-2 " + containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)}>
                <div className={`w-100 align-self-${props.element.alignSelf}` + allClasses} style={{ position: 'relative' }}>
                    <div className={props.index == props.focusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")} style={{ position: 'absolute', top: '45%', width: '100%' }}>
                        <i className="bi bi-link-45deg lead"></i>
                        <textarea rows="1" cols="10" value={props.element.src} className="btn borderActive bg-white resizeNone" onChange={(e) => props.updateElement(props.index, "src", "", "", e.target.value)} placeholder="Image Link" />
                        <ImageUploader index={props.index} parentCallback={updateUrl} />
                        <button type="button" onClick={() => props.deleteElement(props.index)} className="btn btn-danger py-0 px-1"><i className="bi bi-trash lead"></i></button>
                    </div>
                    <img ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} className={allClasses + " rounded "} src={props.element.src ? (props.element.src) : ("https://i.stack.imgur.com/y9DpT.jpg")} ></img>
                </div>
            </div>
        )
    }

    //carousel
    else if (tag == "carousel") {
        return (
            <div className={containerClasses + " py-2 " + activeBorder} onClick={() => props.handleFocus(props.index)} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)}>
                <div className={"px-0 col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 " + `w-100 align-self-${props.element.alignSelf}`}
                    onClick={() => props.handleFocus(props.index)}>
                    <Carousel
                        fade={props.element.animation == "fade" ? (true) : (false)}
                        interval={parseInt(props.element.interval)}
                        indicators={props.element.indicators}
                        controls={props.element.controls}
                    >
                        {props.element.slides.map((slide, i) =>
                            <Carousel.Item key={tag + props.index + "slide" + i}>
                                <div className={props.index == props.focusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")} >
                                    <i className="bi bi-link-45deg lead"></i>
                                    <textarea rows="1" cols="10" value={slide.src} className="btn borderActive bg-white resizeNone" styles={{ resize: 'none' }} onChange={(e) => props.updateElement(props.index, "slides", i, "src", e.target.value)} placeholder="Image Link" />
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
        return (<div className={`py-2 ` + containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)}>
            <div className={`w-100 align-self-${props.element.alignSelf} text-${props.element.alignment}`}>
                <button type="button" className={props.element.btnOutline ? (`btn btn-${props.element.size} btn-outline-${props.element.btnColor}`) : (`btn btn-${props.element.btnColor} btn-${props.element.size}`)} style={{ position: 'relative' }}>
                    <div className="d-flex justify-content-start">
                        {(props.element.iconName && (props.element.iconPosition == "start")) ? (
                            <>
                                <i className={`bi bi-${props.element.iconName} font-weight-bolder`}></i>{" "}
                            </>
                        ) : (<></>)}
                        <TextareaAutosize style={{ overflow: 'hidden' }} value={content} className={styles.textareaInheritBtn} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} placeholder="Button Text. Type here ..." onFocus={() => props.handleFocus(props.index)} onKeyDown={function (e) {
                            if ((e.key === 'Backspace' || e.key === 'Delete') && content === "") {
                                e.preventDefault();
                                props.deleteElement(props.index);
                            }
                            if (e.key === "Control" && e.key === "Shift" && e.key === "Delete") {
                                e.preventDefault();
                                props.deleteElement(props.index);
                            }
                        }} />
                        {(props.element.iconName && props.element.iconPosition == "end") ? (
                            <>
                                {" "}
                                <i className={`bi bi-${props.element.iconName} font-weight-bolder`}></i>
                            </>
                        ) : (<></>)}
                    </div>
                </button>
                <button type="button" className={"btn btn-danger py-0 px-1" + visibleClass()} onClick={() => props.deleteElement(props.index)}>
                    <i className="bi bi-trash lead"></i></button>
            </div>
        </div >)
    }
    //SOCIAL BUTTONS
    else if (tag == "socialbtns") {
        return (
            <div className={`py-2 ` + containerClasses + activeBorder} aria-label="btn-group" onClick={() => props.handleFocus(props.index)} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)}>
                <div className={`w-100 align-self-${props.element.alignSelf} ` + allClasses}>
                    <div role="group" className={`btn-group btn-group-${props.element.size}`} onClick={() => props.handleFocus(props.index)}>
                        {SocialLinks.filter((s, i) => props.element[s.name] !== "")
                            .map((sb, i) =>
                                <button key={tag + sb.name + props.index} type="button" className="btn btn-secondary"><a className="text-reset" href={props.element[sb.name]} target="_blank">
                                <i className={`bi bi-${sb.name} lead`}></i>
                            </a></button>)
                        }
                    </div>
                    <button type="button" className={"btn btn-danger py-0 px-1" + visibleClass()} onClick={() => props.deleteElement(props.index)}>
                        <i className="bi bi-trash lead"></i></button>
                </div>
            </div>
        )
    }

    //NAVIGATION 
    else if (tag == "navbar") {
        return (
            <div className={`text-${props.element.alignment} p-0` + containerClasses + activeBorder + allClasses} onClick={() => props.handleFocus(props.index)}>
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

    //embeds and iframes
    else if (tag == "embed") {
        return (
            <div className={"py-2 " + containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)} >
                <div className={`w-100 align-self-${props.element.alignSelf} ` + allClasses}>
                    <div className={`embed-responsive embed-responsive-${props.element.aspectRatio}`} style={{
                        position: 'relative'
                    }}>
                        <iframe className="embed-responsive-item border rounded" src={props.element.src} allowFullScreen ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} />
                        <div className={props.index !== props.focusedIndex ? ("overlay") : ("d-none")} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} onClick={() => props.handleFocus(props.index)}></div>
                        <div className={props.index == props.focusedIndex ? ("d-flex justify-content-center align-items-stretch") : ("d-none")} style={{ position: 'absolute', top: '45%', left: 0, width: '100%' }}>
                            <i className="bi bi-link-45deg lead"></i>
                            <textarea rows="1" cols="10" value={props.element.src} className="btn borderActive bg-white resizeNone" onChange={(e) => props.updateElement(props.index, "src", "", "", e.target.value)} placeholder="Source Link" />
                            <button type="button" onClick={() => props.deleteElement(props.index)} className="btn btn-danger py-0 px-1"><i className="bi bi-trash lead"></i></button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    //horizontal rule
    else if (tag == "hr") {
        return (
            <div className={containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} >
                <div className="row w-100">
                    <div className="col-11 pr-0">
                        <hr />
                    </div>
                    <div className="col-1 p-0 text-center">
                        <button type="button" className={"btn btn-danger py-0 px-1" + visibleClass()} onClick={() => props.deleteElement(props.index)}>
                            <i className="bi bi-trash lead"></i></button>
                    </div>
                </div>
            </div>
        )
    }

    //DESIGN ELEMENTS
    //spacer 
    else if (tag == "spacer") {
        return (
            <span style={{ height: `${props.element.height}px`, cursor: 'pointer' }} className={"text-center text-muted justify-content-around " + containerClasses + activeBorder} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} onClick={() => props.handleFocus(props.index)}>
                <span className="align-self-center">--Spacer--</span>
                <button type="button" className={"btn btn-danger py-0 px-1 " + visibleClass()} onClick={() => props.deleteElement(props.index)}>
                    <i className="bi bi-trash lead"></i>
                </button>
            </span>
        )
    }
    //fill the 12 grid columns
    else if (tag == "gutter") {
        return (
            <span style={{ cursor: 'pointer' }} className={"text-center text-muted justify-content-around " + containerClasses + activeBorder} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} onClick={() => props.handleFocus(props.index)}>
                <span className="align-self-center">-Gutter-</span>
                <button type="button" className={"btn btn-danger py-0 px-1 " + visibleClass()} onClick={() => props.deleteElement(props.index)}>
                    <i className="bi bi-trash lead"></i></button>
            </span>
        )
    }
    
    //LISTS
    else if (tag == "li") {
        return (
            <li className={activeBorder}>
                4<TextareaAutosize style={{ overflow: 'hidden' }} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)} value={content} className={styles.textareaInherit} onChange={(e) => props.updateElement(props.index, "content", "", "", e.target.value)} placeholder="List Item. Type here ..." onKeyDown={function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        props.addElement("li");
                    }
                    if ((e.key === 'Backspace' || e.key === 'Delete') && content === "") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                    if (e.key === "Control" && e.key === "Shift" && e.key === "Delete") {
                        e.preventDefault();
                        props.deleteElement(props.index);
                    }
                }} onFocus={() => props.handleFocus(props.index)} />
            </li>
        )
    }
    else if (tag == "ul") {
        return (
            <div className={`text-${props.element.alignment} ` + containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)}>
                <div className={`w-100 align-self-${props.element.alignSelf}`}>
                </div>
            </div>
        )
    }
    //CUSTOM BUILD ELEMENTS
    else if (tag == "custom") {
        function addChildElement(tag) {
            props.updateElement(props.index, "elementArray", props.innerFocusedIndex, "increase", tag)
        }
        function deleteChildElement(index) {
            props.updateElement(props.index, "elementArray", index, "decrease", "")
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
        //nested elements of custom element
        const nestedItems = props.element.elementArray.map((e, i) => {
            return <EditorHTML key={props.element.tag + "children" + i} element={e} index={i} focusedIndex={props.innerFocusedIndex} handleFocus={props.handleInnerFocus} updateElement={updateChildElement} deleteElement={deleteChildElement} addElement={addChildElement} />
        });
        return (
            <>
                <div className={`text-${props.element.alignment} ` + containerClasses + activeBorder} onClick={() => props.handleFocus(props.index)} ref={props.focusedIndex == props.index ? (FocusedElement) : (null)}>
                    <div className={`w-100 align-self-${props.element.alignSelf}`}>
                        {props.focusedIndex === props.index ? (
                            //show editor tabs when focused
                            <div className={props.element.elementArray.length == 0 ? ("d-flex") : ("border")}>
                                <EditorTabs elementArray={props.element.elementArray} focusedIndex={props.innerFocusedIndex} lastIndex={props.innerLastIndex} updateElement={updateChildElement} addElement={addChildElement}
                                    changeElementIndex={changeChildElementIndex} customDisabled={true}
                                />
                                {props.element.elementArray.length == 0 ? (
                                    <button type="button" onClick={() => props.deleteElement(props.index)} className="btn btn-danger my-1 py-0 px-1"><i className="bi bi-trash lead"></i></button>)
                                    : (<></>)
                                }
                            </div>
                        ) : (
                            props.element.elementArray.length == 0 ? (
                                <div className="d-flex align-items-center justify-content-around border text-center rounded bg-light" style={{ cursor: 'pointer', minHeight: '8vh' }}>
                                    <span><i className="bi bi-hammer lead"></i> Build your own Custom Element click here</span>
                                    <button type="button" onClick={() => props.deleteElement(props.index)} className="btn btn-danger my-1 py-0 px-1"><i className="bi bi-trash lead"></i></button>
                                </div>
                            ) : (<></>))
                        }
                        <div className="row px-1">
                            {nestedItems}
                        </div>
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
