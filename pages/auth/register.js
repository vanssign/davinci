import { useState } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Register() {
  const router = useRouter();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notification, setNotification] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
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
    fire.auth()
      .createUserWithEmailAndPassword(userName, password)
      .then(()=>router.push("/"))
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
    <>
      <Head>
        <title>Register | Blog</title>
      </Head>
      <h1>Create new user</h1>
      <small>{notification}</small>
      <form onSubmit={handleLogin}>
        Email<br /> <input type="text" value={userName}
          onChange={({ target }) => setUsername(target.value)} />
        <br />
        Password<br /> <input type="password" value={password}
          onChange={({ target }) => setPassword(target.value)} />
        <br />
        Confirm Password<br /> <input type="text" value={passConf}
          onChange={({ target }) => setPassConf(target.value)} />
        <br />
        <br />
        <button type="submit">SignUp</button>
      </form>
    </>
  )
}