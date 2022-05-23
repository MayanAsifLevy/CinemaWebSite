
import { Navbar, Nav } from 'react-bootstrap'
import {
  
    Link
} from "react-router-dom";

const MainNav=()=>{

        return (
           
              

                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Navbar.Brand href="#">Movies webSite</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="movies">Movies</Nav.Link>
                                <Nav.Link as={Link} to="subscriptions">Subscriptions</Nav.Link>
                                <Nav.Link as={Link} to="userManag">User Managment</Nav.Link>
                                <Nav.Link as={Link} to="/">Logout</Nav.Link>

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                
        );
    }

export default MainNav;