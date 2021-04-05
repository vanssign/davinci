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
    const [LiveBlogId, setLiveBlogId] = useState("")
    const handlePublish = (event) => {
        event.preventDefault();
        fire.firestore()
            .collection('blog')
            .add({
                title: Title,
                tagsArray: TagsArray,
                contentArray: ContentArray,
            }).then(function (docRef) {
                setNotification("Blog live at /blog/"+docRef.id);
            })
            .catch(function (error) {
                setNotification("Error adding document: " + error);
            });
    }
    function addElement(tag) {
        setTagsArray(TagsArray.concat(tag));
        let emptyString = "";
        setContentArray(ContentArray.concat(emptyString));
    }
    function deleteElement(index) {
        let newtagsArray = TagsArray.filter((tag, i) => i !== index);
        let newContentArray = ContentArray.filter((content, i) => i !== index);
        setTagsArray(newtagsArray);
        setContentArray(newContentArray);
    }

    function updateContentArray(index, value) {
        let newContentArray = [...ContentArray];
        newContentArray[index] = value;
        setContentArray(newContentArray);
    }

    function buildtextareaHTML(tag, content, index) {
        if (tag == "h2") {
            return (<h2 key={tag + index}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value)} placeholder="Heading" /><button onClick={() => deleteElement(index)}>delete</button></h2>)
        }
        if (tag == "p") {
            return (<p key={tag + index}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value)} placeholder="Paragraph" />
                <button onClick={() => deleteElement(index)}>delete</button></p>)
        }
        if (tag == "h3") {
            return (<h3 key={tag + index}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value)} placeholder="Sub-Heading" />
                <button onClick={() => deleteElement(index)}>delete</button></h3>)
        }
        if (tag == "img") {
            return (
                <a key={tag + index}>
                    <small>
                        <TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value)} placeholder="Image Link" />
                        <button onClick={() => deleteElement(index)}>delete</button>
                    </small>
                    <br />
                    <img src={content} />
                    <br />
                </a>
            )
        }
        // if (tag == "a") {
        //     return (
        //         <a key={tag + index}>
        //             <TextareaAutosize value={content[0]} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value)} placeholder="Anchor text" />
        //             <button onClick={() => deleteElement(index)}>delete</button>
        //             <br />
        //             <small><TextareaAutosize value={content[1]} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value)} placeholder="Anchor Link" /></small>
        //             <br />
        //         </a>
        //     )
        // }
        if (tag == "h4") {
            return (<h4 key={tag + index}><TextareaAutosize value={content} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value)} placeholder="Mini-Heading" />
                <button onClick={() => deleteElement(index)}>delete</button></h4>)
        }
    }
    console.log(TagsArray);
    console.log(ContentArray);
    return (
        <div style={{ padding: '2px' }}>
            <div>
                {Notification}
                {LiveBlogId ? (<Link href={`/blog/${LiveBlogId}`}>https://davinci.vercel.app/blog/{LiveBlogId}</Link>
                ) : (<></>)}
            </div>
            <Head>
                <title>DaVinci | Paint blog posts</title>
            </Head>
            <button onClick={() => addElement("h2")}>Heading</button>
            <button onClick={() => addElement("h3")}>Sub-Heading</button>
            <button onClick={() => addElement("h4")}>Mini-Heading</button>
            <button onClick={() => addElement("p")}>Paragraph</button>
            <button onClick={() => addElement("img")}>Image</button>
            <button style={{ float: 'right' }} onClick={(e) => handlePublish(e)}>Publish</button>
            <div>
                <h1><TextareaAutosize value={Title} className={styles.textareaInherit} onChange={(e) => setTitle(e.target.value)} placeholder="Title" /></h1>
                {TagsArray.map((tag, index) =>
                    buildtextareaHTML(tag, ContentArray[index], index)
                )
                }
            </div>
        </div>
    )
}