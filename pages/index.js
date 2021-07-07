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
        <div className="container d-flex justify-content-between">
          <Link href="/blog"><a className="d-md-inline-block text-center">
            <i className="bi bi-journal-richtext"></i>
            <br className="d-md-none"/>
            {" "}Blogs</a></Link>
          <Link href="/davinci"><a className="d-md-inline-block text-center">
            <i className="bi bi-input-cursor-text"></i>
            <br className="d-md-none"/>
            {" "}Editor</a></Link>
          <Link href="/auth/login"><a className="d-md-inline-block text-center" >
            <i className="bi bi-person-badge-fill"></i>
            <br className="d-md-none"/>
            {" "}Login</a></Link>
          <Link href="/auth/register"><a className="d-md-inline-block text-center" >
            <i className="bi bi-person-plus"></i>
            <br className="d-md-none"/>{" "}Register</a></Link>
          <a className="d-md-inline-block  text-center" target="_blank" href="https://github.com/vanssign/davinci" >
            <i className="bi bi-github"></i>
            <br className="d-md-none"/>{" "}Github Repo</a>
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
        <div className="text-center mb-4" style={{padding:'2px 8%'}}>
          <div className="font-weight-bolder">Preview</div>
          <div className="embed-responsive embed-responsive-16by9 border rounded">
            <iframe src="https://www.youtube.com/embed/-_sQmw27mX8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen autoPlay/>
          </div>
        </div>
      </main>
    </>
  )
}