import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DaVinci | Paint your blog ideas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>DaVinci</a>
        </h1>

        <p className={styles.description}>
          A block editor to paint your blog ideas{' '}
        </p>

        <div className={styles.grid}>
          <Link href="/davinci"><a className={styles.card}>
            <h3>Editor &rarr;</h3>
            <p>Post a new blog using block editor</p>
          </a></Link>

          <a className={styles.card}>
            <h3>Blogs &rarr;</h3>
            <p>Blogs are live at /blog/:id</p>
          </a>

          <a
            className={styles.card}
          >
            <h3>Database &rarr;</h3>
            <p>Firebase's Firestore is used for Database.</p>
          </a>

          <a
            className={styles.card}
          >
            <h3>Coming Soon &rarr;</h3>
            <p>
              <ul>
                <li>Authentication based posts</li>
                <li>Edit already published posts</li>
                <li>DaVinci features</li>
              </ul>
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
