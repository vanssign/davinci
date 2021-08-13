import Link from 'next/link'
import { Nav, Navbar } from 'react-bootstrap'
import firebase from 'firebase';

export default function Layout({ children, loginStatus, visible, loginPagePath, signupPagePath, apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId }) {
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

    const handleLogout = () => {
        console.log("logout");
        fire.auth()
            .signOut()
    }
    if (visible) {
        return (
            <>
                <Navbar bg="light" expand className="py-0" variant="light">
                    <Link href="/"><Navbar.Brand>Davinci</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Navbar.Text className="py-0">
                            {loginStatus === true ? (
                                <button className="btn btn-danger btn-sm" onClick={() => handleLogout()}>

                                    <i className="bi bi-person-x-fill"></i>{" "}Logout

                                </button>) : (
                                <>
                                </>

                            )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <main>{children}</main>
            </>
        )
    }
    else return (<main>{children}</main>)
}