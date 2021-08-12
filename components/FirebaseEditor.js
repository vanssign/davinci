import Link from 'next/link';

import { useState } from 'react';
import Layout from './Layout';
import Editor from './Editor';
import firebase from 'firebase';

export default function FirebaseEditor({ loginPagePath, apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId,signupPagePath }) {
    //states
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

    const [PageInfo, setPageInfo] = useState(
        {
            title: "",
            excerpt: "",
            tags: "",
            feautredImage: "",
        }
    )


    const [ElementArray, setElementArray] = useState([{
        tag: "h1",
        content: "",
        classes: "",
        typography: {
            bold: false,
            italic: false,
            underline: false,
            strikethrough: false,
        },
        textColor: "dark",
        alignment: "left",
        alignSelf: "center",
        bgColor: "transparent",
        col: 12,
        colMd: 12,
        colLg: 12,
    }])

    const [LoginStatus, setLoginStatus] = useState("");
    const [Notification, setNotification] = useState("");
    const [LiveBlogId, setLiveBlogId] = useState("");


    //Auth Check
    fire.auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoginStatus(true);
            }
            else {
                setLoginStatus("failure");
            }
        })

    //Publish
    const handlePublish = (event) => {
        if (PageInfo.title) {
            fire.firestore()
                .collection('blog')
                .add({
                    elementArray: ElementArray,
                    pageInfo: PageInfo
                }).then((docRef) => {
                    setNotification("Blog live at");
                    setLiveBlogId(docRef.id)
                })
                .catch(function (error) {
                    setNotification("Error: " + error);
                });
        }
        else {
            setNotification("Title not added. Open settings and add Page Attributes!")
            setTimeout(() => {
                setNotification("")
            }, 7000)
        }
    }

    return (
        <Layout loginStatus={LoginStatus} visible={LoginStatus === true || LoginStatus === "failure"}
            loginPagePath={loginPagePath}
            signupPagePath={signupPagePath}
            apiKey={apiKey}
            authDomain={authDomain}
            projectId={projectId}
            storageBucket={storageBucket}
            messagingSenderId={messagingSenderId}
            appId={appId}
            measurementId={measurementId}
        >
            {/* Check LOGIN STATUS */}
            {
                LoginStatus === true ? (
                    // LOGGED IN AND LOADED
                    <div>
                        <Editor elementArray={ElementArray} LoginStatus={LoginStatus} updateelementArray={setElementArray} pageInfo={PageInfo} updatepageInfo={setPageInfo} Notification={Notification} LiveBlogId={LiveBlogId} handlePublish={handlePublish} />
                    </div>
                ) : (
                    LoginStatus !== "failure" ? (
                        // LOADING
                        <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
                            <div className=""><i className="display-4 bi bi-hourglass-split"></i>
                                <h4>L O A D I N G</h4>
                                <small className="d-block d-sm-none">Tip: Use Desktop for better experience!</small>
                            </div>
                        </div>) : (
                        //NOT LOGGED IN
                        <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '90vh', width: '100vw' }}>
                            <div className=""><i className="display-4 bi bi-door-open-fill"></i>
                                <h4>NOT LOGGED IN</h4>
                                <h5><Link href={`${loginPagePath}`}><a>Login here</a></Link></h5>
                            </div>
                        </div>)
                )
            }
        </Layout >
    )
}