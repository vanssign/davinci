import Head from 'next/head'
import styles from '../styles/Davinci.module.css'
import { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import fire from '../config/fire-config';
import Link from 'next/link';

export default function DaVinci() {
    const [Title, setTitle] = useState("");
    const [ElementArray, setElementArray] = useState([])
    const [FocusedIndex, setFocusedIndex] = useState(-1);

    const FocusedElement = useRef();

    const [Notification, setNotification] = useState("Check out all blogs");
    const [LiveBlogId, setLiveBlogId] = useState("");
    const [PreviewStatus, setPreviewStatus] = useState(false);

    useEffect(() => {
        if (FocusedElement.current)
            FocusedElement.current.focus();
    })

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
        if (Title) {
            fire.firestore()
                .collection('blog')
                .add({
                    title: Title,
                    elementArray: ElementArray
                }).then((docRef) => {
                    setNotification("Blog live");
                    setLiveBlogId(docRef.id)
                })
                .catch(function (error) {
                    setNotification("Error adding document: " + error);
                });
        }
        else {
            setNotification("Title not added! Checking all blogs")
            setTimeout(() => {
                setNotification("Check out all blogs")
            }, 7000)
        }
    }

    function addElement(tag) {
        let newElementArray = [...ElementArray];
        let element;
        if (tag == "ul") {
            element = {
                tag: tag,
                content: [""]
            }
        }
        else if (tag == "img") {
            element = {
                tag: tag,
                src: "",
            }
        }
        else if (tag == "button") {
            element = {
                tag: tag,
                href: "",
                content: ""
            }
        }
        else if (tag == "blockquote") {
            element = {
                tag: tag,
                content: "",
                cite: "",
            }
        }
        else {
            element = {
                tag: tag,
                content: ""
            }
        }
        newElementArray.splice(FocusedIndex + 1, 0, element);
        setFocusedIndex(FocusedIndex + 1);
        setElementArray(newElementArray);
    }

    function deleteElement(index) {
        let newElementArray = ElementArray.filter((e, i) => i !== index);
        setFocusedIndex(index - 1);
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

    function updateElement(index, key, value) {
        let newElementArray = [...ElementArray];
        newElementArray[index][key] = value;
        setElementArray(newElementArray);
    }

    function buildtextareaHTML(element, index) {

        let tag = element.tag;
        let content = element.content;

        if (tag == "h2") {
            return (<h2 key={tag + index} style={{ position: 'relative' }} style={{ position: 'relative' }}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="Heading" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} /></h2>)
        }
        if (tag == "p") {
            return (<p key={tag + index} style={{ position: 'relative' }}><TextareaAutosize ref={FocusedIndex == index ? (FocusedElement) : (null)} value={content} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="Paragraph" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </p>)
        }
        if (tag == "h3") {
            return (<h3 key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="Sub-Heading" onKeyDown={function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </h3>)
        }
        if (tag == "img") {
            return (
                <div key={tag + index} style={{ position: 'relative' }}>
                    <small>
                        <TextareaAutosize value={element.src} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "src", e.target.value)} placeholder="Image Link" onFocus={() => setFocusedIndex(index)} />
                        <button onClick={() => deleteElement(index)} className={styles.delBtn} >X</button>
                    </small>
                    <br />
                    <img src={element.src} />
                    <br />
                </div>
            )
        }
        if (tag == "ul") {
            return (
                <ul key={tag + index} style={{ position: 'relative' }}>
                    {ElementArray[index].content.map((c, i) =>
                        <li key={tag + index + "c" + i}><TextareaAutosize value={c} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateContentArray(index, e.target.value, i)} placeholder="List Item" onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                updateContentArray(index, "", "increase")
                            }
                            if (e.key === 'Backspace' && c === "") {
                                e.preventDefault();
                                if (i === 0) {
                                    deleteElement(index);
                                }
                                else {
                                    updateContentArray(index, "", "decrease")
                                }
                            }
                        }} onFocus={() => setFocusedIndex(index)} /></li>
                    )
                    }
                </ul>
            )
        }
        if (tag == "button") {
            return (<div key={tag + index} style={{ position: 'relative' }}>
                <small>
                    <TextareaAutosize value={element.href} className={styles.textareaInherit} onChange={(e) => updateElement(index, "href", e.target.value)} placeholder="Link" onFocus={() => setFocusedIndex(index)} />
                </small>
                <br />
                <button className="btn btn-light">
                    <TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="button" onFocus={() => setFocusedIndex(index)} />
                    <button onClick={() => deleteElement(index)} className={styles.delBtn}>X</button>
                </button>
                <br />
            </div>)
        }

        if (tag == "h4") {
            return (<h4 key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="Mini-Heading" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </h4>)
        }
        if (tag == "code") {
            return (
                <code key={tag + index} style={{ position: 'relative' }}>
                    <TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="Code Snippet"
                        onKeyDown={function (e) {
                            if (e.key === 'Backspace' && content === "") {
                                e.preventDefault();
                                deleteElement(index);
                            }
                        }} onFocus={() => setFocusedIndex(index)} />
                </code>
            )
        }
        if (tag == "blockquote") {
            return (
                <div key={tag + index} style={{ position: 'relative' }}>
                    <small><TextareaAutosize value={element.cite} className={styles.textareaInherit} onChange={(e) => updateElement(index, "cite", e.target.value)} placeholder="Cite Link or source" onFocus={() => setFocusedIndex(index)} /></small>
                    <blockquote><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="BlockQuote text"
                        onKeyDown={function (e) {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addElement("p");
                            }
                            if (e.key === 'Backspace' && content === "") {
                                e.preventDefault();
                                deleteElement(index);
                            }
                        }}
                        onFocus={() => setFocusedIndex(index)} /></blockquote>
                </div>
            )
        }
    }
    console.log(ElementArray);
    console.log(FocusedIndex);
    return (
        <>
            <Head>
                <title>DaVinci | Paint blog posts</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {LoginStatus ? (
                <div className="container-fluid">
                    <div>
                        {Notification + " at "}
                        <Link href={`/blog/${LiveBlogId}`}><a>https://davinci.vercel.app/blog/{LiveBlogId}</a></Link>
                    </div>
                    <div style={{ minHeight: '100vh' }}>
                        <h1><TextareaAutosize ref={FocusedIndex == -1 ? (FocusedElement) : (null)} value={Title} className={styles.textareaInherit} onChange={(e) => setTitle(e.target.value)} placeholder="Title" onKeyDown={function (e) {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                addElement("p");
                            }
                        }} onFocus={() => setFocusedIndex(-1)} /></h1>
                        {ElementArray.map((e, index) =>
                            buildtextareaHTML(e, index)
                        )
                        }
                    </div>
                    <div style={{ position: 'sticky', bottom: 0 }}>
                        <div>
                            <button className="btn btn-outline-secondary" onClick={() => setPreviewStatus(!PreviewStatus)}>{PreviewStatus ? ("ᨑ") : ("ᨉ")}</button>
                            <button className="btn btn-primary" onClick={(e) => handlePublish(e)}>Publish</button>
                        </div>
                        <div className={PreviewStatus ? ("d-none") : ("bg-light rounded")}>
                            <div className="d-flex justify-content-start">
                                <button className="btn btn-light" onClick={() => addElement("h2")}>Heading</button>
                                <button className="btn btn-light" onClick={() => addElement("h3")}>Sub-Heading</button>
                                <button className="btn btn-light" onClick={() => addElement("h4")}>Mini-Heading</button>
                            </div>
                            <div className="d-flex justify-content-start">
                                <button className="btn btn-light" onClick={() => addElement("p")}>Paragraph</button>
                                <button className="btn btn-light" onClick={() => addElement("ul")}>List</button>
                                <button className="btn btn-light" onClick={() => addElement("img")}>Image</button>
                            </div>
                            <div className="d-flex justify-content-start">
                                <button className="btn btn-light" onClick={() => addElement("code")}>Code</button>
                                <button className="btn btn-light" onClick={() => addElement("blockquote")}>BlockQuote</button>
                                <button className="btn btn-light" onClick={() => addElement("button")}>Button</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<div className="container"><h3>You are not logged in! </h3> <Link href="/auth/login"><a>Login here</a></Link>
                <textarea ref={FocusedElement} className="d-none" /></div>)}
        </>
    )
}
