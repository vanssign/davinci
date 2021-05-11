import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Davinci | Paint your blog ideas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Davinci
        </h1>

        <p className={styles.description}>
          Paint your blog ideas{' '}
        </p>
        <small className="font-weight-bolder">Preview</small>
        <div className="embed-responsive embed-responsive-16by9 border rounded">
          <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/HjAliUawNlU?autoplay=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
        </div>
        <div className={styles.grid}>
          <Link href="/davinci"><a className={styles.card}>
            <h3>Editor &rarr;</h3>
            <i className="bi bi-input-cursor-text display-4"></i>
            <p>Post a new blog using Davinci block editor</p>
          </a></Link>

          <Link href="/blog">
            <a className={styles.card}><h3>Blogs &rarr;</h3>
              <i className="bi bi-journal-richtext display-4"></i>
              <p>List of all blogs painted with Davinci</p></a>
          </Link>

          <Link href="/auth/login">
            <a className={styles.card}><h3>Login &rarr;</h3>
              <i className="bi bi-person-badge-fill display-4"></i>
              <p>Login using email address and password</p></a>
          </Link>

          <Link href="/auth/register">
            <a className={styles.card}><h3>Register &rarr;</h3>
              <i className="bi bi-person-plus display-4"></i>
              <p>Register using email address and password</p></a>
          </Link>
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
