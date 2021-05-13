import { DropdownButton, Dropdown, SplitButton, Tabs, Tab, Tooltip, OverlayTrigger, Popover, Carousel } from 'react-bootstrap';
import FormatTab from '../components/FormatTab';
import GridTab from '../components/GridTab';
import InsertTab from '../components/InsertTab';
export default function EditorTabs(props) {
    return (
        <Tabs defaultActiveKey="insert" id="uncontrolled-tab-example" variant={props.customDisabled?("pills"):("tabs")}>
            <Tab eventKey="insert" title="Insert" className="bg-light">
                {props.elementArray[props.focusedIndex]||props.focusedIndex<1 ? (
                    <InsertTab addElement={props.addElement} customDisabled={props.customDisabled} />
                ) : (<div className="text-center py-3">
                    Select an Element after which you want to insert new Element
                </div>)}
            </Tab>
            {props.elementArray[props.focusedIndex] ? (
                <Tab eventKey="format" title="Format" style={{ backgroundColor: '#ffffff' }}>
                    <div className="pb-1">
                        <FormatTab element={props.elementArray[props.focusedIndex]} index={props.focusedIndex} updateElement={props.updateElement} changeElementIndex={props.changeElementIndex}
                        lastIndex={props.lastIndex} />
                    </div>
                </Tab>
            ) : (<></>)}

            {props.elementArray[props.focusedIndex] ? (props.elementArray[props.focusedIndex].col ? (
                <Tab eventKey="grid" title={
                    <>
                        {"Grid "}
                        <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 150, hide: 1500 }}
                            overlay={<Tooltip id="button-grid-tooltip">
                                Entire screen width is divided into 12 columns. If the value is 12, the block will cover entire screen width, if 6 it will cover half and so on. Other elements fit accordingly to cover the screen.<br /><br />
                                                    Choose separately for mobile, tablets and laptops as per your convenience and design. Read about <a href="https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/bootstrap-grid-system.php" target="_blank">Bootstrap Grid System</a>
                            </Tooltip>}
                        >
                            <i className="bi bi-question-circle-fill"></i>
                        </OverlayTrigger>
                    </>} className="bg-light">
                    <GridTab index={props.focusedIndex} col={props.elementArray[props.focusedIndex].col} colMd={props.elementArray[props.focusedIndex].colMd} colLg={props.elementArray[props.focusedIndex].colLg} updateElement={props.updateElement} />
                </Tab>
            ) : (<></>)) : (<></>)}
        </Tabs>
    )
}