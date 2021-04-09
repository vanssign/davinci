import Head from 'next/head'
import styles from '../styles/Davinci.module.css'
import { useState, useRef, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import fire from '../config/fire-config';
import Link from 'next/link';
import { DropdownButton, Dropdown, SplitButton } from 'react-bootstrap';
import { useRouter } from 'next/router'

export default function DaVinci() {
    const [Title, setTitle] = useState("");
    const [ElementArray, setElementArray] = useState([])
    const [FocusedIndex, setFocusedIndex] = useState(-1);
    const router = useRouter();

    const FocusedElement = useRef();

    const [Notification, setNotification] = useState("Check out all blogs");
    const [LiveBlogId, setLiveBlogId] = useState("");
    const [PreviewStatus, setPreviewStatus] = useState(false);

    useEffect(() => {
        if (FocusedElement.current)
            FocusedElement.current.focus();
    })

    const [LoginStatus, setLoginStatus] = useState("");

    fire.auth()
        .onAuthStateChanged((user) => {
            if (user) {
                setLoginStatus(true);
            }
            else {
                setLoginStatus("failure");
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
            setNotification("Title not added! Check all blogs")
            setTimeout(() => {
                setNotification("Check out all blogs")
            }, 7000)
        }
    }

    function addElement(tag) {
        let newElementArray = [...ElementArray];
        let element;
        if (tag == "ul" || tag == "ol") {
            element = {
                tag: tag,
                content: [""],
                classes: "",
            }
        }
        else if (tag == "img") {
            element = {
                tag: tag,
                src: "",
                classes: "img-fluid",
            }
        }
        else if (tag == "button") {
            element = {
                tag: tag,
                href: "",
                content: "",
                classes: "",
            }
        }
        else if (tag == "blockquote") {
            element = {
                tag: tag,
                content: "",
                cite: "",
                classes: "",
            }
        }
        else {
            element = {
                tag: tag,
                content: "",
                classes: "",
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
        let classes = element.classes;

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
                    <div className="d-flex justify-content-start">
                        <i class="bi bi-link"></i>{" "}
                        <TextareaAutosize value={element.src} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "src", e.target.value)} placeholder="Image Link" onFocus={() => setFocusedIndex(index)} />
                        <button onClick={() => deleteElement(index)} className={styles.delBtn} ><i class="bi bi-x-circle-fill"></i></button>
                    </div>
                    <br />
                    <img src={element.src} />
                    <br />
                </div>
            )
        }
        if (tag == "ul") {
            return (
                <ul key={tag + index} style={{ position: 'relative' }} className={classes}>
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

        if (tag == "ol") {
            return (
                <ol key={tag + index} style={{ position: 'relative' }} className={classes}>
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
                </ol>
            )
        }

        if (tag == "button") {
            return (<div key={tag + index} style={{ position: 'relative' }}>
                <div className="d-flex justify-content-start">
                    <i class="bi bi-link"></i>{" "}
                    <TextareaAutosize value={element.href} className={styles.textareaInherit} onChange={(e) => updateElement(index, "href", e.target.value)} placeholder="Link" onFocus={() => setFocusedIndex(index)} />
                </div>
                <br />
                <button className="btn btn-light">
                    <TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="button" onFocus={() => setFocusedIndex(index)} />
                    <button onClick={() => deleteElement(index)} className={styles.delBtn}><i class="bi bi-x-circle-fill"></i></button>
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
        if (tag == "h5") {
            return (<h5 key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="H5 headiing" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </h5>)
        }
        if (tag == "h6") {
            return (<h6 key={tag + index} style={{ position: 'relative' }}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="H6 Heading" onKeyDown={function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    addElement("p");
                }
                if (e.key === 'Backspace' && content === "") {
                    e.preventDefault();
                    deleteElement(index);
                }
            }} onFocus={() => setFocusedIndex(index)} />
            </h6>)
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
                    <div className="d-flex justify-content-start">
                        <i class="bi bi-link"></i>{" "}<TextareaAutosize value={element.cite} className={styles.textareaInherit} onChange={(e) => updateElement(index, "cite", e.target.value)} placeholder="Cite Link or source" onFocus={() => setFocusedIndex(index)} /></div>
                    <blockquote className={classes}><TextareaAutosize value={content} ref={FocusedIndex == index ? (FocusedElement) : (null)} className={styles.textareaInherit} onChange={(e) => updateElement(index, "content", e.target.value)} placeholder="BlockQuote text"
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
            {LoginStatus === true ? (
                <div className="container-fluid pt-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            {Notification + " at "}
                            <Link href={`/blog/${LiveBlogId}`}><a>https://davinci.vercel.app/blog/{LiveBlogId}</a></Link>
                        </div>
                        <button className="btn btn-primary" onClick={(e) => handlePublish(e)}>Publish</button>
                    </div>

                    <div style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                        <div>
                            <button className="btn btn-dark" onClick={() => setPreviewStatus(!PreviewStatus)}>{PreviewStatus ? (<i class="bi bi-arrows-collapse"></i>) : (<i class="bi bi-arrows-expand"></i>)}</button>
                        </div>
                        <div className={PreviewStatus ? ("d-none") : ("bg-light rounded")}>
                            <div className="d-flex justify-content-start">
                                <DropdownButton id="dropdown-basic-button" variant="light" title={<><i class="bi bi-type"></i>{" "}Text</>}>
                                    <Dropdown.Item><button className="btn" onClick={() => addElement("h2")}><i class="bi bi-type-h2"></i>{" "}Heading</button></Dropdown.Item>
                                    <Dropdown.Item><button className="btn" onClick={() => addElement("h3")}><i class="bi bi-type-h3"></i>{" "}Sub-Heading</button></Dropdown.Item>
                                    <Dropdown.Item><button className="btn btn-light" onClick={() => addElement("h4")}>H4</button><button className="btn btn-light" onClick={() => addElement("h5")}>H5</button><button className="btn btn-light" onClick={() => addElement("h6")}>H6</button></Dropdown.Item>
                                    <Dropdown.Item><button className="btn" onClick={() => addElement("p")}><i class="bi bi-paragraph"></i>{" "}Paragraph</button></Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item><button className="btn" onClick={() => addElement("code")}><i class="bi bi-code"></i>{" "}Code</button></Dropdown.Item>
                                    <Dropdown.Item><button className="btn" onClick={() => addElement("blockquote")}><i class="bi bi-blockquote-left"></i>{" "}BlockQuote</button></Dropdown.Item>
                                </DropdownButton>
                                <SplitButton id="dropdown-split-button" variant="light" title={
                                    <><i class="bi bi-list-ul"></i>{" "}List</>} onClick={() => addElement("ul")}>
                                    <Dropdown.Item>
                                        <button className="btn" onClick={() => addElement("ol")}><i class="bi bi-list-ol"></i>{" "}Numbered List</button>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <button className="btn" onClick={() => addElement("ul")}><i class="bi bi-list-ul"></i>{" "}Bulleted List</button>
                                    </Dropdown.Item>
                                </SplitButton>
                                <button className="btn btn-light" onClick={() => addElement("img")}><i class="bi bi-image"></i>{" "}Image</button>
                                <button className="btn btn-light" onClick={() => addElement("button")}><i class="bi bi-stop-btn-fill"></i>{" "}Button</button>
                            </div>
                        </div>
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
                </div>
            ) : (
                LoginStatus !== "failure" ? (<div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
                    <div className=""><h3><i className="bi bi-hourglass-split"></i></h3>
                        <h4>L O A D I N G</h4>
                        <textarea ref={FocusedElement} className="d-none" /></div>
                </div>) : (<div className="container d-flex align-items-center justify-content-center text-center" style={{ height: '100vh', width: '100vw' }}>
                    <div className=""><h3><i className="bi bi-door-open-fill"></i></h3>
                        <h4>N&nbsp;O&nbsp;T   L&nbsp;O&nbsp;G&nbsp;G&nbsp;E&nbsp;D   I&nbsp;N&nbsp;!</h4>
                        <h5><Link href="/auth/login"><a>Login here</a></Link></h5>
                        <textarea ref={FocusedElement} className="d-none" /></div>
                </div>)
            )
            }
        </>
    )
}
