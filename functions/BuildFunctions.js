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
    if (tag == "h2") {
        return (<h2 key={tag + index} className={allClasses}>{content}</h2>)
    }
    if (tag == "p") {
        return (<p key={tag + index} className={allClasses}>{content}</p>)
    }
    if (tag == "h3") {
        return (<h3 key={tag + index} className={allClasses}>{content}</h3>)
    }
    if (tag == "img") {
        return (
            <div key={tag + index} className={`text-${element.alignment} py-3`}>
                <img className={allClasses + " border rounded "} src={element.src} />
            </div>
        )
    }
    if (tag == "mediaText") {
        return (
            <div key={tag + index} className={`text-${element.alignment} row align-items-center py-3`}>
                <div className={`col-12 col-md-6 order-${element.order} text-center`}>
                    <img className={allClasses + " border rounded "} src={element.src} />
                </div>
                <div className="col-12 col-md-6">
                    <p className={allClasses}>{content}</p>
                </div>
            </div>
        )
    }
    if (tag == "carousel") {
        return (
            <div key={tag + index} className="px-0 col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <Carousel>
                    {element.slides.map((slide, i) =>
                        <Carousel.Item key={tag + index + "slide" + i}>
                            <img
                                className="d-block w-100 border rounded"
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
        )
    }
    if (tag == "h4") {
        return (<h4 key={tag + index} className={allClasses}>{content}</h4>)
    }
    if (tag == "h5") {
        return (<h5 key={tag + index} className={allClasses}>{content}</h5>)
    }
    if (tag == "h6") {
        return (<h6 key={tag + index} className={allClasses}>{content}</h6>)
    }
    if (tag == "ul") {
        return (
            <ul key={tag + index} className={allClasses} style={{ position: 'relative' }}>
                {element.content.map((c, i) =>
                    <li key={tag + index + "c" + i}>{c.value}</li>
                )
                }
            </ul>
        )
    }
    if (tag == "ol") {
        return (
            <ol key={tag + index} className={allClasses} style={{ position: 'relative' }}>
                {element.content.map((c, i) =>
                    <li key={tag + index + "c" + i}>{c.value}</li>
                )
                }
            </ol>
        )
    }
    if (tag == "button") {
        return (
            <div key={tag + index} className={`text-${element.alignment}`}>
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
            <div key={tag + index} className={`text-${element.alignment}`}>
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
        return (<code key={tag + index} className={allClasses} style={{ whiteSpace: 'pre-wrap' }}>{content}</code>)
    }
    if (tag == "blockquote") {
        return (<blockquote key={tag + index} className={allClasses} cite={element.cite}>{content}</blockquote>)
    }
    if (tag == "hr") {
        return (
            <hr key={tag + index} />
        )
    }
}

