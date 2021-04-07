import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router'
import Link from "next/link";
import Head from "next/head";

export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    fire.auth()
      .signInWithEmailAndPassword(username, password)
      .then(()=>router.push("/"))
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
    <div className="container">
      <Head>
        <title>Login | Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Login</h1>
      {notify}
      <form onSubmit={handleLogin}>
        Email<br/><input type="text" value={username} 
        onChange={({target}) => setUsername(target.value)} placeholder="name@example.com" /> 
        <br />
        Password<br/><input type="password" value={password} 
        onChange={({target}) => setPassword(target.value)} /> 
        <br />
        <br/>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <small>Don't have an account? <Link href="/auth/register"><a>Register now !</a></Link></small>
      <br/>
      <br/>
      <Link href="/"><a>⟵ Back to Home</a></Link>
    </div>
  )
}