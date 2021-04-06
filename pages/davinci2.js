import Head from 'next/head'
import styles from '../styles/Davinci.module.css'
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import fire from '../config/fire-config';
import Link from 'next/link';

export default function DaVinci() {
    const [Title, setTitle] = useState("");
    // const [TagsArray, setTagsArray] = useState([]);
    // const [ContentArray, setContentArray] = useState([]);
    const [ElementArray, setElementArray] = useState([])
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
                elementArray: ElementArray
            }).then(function (docRef) {
                setNotification("Blog live at /blog/" + docRef.id);
            })
            .catch(function (error) {
                setNotification("Error adding document: " + error);
            });
    }
    function addElement(tag) {
        let newElementArray = [...ElementArray];
        let element;
        if (tag == "ul") {
            element = {
                tag: tag,
                content: ["", "", ""]
            }
        }
        else {
            element = {
                tag: tag,
                content: ""
            }
        }
        newElementArray.push(element);
        setElementArray(newElementArray);
    }
    function deleteElement(index) {
        let newElementArray = ElementArray.filter((e, i) => i !== index);
        setElementArray(newElementArray);
    }

    function updateContent(index, value) {
        let newElementArray = [...ElementArray];
        newElementArray[index].content = value;
        setElementArray(newElementArray);
    }
    function updateContentArray(index, value, index2) {
        let newElementArray = [...ElementArray];
        if (index2 == "increase") {
            newElementArray[index].content.push("");
        }
        else if (index2 == "decrease") {
            newElementArray[index].content.pop();
        }
        else {
            newElementArray[index].content[index2] = value;
        }
        setElementArray(newElementArray);
    }

    function buildtextareaHTML(tag, content, index) {
        if (tag == "h2") {
            return (<h2 key={tag + index} style={{ position: 'relative' }} style={{ position: 'relative' }}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContent(index, e.target.value)} placeholder="Heading" /><button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button></h2>)
        }
        if (tag == "p") {
            return (<p key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContent(index, e.target.value)} placeholder="Paragraph" />
                <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button></p>)
        }
        if (tag == "h3") {
            return (<h3 key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContent(index, e.target.value)} placeholder="Sub-Heading" />
                <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button></h3>)
        }
        if (tag == "img") {
            return (
                <div key={tag + index} style={{ position: 'relative' }}>
                    <small>
                        <TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContent(index, e.target.value)} placeholder="Image Link" />
                        <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button>
                    </small>
                    <br />
                    <img src={content} />
                    <br />
                </div>
            )
        }
        if (tag == "ul") {
            return (
                <ul key={tag + index} style={{ position: 'relative' }}>
                    {ElementArray[index].content.map((c, i) =>
                        <li key={tag + index + "c" + i}><TextareaAutosize value={c} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, i)} placeholder="List Item" /></li>
                    )
                    }
                    <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button>
                    <button onClick={() => updateContentArray(index, "", "increase")}>+</button>
                        <button onClick={() => updateContentArray(index, "", "decrease")}>𝁇</button>
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
            return (<h4 key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContent(index, e.target.value)} placeholder="Mini-Heading" />
                <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button></h4>)
        }
    }
    console.log(ElementArray);
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
                    {ElementArray.map((e, index) =>
                        buildtextareaHTML(e.tag, e.content, index)
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
            ) : (<><h4>You are not logged in! </h4> <Link href="/auth/login"><a>Login here</a></Link></>)}
        </>
    )
}
