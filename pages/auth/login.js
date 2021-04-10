import { useRouter } from 'next/router'
import Link from "next/link";
import Head from "next/head";

import { useState } from 'react';

import fire from '../../config/fire-config';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();

  //ON LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => router.push("/davinci"))
      .catch((err) => {
        setNotification(err.message)
        setTimeout(() => {
          setNotification('')
        }, 2000)
      })
    setUsername('')
    setPassword('')
  }
  return (
    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
      <div>
        <Head>
          <title>Login | Blog</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <i className="display-4 bi bi-person-badge"></i>
        <h1>Login</h1>
        {notify}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={username} className="form-control"
              onChange={({ target }) => setUsername(target.value)} placeholder="name@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} className="form-control"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit" className="btn btn-block btn-primary">Login</button>
        </form>
        <small>Don't have an account? <Link href="/auth/register"><a>Register now !</a></Link></small>
        <br />
        <br />
        <Link href="/"><a>⟵ Back to Home</a></Link>
      </div>
    </div>
  )
}