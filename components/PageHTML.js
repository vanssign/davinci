import { Carousel } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { buildClassName, buildElementContainerClasses } from '../functions/BuildFunctions';
//BUILD HTML
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

export default function PageHTML({ element, index }) {
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
    let containerClasses = buildElementContainerClasses(element);

    if (tag == "h1") {
        return (
            <div className={containerClasses}>
                <h1 className={allClasses + ` w-100 align-self-${element.alignSelf}`}>{content}</h1>
            </div>)
    }
    if (tag == "h2") {
        return (
            <div className={containerClasses}>
                <h2 className={allClasses + ` w-100 align-self-${element.alignSelf}`}>{content}</h2>
            </div>)
    }
    if (tag == "p") {
        return (
            <div className={containerClasses}>
                <p className={allClasses + ` w-100 align-self-${element.alignSelf}`}>{content}</p>
            </div>)
    }
    if (tag == "h3") {
        return (
            <div className={containerClasses}>
                <h3 className={allClasses + ` w-100 align-self-${element.alignSelf}`}>{content}</h3>
            </div>)
    }
    if (tag == "img") {
        return (
            <div className={containerClasses}>
                <img className={allClasses + `rounded w-100 align-self-${element.alignSelf}`} src={element.src} />
            </div>
        )
    }
    if (tag == "h4") {
        return (
            <div className={containerClasses}>
                <h4 className={allClasses + ` w-100 align-self-${element.alignSelf}`}>{content}</h4>
            </div>
        )
    }
    if (tag == "h5") {
        return (
            <div className={containerClasses}>
                <h5 className={allClasses + ` w-100 align-self-${element.alignSelf}`}>{content}</h5>
            </div>)
    }
    if (tag == "h6") {
        return (
            <div className={containerClasses}>
                <h6 className={allClasses + ` w-100 align-self-${element.alignSelf}`}>{content}</h6>
            </div>
        )
    }
    if (tag == "code") {
        return (<div className={containerClasses}>
            <code className={allClasses + ` w-100 align-self-${element.alignSelf}`} style={{ whiteSpace: 'pre-wrap' }}>{content}</code>
        </div>)
    }
    if (tag == "blockquote") {
        return (<div className={containerClasses}>
            <div className={`w-100 align-self-${element.alignSelf}`}>
                <blockquote className={allClasses + " blockquote"}>
                    <p className="mb-0">{content}</p>
                    <footer className="blockquote-footer">
                        <cite title={element.cite}>{element.cite}</cite>
                    </footer>
                </blockquote>
            </div>
        </div>)
    }

    if (tag == "carousel") {
        return (
            <div className={containerClasses + " py-2 "}>
                <div className={"px-0 col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 " + `w-100 align-self-${element.alignSelf}`}>
                    <Carousel
                        fade={element.animation == "fade" ? (true) : (false)}
                        interval={parseInt(element.interval)}
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

    if (tag == "ul") {
        return (
            <div className={` bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
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
            <div className={` bg-${element.bgColor} align-self-${element.alignSelf} col-${element.col} col-md-${element.colMd} col-lg-${element.colLg}`}>
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
            <div className={`py-2 ` + containerClasses}>
                <div className={`w-100 align-self-${element.alignSelf} text-${element.alignment}`}>
                    <a className="text-reset" href={element.href} target="_blank">
                        <button className={element.btnOutline ? (`btn btn-outline-${element.btnColor} btn-${element.size}`) : (`btn btn-${element.btnColor} btn-${element.size}`)}>
                            {(element.iconName && element.iconPosition == "start") ? (
                                <>
                                    <i className={`bi bi-${element.iconName} font-weight-bolder`}></i>{" "}
                                </>
                            ) : (<></>)}
                            {content}
                            {(element.iconName && element.iconPosition == "end") ? (
                                <>
                                    {" "}
                                    <i className={`bi bi-${element.iconName} font-weight-bolder`}></i>
                                </>
                            ) : (<></>)
                            }
                        </button>
                    </a>
                </div>
            </div>
        )
    }
    //SOCIAL BUTTONS
    if (tag == "socialbtns") {
        return (
            <div className={"py-2 " + containerClasses}>
                <div className={`w-100 align-self-${element.alignSelf} ` + allClasses}>
                    <div className={`btn-group btn-group-${element.size}`} role="group" aria-label="btn-group">
                        {SocialLinks.filter((s, i) => element[s.name] !== "")
                            .map((sb, i) =>

                                <button key={tag + index + "sociallinks" + i} type="button" className="btn btn-secondary">
                                    <a className="text-reset" href={element[sb.name]} target="_blank">
                                        <i className={`bi bi-${sb.name} lead`}></i>
                                    </a>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    else if (tag == "embed") {
        return (
            <div className={"py-2 " + containerClasses} onClick={() => handleFocus(index)} >
                <div className={`w-100 align-self-${element.alignSelf} ` + allClasses}>
                    <div class={`embed-responsive embed-responsive-${element.aspectRatio}`} >
                        <iframe class="embed-responsive-item border rounded" src={element.src} allowfullscreen />
                    </div>
                </div>
            </div >
        )
    }

    if (tag == "hr") {
        return (
            <div className={containerClasses}>
                <hr className="w-100"/>
            </div>
        )
    }
    else if (tag == "spacer") {
        return (
            <span style={{ display: 'inline-block', height: `${element.height}px`}} className={containerClasses}>
            </span>
        )
    }
    else if (tag == "gutter") {
        return (
            <span style={{ display: 'inline-block'}} className={containerClasses}>
            </span>
        )
    }
    if (tag == "custom") {
        const nestedItems = element.elementArray.map((e, i) => {
            return <PageHTML key={element.elementArray.tag + "custom" + i} element={e} index={i} />;
        });
        return (
            <div className={`text-${element.alignment} ` + containerClasses} >
                <div className={`w-100 align-self-${element.alignSelf}`}>
                    <div className="row">
                        {nestedItems}
                    </div>
                </div>
            </div>
        )
    }
}