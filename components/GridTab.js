import { DropdownButton, Dropdown } from 'react-bootstrap';
var ColValues = [
    {
        value: 12,
        iconName: "square"
    },
    {
        value: 11,
        iconName: ""
    },
    {
        value: 10,
        iconName: ""
    },
    {
        value: 9,
        iconName: ""
    },
    {
        value: 8,
        iconName: ""
    },
    {
        value: 7,
        iconName: ""
    },
    {
        value: 6,
        iconName: "layout-split"
    },
    {
        value: 5,
        iconName: ""
    },
    {
        value: 4,
        iconName: "layout-three-columns"
    },
    {
        value: 3,
        iconName: ""
    },
    {
        value: 2,
        iconName: ""
    },
    {
        value: 1,
        iconName: ""
    },
]
export default function GridTab(props) {
    return(
    <div className="container-fluid">
        <div className="row text-center">
            <div className="col-4 pt-2 justify-content-center align-items-center d-flex">
                <div>
                    <i className="bi bi-phone-fill lead"></i>
                    <br />
                    <small>Mobile</small>
                </div>
                <DropdownButton size="sm" variant="light" title={props.col}>
                    {ColValues.map((col, i) =>
                        <Dropdown.Item key={i + "colchange"} onClick={() => props.updateElement(props.index, "col", "", "", col.value)}>
                            {`${col.value}`}
                            {/* <i className={`bi bi-${col.iconName}`}></i> */}
                        </Dropdown.Item>)}
                </DropdownButton>
            </div>
            <div className="col-4 pt-2 justify-content-center align-items-center d-flex">
                <div>
                    <i className="bi bi-tablet-fill lead"></i>
                    <br />
                    <small>Tablet</small>
                </div>
                <DropdownButton size="sm" variant="light" title={props.colMd}>
                    {ColValues.map((col, i) =>
                        <Dropdown.Item key={i + "colchange"} onClick={() => props.updateElement(props.index, "colMd", "", "", col.value)}>
                            {`${col.value}`}
                            {/* <i className={`bi bi-${col.iconName}`}></i> */}
                        </Dropdown.Item>)}
                </DropdownButton>
            </div>
            <div className="col-4 pt-2 justify-content-center align-items-center d-flex">
                <div>
                    <i className="bi bi-laptop-fill lead"></i>
                    <br />
                    <small>Laptop</small>
                </div>
                <DropdownButton size="sm" variant="light" title={props.colLg}>
                    {ColValues.map((col, i) =>
                        <Dropdown.Item key={i + "colchange"} onClick={() => props.updateElement(props.index, "colLg", "", "", col.value)}>
                            {`${col.value}`}
                            {/* <i className={`bi bi-${col.iconName}`}></i> */}
                        </Dropdown.Item>)}
                </DropdownButton>
            </div>
        </div>
    </div>
    )
}