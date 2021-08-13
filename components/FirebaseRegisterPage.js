import { useState } from 'react';
import firebase from 'firebase';

export default function FirebaseRegisterPageBuilder({ apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId, setPageType }) {
    const firebaseConfig = {
        apiKey,
        authDomain,
        projectId,
        storageBucket,
        messagingSenderId,
        appId,
        measurementId
    };

    try {
        firebase.initializeApp(firebaseConfig);
    } catch (err) {
        if (!/already exists/.test(err.message)) {
            console.error('Firebase initialization error', err.stack)
        }
    }
    const fire = firebase;


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
                setNotification("Account created.");
                setPageType("login")
            })
            .catch((err) => {
                setNotification(err.message);
                setTimeout(() => {
                    setNotification('')
                }, 7000)
                setUsername('')
                setPassword('');
                setPassConf('');
            });
    }
    return (
        <>
            <i className="display-4 bi bi-person-plus-fill"></i>
            <h1>Register</h1>
            <small>{notification}</small>
            {/* SIGNUP FORM */}
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" autoFocus value={userName} className="form-control"
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
        </>
    )
}