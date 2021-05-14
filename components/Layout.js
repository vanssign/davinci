import Link from 'next/link'
import { useState } from 'react';
import fire from '../config/fire-config';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default function Layout({ children, loginStatus, visible }) {

    const handleLogout = () => {
        console.log("logout");
        fire.auth()
            .signOut()
    }
    if (visible) {
        return (
            <>
                <Navbar bg="light" expand className="py-0" variant="light">
                    <Link href="/"><Navbar.Brand>Davinci</Navbar.Brand></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="#home" disabled>Home</Nav.Link>
                        <Nav.Link href="#link" disabled>Link</Nav.Link>
                        <NavDropdown title="" disabled id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                        <Navbar.Text className="py-0">
                            {loginStatus === true ? (
                                <button className="btn btn-danger btn-sm" onClick={() => handleLogout()}>

                                <i className="bi bi-person-x-fill"></i>{" "}Logout

                            </button>) : (
                                <>
                                    <Link href="/auth/login">
                                        <button className="btn btn-info btn-sm">
                                            <i className="bi bi-person-badge"></i>{" "}Login
                                        </button>
                                    </Link>
                                    <Link href="/auth/register">
                                        <button className="btn btn-secondary ml-1 btn-sm">
                                            <i className="bi bi-person-plus-fill"></i>{" "}Signup
                                        </button>
                                    </Link>
                                </>

                            )}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <main>{children}</main>
            </>
        )
    }
    else return (<main>{children}</main>)
}