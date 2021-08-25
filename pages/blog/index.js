import Head from 'next/head';
import Link from 'next/link';
import fire from '../../config/fire-config';
let placeholderImg = "data:image/jpeg;base64,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"
export default function BlogIndex({ allPostsData }) {
    return (
        <div>
            <Head>
                <title>Blogs | Painted with Davinci</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main className="container pb-4">
                <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 font-italic">All the blogs posted through Davinci Editor</h1>
                        <p className="lead my-3">Now easily post blogs as if you are painting on a canvas.</p>
                        <Link href="/davinci">
                            <p className="lead mb-0"><a href="#" className="text-white font-weight-bold">Get Started...</a></p>
                        </Link>
                    </div>
                </div>

                <div className="row mb-2">
                    {allPostsData.map((post) => (
                        <div key={post.id} className="col-md-6">
                            <Link href={`/blog/${post.id}`}>
                                <div className="card flex-md-row mb-4 box-shadow h-md-250" style={{ overflow: 'hidden' }}>
                                    <div className="card-body d-flex flex-column align-items-start">
                                        <strong className="d-inline-block mb-2 text-primary">Category</strong>
                                        <h3 className="mb-0">
                                            <a className="text-dark" href="#">{post.pageInfo.title}</a>
                                        </h3>
                                        <div className="mb-1 text-muted">date</div>
                                        <p className="card-text mb-auto">{post.pageInfo.excerpt}</p>
                                        <a href="#">Continue reading</a>
                                    </div>
                                    <img className="card-img-right flex-auto d-none d-md-block"
                                        src={post.pageInfo.feautredImage || placeholderImg} alt="Card image cap" width="200" style={{ height: 'auto' }} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <Link href="/"><a>⟵ Back to Home</a></Link>
            </main>

        </div>
    )
}

export async function getStaticProps() {
    var allPostsData = [];
    const blogsRef = fire.firestore().collection('blog')
    const snapshot = await blogsRef.get();
    snapshot.forEach(doc => {
        allPostsData.push({
            id: doc.id,
            ...doc.data()
        })
    });
    return {
        props: {
            allPostsData,
        },
    };
}