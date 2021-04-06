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
    }
    return (
        <div>
            <h1>{postData.title}</h1>
            {
                postData.tagsArray.map((tag, index) =>
                    buildHTML(tag, postData.contentArray[index], index)
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
            tagsArray:[],
            contentArray:[],
            title:'error'
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