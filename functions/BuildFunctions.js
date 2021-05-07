import { Carousel } from 'react-bootstrap'
import { useState, useEffect } from 'react';

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
    if (element.tag === "img" || element.tag === "mediaText") {
        if (element.responsive) allClasses = allClasses.concat("img-fluid ");
    }
    if (element.textColor) {
        allClasses = allClasses.concat(`text-${element.textColor} `)
    }
    return allClasses;
}

//BUILD HTML
export function buildHTML(element, index) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    useEffect(() => {
        if (windowWidth == 0) {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
    })

    const handleResize = (e) => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };
    let tag = element.tag;
    let content = element.content;
    let allClasses = buildClassName(element, index)
    if (tag == "h1") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><h1 className={allClasses}>{content}</h1>
            </div>)
    }
    if (tag == "h2") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><h2 className={allClasses}>{content}</h2>
            </div>)
    }
    if (tag == "p") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><p className={allClasses}>{content}</p></div>)
    }
    if (tag == "h3") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><h3 className={allClasses}>{content}</h3></div>)
    }
    if (tag == "img") {
        return (
            <div key={tag + index} className={`text-${element.alignment} py-3  align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                <img className={allClasses + " rounded "} src={element.src} />
            </div>
        )
    }
    if (tag == "mediaText") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                <div className={`text-${element.alignment} row align-items-center py-3`}>
                    <div className={`col-12 col-md-6 order-${element.order} text-center`}>
                        <img className={allClasses + " rounded "} src={element.src} />
                    </div>
                    <div className="col-12 col-md-6">
                        <p className={allClasses}>{content}</p>
                    </div>
                </div>
            </div>
        )
    }
    if (tag == "carousel") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                <div className="px-0 col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    <Carousel
                        fade={element.animation == "fade" ? (true) : (false)}
                        interval={element.interval}
                        indicators={element.indicators}
                        controls={element.controls}>
                        {element.slides.map((slide, i) =>
                            <Carousel.Item key={tag + index + "slide" + i}>
                                <img
                                    className="d-block w-100 rounded"
                                    src={slide.src}
                                    height={windowWidth < windowHeight ? (windowWidth * 9 / 16) : (windowHeight * 5 / 6)}
                                />
                                <Carousel.Caption className={`text-${slide.textColor}`}>
                                    <h3>{slide.label}</h3>
                                    <p>{slide.caption}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>
            </div>
        )
    }
    if (tag == "h4") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><h4 className={allClasses}>{content}</h4></div>)
    }
    if (tag == "h5") {
        return (<div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><h5 className={allClasses}>{content}</h5></div>)
    }
    if (tag == "h6") {
        return (<div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><h6 className={allClasses}>{content}</h6></div>)
    }
    if (tag == "ul") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                <ul className={allClasses} style={{ position: 'relative' }}>
                    {element.content.map((c, i) =>
                        <li key={tag + index + "c" + i}>{c.value}</li>
                    )
                    }
                </ul>
            </div>
        )
    }
    if (tag == "ol") {
        return (
            <div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                <ol className={allClasses} style={{ position: 'relative' }}>
                    {element.content.map((c, i) =>
                        <li key={tag + index + "c" + i}>{c.value}</li>
                    )
                    }
                </ol>
            </div>
        )
    }
    if (tag == "button") {
        return (
            <div className={`text-${element.alignment} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                <a className="text-reset" href={element.href} target="_blank">
                    <button className={element.btnOutline ? (`btn btn-outline-${element.btnColor}`) : (`btn btn-${element.btnColor}`)}>
                        {element.iconName ? (<i className={`bi bi-${element.iconName} lead`}></i>) : (<></>)}
                        {" "} {content}</button>
                </a>
            </div>
        )
    }
    //SOCIAL BUTTONS
    if (tag == "socialbtns") {
        return (
            <div className={`text-${element.alignment}  align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
                <div className="btn-group" role="group" aria-label="btn-group">
                    {SocialLinks.filter((s, i) => element[s.name] !== "")
                        .map((sb, i) =>

                            <button type="button" className="btn btn-secondary">
                                <a className="text-reset" href={element[sb.name]} target="_blank">
                                    <i className={`bi bi-${sb.name} lead`}></i>
                                </a>
                            </button>
                        )
                    }
                </div>
            </div>
        )
    }
    if (tag == "code") {
        return (<div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><code className={allClasses} style={{ whiteSpace: 'pre-wrap' }}>{content}</code></div>)
    }
    if (tag == "blockquote") {
        return (<div key={tag + index} className={` align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}><blockquote className={allClasses} cite={element.cite}>{content}</blockquote></div>)
    }
    if (tag == "hr") {
        return (
            <hr />
        )
    }
}