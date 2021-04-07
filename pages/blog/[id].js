import Head from "next/head";
import fire from "../../config/fire-config";

export default function Post({ postData }) {
    function buildHTML(tag, content, index) {
        if (tag == "h2") {
            return (<h2 key={tag + index}>{content}</h2>)
        }
        if (tag == "p") {
            return (<p key={tag + index}>{content}</p>)
        }
        if (tag == "h3") {
            return (<h3 key={tag + index}>{content}</h3>)
        }
        if (tag == "img") {
            return (<img key={tag + index} src={content} />)
        }
        if (tag == "h4") {
            return (<h4 key={tag + index}>{content}</h4>)
        }
        if(tag=="ul"){
            return(
                <ul key={tag + index} style={{ position: 'relative' }}>
                {content.map((c, i) =>
                    <li key={tag + index + "c" + i}>{c}</li>
                )
                }
                </ul>
            )
        }
    }
    return (
        <div className="container-fluid">
            <Head>
                <title>{postData.title} | DaVinci</title>
            </Head>
            <h1>{postData.title}</h1>
            {
                postData.elementArray.map((element, index) =>
                    buildHTML(element.tag, element.content, index)
                )
            }
        </div>
    )
}

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

export async function getStaticProps({ params }) {
    var postData;
    const blogRef = fire.firestore().collection('blog').doc(params.id);
    const doc = await blogRef.get();
    if (!doc.exists) {
        postData={
            title:'Unexpected Error Occured',
            elementArray:[],
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