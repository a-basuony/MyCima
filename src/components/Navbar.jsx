import React, {useState, useEffect} from 'react'
import {Link , to } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';


export default function Header(props) {

    const [show , handleShow] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100 ){
                handleShow(true);
            }else handleShow(false);
        });
    },[]);

    return (
    <>

{/* className={` ${show &&" nav__black"}`} */}


    <Navbar collapseOnSelect expand="lg"    variant="primary"   >
        <Container >
        <Navbar.Brand >
        <Link className="text-light navbar-brand" to="home">MyCima </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"  />
        <Navbar.Collapse id="responsive-navbar-nav"  >
            <Nav className="me-auto  " >
                {props.userData ? <>
                    <Nav.Link >
                        <Link className="nav-link text-light" to="home">Home</Link>
                    </Nav.Link>
                    
                    <Nav.Link >
                        <Link className="nav-link text-light" to="people">People</Link>
                    </Nav.Link>
                
                        <Nav.Link >
                        <Link className="nav-link text-light" to="tv">Tv</Link>
                        </Nav.Link>
                    
                        <Nav.Link >
                        <Link className="nav-link text-light" to="movies">Movies</Link>
                        </Nav.Link>
                    
                        <Nav.Link >
                        <Link className="nav-link  text-light" to="about">About</Link>
                        </Nav.Link>
                    
                        <Nav.Link >
                        <Link className="nav-link text-light" to="contacts">Contacts</Link>
                        </Nav.Link>
                    </>:'' }
            </Nav>
            <Nav>
                {props.userData ?
                    <Nav.Link >
                        <span onClick={props.logOut} className="nav-link text-light" >Logout</span>
                    </Nav.Link>
                    : 
                    <>
                    <Nav.Link >
                        <Link className="nav-link text-light " to="login">Login</Link>
                    </Nav.Link>
                    <Nav.Link >
                        <Link className="nav-link  text-light" to="register">Register</Link>
                    </Nav.Link>
                    </>
                  }
            </Nav>


            

        </Navbar.Collapse>
      </Container>
    </Navbar>




    </>
  )
}


