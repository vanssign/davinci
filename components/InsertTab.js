import { DropdownButton, Dropdown, SplitButton, Tooltip, OverlayTrigger } from 'react-bootstrap';

var TextTags = [
    {
        tag: "h1",
        shortName: "H1",
        iconName: ""
    },
    {
        tag: "h2",
        shortName: "H2",
        iconName: ""
    },
    {
        tag: "h3",
        shortName: "H3",
        iconName: ""
    },
    {
        tag: "p",
        shortName: "",
        iconName: "bi-paragraph"
    },
    {
        tag: "h4",
        shortName: "H4",
        iconName: ""
    },
    {
        tag: "h5",
        shortName: "H5",
        iconName: ""
    },
    {
        tag: "h6",
        shortName: "H6",
        iconName: ""
    },
    {
        tag: "code",
        shortName: "",
        iconName: "bi-code"
    }
];

export default function InsertTab(props) {
    return (
        <div className="d-flex flex-wrap justify-content-start align-items-stretch">
            {/* add text elements */}
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        Text Elements
                    </Tooltip>
                }
            >
                <DropdownButton id="dropdown-basic-button" variant="" title={<i className="bi bi-type"></i>}>
                    <Dropdown.Item onClick={() => props.addElement("h1")}><i className="bi bi-type-h1"></i>{" "}Heading</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.addElement("h2")}><i className="bi bi-type-h2"></i>{" "}Heading</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.addElement("h3")}><i className="bi bi-type-h3"></i>{" "}Heading</Dropdown.Item>
                    <Dropdown.Item><button type="button" className="btn btn-sm btn-transparent" onClick={() => props.addElement("h4")}>H4</button><button type="button" className="btn btn-sm btn-transparent" onClick={() => props.addElement("h5")}>H5</button><button type="button" className="btn btn-sm btn-transparent" onClick={() => props.addElement("h6")}>H6</button></Dropdown.Item>
                    <Dropdown.Item onClick={() => props.addElement("p")}><i className="bi bi-paragraph"></i>{" "}Paragraph</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => props.addElement("code")}><i className="bi bi-code"></i>{" "}Code</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.addElement("blockquote")}><i className="bi bi-blockquote-left"></i>{" "}BlockQuote</Dropdown.Item>
                </DropdownButton>
            </OverlayTrigger>

            {/*add List Elements */}
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        Lists
                    </Tooltip>
                }
            >
                <SplitButton disabled id="dropdown-split-button" variant="" title={
                    <i className="bi bi-list-ul"></i>} onClick={() => props.addElement("ul")}>
                    <Dropdown.Item>
                        <button disable type="button" className="btn" onClick={() => { props.addElement("ol") }}><i className="bi bi-list-ol"></i>{" "}Numbered List</button>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <button disabled type="button" className="btn" onClick={() => { props.addElement("ul") }}><i className="bi bi-list-ul"></i>{" "}Bulleted List</button>
                    </Dropdown.Item>
                </SplitButton>
            </OverlayTrigger>

            {/* add Image and Media*/}
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        Image and Media Elements
                    </Tooltip>
                }
            >
                {props.customDisabled ? (
                    <button type="button" className="btn btn-transparent" onClick={() => props.addElement("img")}>
                        <i className="bi bi-image"></i>
                    </button>
                ) : (
                    <SplitButton variant="" title={<i className="bi bi-image"></i>} onClick={() => props.addElement("img")}>
                        <Dropdown.Item onClick={() => props.addElement("carousel")}>
                            <i className="bi bi-collection-play-fill"></i>{" "}Carousel
                                             </Dropdown.Item>
                    </SplitButton>
                )
                }

            </OverlayTrigger >


            {/* add Buttons */}
            < OverlayTrigger
                placement="top"
                overlay={
                    < Tooltip >
                        Button and Button Groups
                                                </Tooltip >
                }
            >
                <SplitButton id="dropdown-split-button" variant="" title={
                    <><i className="bi bi-stop-btn-fill"></i></>} onClick={() => props.addElement("button")}>
                    <Dropdown.Item onClick={() => props.addElement("socialbtns")}>
                        Social Group<br />
                        <i className="bi bi-instagram"></i>
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-twitter"></i>
                        <i className="bi bi-whatsapp"></i>
                        <i className="bi bi-github"></i>
                        <i className="bi bi-linkedin"></i>
                        <i className="bi bi-youtube"></i>
                    </Dropdown.Item>
                </SplitButton>
            </OverlayTrigger >

            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        Design Elements
                     </Tooltip>
                }
            >
                <DropdownButton id="dropdown-basic-design" variant="" title={<i className="bi bi-brush"></i>}>
                    <Dropdown.Item onClick={() => props.addElement("hr")}><i className="bi bi-dash"></i>{" "}Line</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.addElement("spacer")}><i className="bi bi-distribute-vertical"></i>{" "}Spacer</Dropdown.Item>
                    <Dropdown.Item onClick={() => props.addElement("gutter")}><i className="bi bi-distribute-horizontal"></i>{" "}Gutter Column</Dropdown.Item>
                </DropdownButton>
            </OverlayTrigger>
            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip>
                        Embed videos, urls and images
                     </Tooltip>
                }
            >
              <button className="btn btn-transparent" onClick={()=>props.addElement("embed")}>
                  <i className="bi bi-code-square"></i>
              </button>
            </OverlayTrigger>

            {props.customDisabled ? (<></>) : (
                <>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                Navigation
                            </Tooltip>
                        }
                    >
                        <button disabled className="btn btn-transparent" onClick={() => props.addElement("navbar")}>
                            <i className="bi bi-menu-app-fill"></i>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip>
                                Custom Block <br />
                                Build your own element based on basic elements
                        </Tooltip>
                        }
                    >
                        <button className="btn btn-transparent" onClick={() => props.addElement("custom")}>
                            <i className="bi bi-hammer"></i>
                        </button>
                    </OverlayTrigger>
                </>
            )}
        </div >
    )
}