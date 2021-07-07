import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <>
      <Head>
        <title>DaVinci | Paint your blog ideas</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="sticky-top py-1" style={{ backgroundColor: 'white' }}>
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <a >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="d-block mx-auto"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
          </a>
          <Link href="/blog"><a className="d-md-inline-block" >
            <i className="bi bi-journal-richtext"></i>{" "}Blogs</a></Link>
          <Link href="/davinci"><a className="d-md-inline-block" >
            <i className="bi bi-input-cursor-text"></i>{" "}Editor</a></Link>
          <Link href="/auth/login"><a className="d-md-inline-block" >
            <i className="bi bi-person-badge-fill"></i>{" "}Login</a></Link>
          <Link href="/auth/register"><a className="d-md-inline-block" >
            <i className="bi bi-person-plus"></i>{" "}Register</a></Link>
          <a className="d-md-inline-block" target="_blank" href="https://github.com/vanssign/davinci" >
            <i className="bi bi-github"></i>{" "}Github Repo</a>
        </div>
      </nav>

      <main className="px-3 mt-2">
        <div className="jumbotron">
          <h1 className="display-4">DaVinci</h1>
          <p className="lead">A Visual Block Editor to paint your ideas</p>
          <hr className="my-4" />
          <p>Based on Next.js and Bootstrap</p>
          <p className="lead">
            <Link href="/davinci"><a className="btn btn-outline-secondary"  role="button">Open Editor</a></Link>
          </p>
        </div>
        <div className="text-center" style={{ padding: '1rem 12rem' }}>
          <div className="font-weight-bolder">Preview</div>
          <div className="embed-responsive embed-responsive-16by9 border rounded">
            <iframe src="https://www.youtube.com/embed/-_sQmw27mX8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen autoPlay></iframe>
          </div>
        </div>
      </main>
    </>
  )
}