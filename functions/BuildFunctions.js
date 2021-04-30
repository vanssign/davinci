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
    if (element.tag === "img") {
        if (element.responsive) allClasses = allClasses.concat("img-fluid ");
    }
    if (element.textColor) {
        allClasses = allClasses.concat(`text-${element.textColor} `)
    }
    return allClasses;
}

//BUILD HTML
export function buildHTML(element, index) {
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
            <div className={`text-${element.alignment}`}>
                <img key={tag + index} className={allClasses + " border rounded "} src={element.src} />
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
            <div key={tag + index} className="text-center">
                {SocialLinks.filter((s, i) => element[s.name] !== "")
                    .map((sb, i) =>
                        <a className="text-reset" href={element[sb.name]} target="_blank">
                            <button type="button" className="btn btn-light m-1"><i className={`bi bi-${sb.name} lead`}></i></button>
                        </a>
                    )
                }
            </div>
        )
    }
    if (tag == "code") {
        return (<code key={tag + index} className={allClasses} style={{ whiteSpace: 'pre-wrap' }}>{content}</code>)
    }
    if (tag == "blockquote") {
        return (<blockquote key={tag + index} className={allClasses} cite={element.cite}>{content}</blockquote>)
    }
}

