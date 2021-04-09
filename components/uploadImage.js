import React, { useState, useEffect } from 'react'
import fire from '../config/fire-config';

export default function ImageUploader() {
    const [file, setFile] = useState(null);
    const [Url, setUrl] = useState("");

    useEffect(() => {
        if (file && !Url) {
            var storageRef = fire.storage().ref("images");
            var uploadTask = storageRef.child(file.name).put(file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case fire.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case fire.storage.TaskState.RUNNING: // or 'running'
                            // setUploadStatus("bi-hourglass-split")
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        setUrl(downloadURL);
                    });
                }
            );
        }
    })

    function handleChange(e) {
        setFile(e.target.files[0]);
        setUrl("");
    }
    return (
        <div>
            <label className="btn btn-light btn">Upload<input type="file" className="d-none" onChange={handleChange} /></label>
            <img src={Url} alt="" />
        </div>
    );
}
