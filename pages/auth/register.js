import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import { useState } from 'react';

import fire from '../../config/fire-config';

export default function Register() {
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');

  //ON SIGNUP
  const handleSignup = (e) => {
    e.preventDefault();
    //check password and confirm passsword
    if (password !== passConf) {
      setNotification(
        'Passwords do no match!'
      )
      setTimeout(() => {
        setNotification('')
      }, 5000)
      setPassword('');
      setPassConf('');
      return null;
    }
    //send request to firebase
    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .then(() => {
        setNotification("Account created. Redirecting to Home Page");
        setTimeout(() => { router.push("/") }, 5000)
      })
      .catch((err) => {
        setNotification(err.message);
        setTimeout(() => {
          setNotification('')
        }, 6000)
        setUsername('')
        setPassword('');
        setPassConf('');
      });
  }
  return (
    <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
      <div>
        <Head>
          <title>Register | Blog</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <i className="display-4 bi bi-person-plus-fill"></i>
        <h1>Register</h1>
        <small>{notification}</small>
        {/* SIGNUP FORM */}
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={userName} className="form-control"
              onChange={({ target }) => setUsername(target.value)} placeholder="name@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} className="form-control"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="text" value={passConf} className="form-control"
              onChange={({ target }) => setPassConf(target.value)} />
          </div>
          <button type="submit" className="btn btn-block btn-primary">Signup</button>
        </form>
        <small>Already have an account? <Link href="/auth/login"><a>Login here !</a></Link></small>
        <br />
        <br />
        <Link href="/"><a>⟵ Back to Home</a></Link>
      </div>
    </div>
  )
}