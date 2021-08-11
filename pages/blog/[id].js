import Head from "next/head";
import fire from "../../config/fire-config";
import PageHTML from '../../components/PageHTML';
import Error from 'next/error'

export default function Post({ postData, err }) {
    if (err) {
        return (
            <Error statusCode="404" />
        )
    }
    else
        return (
            <div className="container-fluid py-2">
                <Head>
                    <title>{postData.pageInfo.title?(postData.pageInfo.title):(postData.elementArray[0].content )} | Davinci</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    {postData.pageInfo.excerpt ? (
                        <meta name="description" content={postData.pageInfo.excerpt} />
                    ) : (<></>)}
                    {postData.pageInfo.tags ? (<meta name="keywords" content={postData.pageInfo.tags} />) : (<></>)}

                </Head>
                <div className="row py-3">
                    {
                        postData.elementArray.map((element, index) =>
                            <PageHTML key={element.tag + index} element={element} index={index} />
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
    var err;
    const blogRef = fire.firestore().collection('blog').doc(params.id);
    const doc = await blogRef.get();
    if (!doc.exists) {
        postData = [];
        err = true;
    }
    else {
        postData = doc.data();
        err = false;
    }
    return {
        props: {
            postData,
            err
        }
    }
}