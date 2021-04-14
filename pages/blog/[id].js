import Head from "next/head";
import fire from "../../config/fire-config";

export default function Post({ postData }) {

    function buildClassName(element, index) {
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
            allClasses = allClasses.concat("text-" + element.alignment+" ");
        }
        if (element.tag === "img") {
            if (element.responsive) allClasses = allClasses.concat("img-fluid ");
        }
        if(element.textColor){
            allClasses=allClasses.concat(`text-${element.textColor} `)
        }
        return allClasses;
    }

    //BUILD HTML
    function buildHTML(element, index) {
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
            return (<img key={tag + index} className={allClasses} src={element.src} />)
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
                <>
                <a key={tag + index} className="text-reset" href={element.href}>
                    <button className={element.btnOutline ? (`btn btn-outline-${element.btnColor}`) : (`btn btn-${element.btnColor}`)}>{content}</button>
                </a>
                <br/>
                </>
            )
        }
        if (tag == "code") {
            return (<code key={tag + index} className={allClasses} style={{ whiteSpace: 'pre-wrap' }}>{content}</code>)
        }
        if (tag == "blockquote") {
            return (<blockquote key={tag + index} className={allClasses} cite={element.cite}>{content}</blockquote>)
        }
    }
    return (
        <div className="container-fluid py-2">
            <Head>
                <title>{postData.title} | DaVinci</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h1>{postData.title}</h1>
            {
                postData.elementArray.map((element, index) =>
                    buildHTML(element, index)
                )
            }
        </div>
    )
}
//PATHS
export async function getStaticPaths() {
    var paths = [];
    const blogsRef = fire.firestore().collection('blog')
    const snapshot = await blogsRef.get();
    snapshot.forEach(doc => {
        paths.push({
            params: { id: doc.id },
        })
    });
    return { paths, fallback: 'blocking' }
}

//PROPS
export async function getStaticProps({ params }) {
    var postData;
    const blogRef = fire.firestore().collection('blog').doc(params.id);
    const doc = await blogRef.get();
    if (!doc.exists) {
        postData = {
            title: 'Unexpected Error Occured',
            elementArray: [],
        }
    }
    else {
        postData = doc.data();
    }
    return {
        props: {
            postData
        }
    }
}