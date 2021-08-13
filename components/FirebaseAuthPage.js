import React, { useState } from 'react';
import FirebaseLoginPageBuilder from './FirebaseLoginPage';
import FirebaseRegisterPageBuilder from './FirebaseRegisterPage';

export default function FirebaseAuthPageBuilder({ apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId }) {
    const [PageType, setPageType] = useState("login");
    if (PageType === "login") {
        return (
            <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '90vh', width: '100vw' }}>
                <div>
                    <FirebaseLoginPageBuilder
                        apiKey={apiKey}
                        authDomain={authDomain}
                        projectId={projectId}
                        storageBucket={storageBucket}
                        messagingSenderId={messagingSenderId}
                        appId={appId}
                        measurementId={measurementId} />
                    <small>Don't have an account? <a className="btn p-0 btn-sm btn-link" onClick={() => setPageType('register')}>Register now !</a></small>
                </div>
            </div>
        )
    }
    else if (PageType === "register") {
        return (
            <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '90vh', width: '100vw' }}>
                <div>
                    <FirebaseRegisterPageBuilder
                        apiKey={apiKey}
                        authDomain={authDomain}
                        projectId={projectId}
                        storageBucket={storageBucket}
                        messagingSenderId={messagingSenderId}
                        appId={appId}
                        measurementId={measurementId}
                        setPageType={setPageType} />
                    <small>Already have an account? <a className="btn p-0 btn-sm btn-link" onClick={() => setPageType('login')}>Login now !</a></small>
                </div>
            </div>
        )
    }
}
