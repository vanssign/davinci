import Head from 'next/head';
import Link from 'next/link';
import fire from '../../config/fire-config';

export default function BlogIndex({ allPostsData }) {
    return (
        <div className="container">
            <Head>
                <title>Blogs | Painted with Davinci</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <section>
                <h2>Blogs</h2>
                <ul>
                    {allPostsData.map((post) => (
                        <li key={post.id}>
                            <Link href={`/blog/${post.id}`}>
                                <a>{post.pageInfo.title}</a>
                            </Link>
                            <br />
                        </li>
                    ))}
                </ul>
                <Link href="/"><a>⟵ Back to Home</a></Link>
            </section>
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