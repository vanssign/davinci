import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
<>
    <header className="site-header sticky-top py-1" style={{backgroundColor:'white'}}>
  <nav className="container d-flex flex-column flex-md-row justify-content-between">
    <a className="py-2"  aria-label="Product">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="d-block mx-auto" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
    </a>

    <Link href="/blog"><a className="py-2 d-none d-md-inline-block" >
    <i className="bi bi-journal-richtext"></i>{" "}Blogs</a></Link>
    <Link href="/davinci"><a className="py-2 d-none d-md-inline-block" >
    <i className="bi bi-input-cursor-text"></i>{" "}Editor</a></Link>
    <Link href="auth/login"><a className="py-2 d-none d-md-inline-block" >
    <i className="bi bi-person-badge-fill"></i>{" "}Login</a></Link>
    <Link href="/auth/register"><a className="py-2 d-none d-md-inline-block" >
    <i className="bi bi-person-plus"></i>{" "}Register</a></Link>
    <a className="py-2 d-none d-md-inline-block" target="_blank" href="https://github.com/vanssign/davinci" >
    <i className="bi bi-github"></i>{" "}Github Repo</a>
  </nav>
</header>

<main>
  <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
    <div className="col-md-5 p-lg-5 mx-auto my-5">
      <h1 className="display-4 fw-normal">Davinci</h1>
      <p className="lead fw-normal">A Visual Block Editor to paint your ideas</p>
      <Link href="/davinci"><a className="btn btn-outline-secondary">Open Editor</a></Link>
    </div>
    <div className="product-device shadow-sm d-none d-md-block"></div>
    <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
  </div>
  <div className="text-center" style={{padding:'1rem 16rem'}}>
  <div className="font-weight-bolder">Preview</div>
    <div className="embed-responsive embed-responsive-16by9 border rounded">
          <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/-_sQmw27mX8?autoplay=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe>
       </div>
  </div>
  </main>
</>
  )
}