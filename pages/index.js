import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DaVinci | Paint your blog ideas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
            <p>Post a new blog using DaVinci block editor</p>
          </a></Link>

          <Link href="/blog">
            <a className={styles.card}><h3>Blogs &rarr;</h3>
              <p>List of all blogs painted with DaVinci</p></a>
          </Link>

          <Link href="/auth/login">
            <a className={styles.card}><h3>Login &rarr;</h3>
              <p>Login using email address and password</p></a>
          </Link>

          <Link href="/auth/register">
            <a className={styles.card}><h3>Register &rarr;</h3>
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
