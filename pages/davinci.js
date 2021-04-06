import Head from 'next/head'
import styles from '../styles/Davinci.module.css'
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import fire from '../config/fire-config';
import Link from 'next/link';

export default function DaVinci() {
    const [Title, setTitle] = useState("");
    const [TagsArray, setTagsArray] = useState([]);
    const [ContentArray, setContentArray] = useState([]);
    const [Notification, setNotification] = useState("");
    const [LiveBlogId, setLiveBlogId] = useState("");

    const [LoginStatus, setLoginStatus] = useState(false);
    fire.auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoginStatus(true)
            }
            else {
                setLoginStatus(false)
            }
        })

    const handlePublish = (event) => {
        event.preventDefault();
        fire.firestore()
            .collection('blog')
            .add({
                title: Title,
                tagsArray: TagsArray,
                contentArray: ContentArray,
            }).then(function (docRef) {
                setNotification("Blog live at /blog/" + docRef.id);
            })
            .catch(function (error) {
                setNotification("Error adding document: " + error);
            });
    }
    function addElement(tag) {
        setTagsArray(TagsArray.concat(tag));
        var copyContentArray = [...ContentArray];
        if (tag == "ul") {
            copyContentArray.push(["", "", ""])
        }
        else {
            copyContentArray.push("");
        }
        setContentArray(copyContentArray);
    }
    function deleteElement(index) {
        let newtagsArray = TagsArray.filter((tag, i) => i !== index);
        let newContentArray = ContentArray.filter((content, i) => i !== index);
        setTagsArray(newtagsArray);
        setContentArray(newContentArray);
    }

    function updateContentArray(index, value, index2) {
        let newContentArray = [...ContentArray];
        if (index2) {
            newContentArray[index][index2] = value;
        }
        else {
            newContentArray[index] = value;
        }
        setContentArray(newContentArray);
    }

    function buildtextareaHTML(tag, content, index) {
        if (tag == "h2") {
            return (<h2 key={tag + index} style={{ position: 'relative' }} style={{ position: 'relative' }}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, "")} placeholder="Heading" /><button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button></h2>)
        }
        if (tag == "p") {
            return (<p key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, "")} placeholder="Paragraph" />
                <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button></p>)
        }
        if (tag == "h3") {
            return (<h3 key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, "")} placeholder="Sub-Heading" />
                <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button></h3>)
        }
        if (tag == "img") {
            return (
                <a key={tag + index} style={{ position: 'relative' }}>
                    <small>
                        <TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, "")} placeholder="Image Link" />
                        <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button>
                    </small>
                    <br />
                    <img src={content} />
                    <br />
                </a>
            )
        }
        if (tag == "ul") {
            return (
                <ul key={tag + index} style={{ position: 'relative' }}>
                    <li><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, 0)} placeholder="List Item" /></li>
                    <li><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, 1)} placeholder="List Item" /></li>
                    <li><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, 2)} placeholder="List Item" /></li>
                </ul>
            )
        }
        // if (tag == "a") {
        //     return (
        //         <a key={tag + index} style={{position:'relative'}}>
        //             <TextareaAutosize value={content[0]} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value,"")} placeholder="Anchor text" />
        //             <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button>
        //             <br />
        //             <small><TextareaAutosize value={content[1]} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value,"")} placeholder="Anchor Link" /></small>
        //             <br />
        //         </a>
        //     )
        // }
        if (tag == "h4") {
            return (<h4 key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, "")} placeholder="Mini-Heading" />
                <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button></h4>)
        }
    }
    console.log(TagsArray);
    console.log(ContentArray);
    return (
        <>
            <Head>
                <title>DaVinci | Paint blog posts</title>
            </Head>
            {LoginStatus ? (<div style={{ padding: '2px' }}>
                <div>
                    {Notification}
                    {LiveBlogId ? (<Link href={`/blog/${LiveBlogId}`}>https://davinci.vercel.app/blog/{LiveBlogId}</Link>
                    ) : (<></>)}
                </div>
                <div style={{ width: '75%' }}>
                    <h1><TextareaAutosize value={Title} className={styles.textareaInherit} onChange={(e) => setTitle(e.target.value)} placeholder="Title" /></h1>
                    {TagsArray.map((tag, index) =>
                        buildtextareaHTML(tag, ContentArray[index], index)
                    )
                    }
                </div>
                <div style={{ width: '25%', position: 'fixed', right: 0, top: 0 }}>
                    <button onClick={(e) => handlePublish(e)}>Publish</button>
                    <br />
                    <button onClick={() => addElement("h2")}>Heading</button>
                    <button onClick={() => addElement("h3")}>Sub-Heading</button>
                    <button onClick={() => addElement("h4")}>Mini-Heading</button>
                    <button onClick={() => addElement("p")}>Paragraph</button>
                    <button onClick={() => addElement("ul")}>List</button>
                    <button onClick={() => addElement("img")}>Image</button>
                </div>
            </div>
            ) : (<><h4>You are not logged in! </h4> <Link href="/auth/login">Login here</Link></>)}
        </>
    )
}
