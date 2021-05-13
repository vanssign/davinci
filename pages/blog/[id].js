import Head from "next/head";
import fire from "../../config/fire-config";
import PageHTML from '../../components/PageHTML';

export default function Post({ postData }) {   
    return (
        <div className="container-fluid py-2">
            <Head>
                <title>{postData.elementArray[0].content} | Davinci</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="row">
            {
                postData.elementArray.map((element, index) =>
                    <PageHTML key={element.tag+index} element={element} index={index}/>
                )
            }
            </div>
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