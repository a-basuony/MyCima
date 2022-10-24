import React, {useState, useEffect} from 'react'
import {Link , to } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {

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
        <nav className={`nav ${show &&" nav__black"} "navbar navbar-expand-lg navbar navbar-dark "`}>
            <div className="container-fluid">
            <Link className="navbar-brand" to="home">MyCima </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" id="#navbarSupportedContent" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                {props.userData ? <>
                <li className="nav-item">
                    <Link className="nav-link" to="home">Home</Link>
                </li>
            
                <li className="nav-item">
                    <Link className="nav-link" to="people">People</Link>
                </li>
            
                <li className="nav-item">
                    <Link className="nav-link " to="tv">Tv</Link>
                </li>
            
                <li className="nav-item  mr-auto">
                    <Link className="nav-link " to="movies">Movies</Link>
                </li>
            
                <li className="nav-item mr-auto">
                    <Link className="nav-link " to="about">About</Link>
                </li>
                <li className="nav-item mr-auto">
                    <Link className="nav-link " to="contacts">Contacts</Link>
                </li>
                
                </>:'' }
    
                
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0 ">
                    
                
                <li className="nav-item d-flex align-items-center">
                        <a href="https://www.facebook.com/a.basouny/" className='link-secondary'><i className='fab mx-2 fa-facebook'></i></a>
                        <a href="https://twitter.com/AhmedBasuoney6" className='link-secondary'><i className='fab mx-2 fa-twitter'></i></a>
                        <a href="https://www.instagram.com/ahmed_basuiony/" className='link-secondary'><i className='fab mx-2 fa-instagram'></i></a>
                        <a href="https://www.linkedin.com/in/ahmed-basuoney-68b432242/" className='link-secondary'><i className='fab mx-2 fa-linkedin'></i></a>
                        <a href="https://github.com/a-basuony" className='link-secondary'><i className='fab mx-2 fa-github'></i></a>
                        
                </li>
                {props.userData ?
                    
                 <li className="nav-item ">
                    <span onClick={props.logOut} className="nav-link " >Logout</span>
                </li>: 
                 <>
                <li className="nav-item ">
                    <Link className="nav-link " to="login">Login</Link>
                </li>
            
                <li className="nav-item ">
                    <Link className="nav-link " to="register">Register</Link>
                </li>
                </>
               }
                </ul>
            
            </div>
            </div>
        </nav>
        
            

    
    </>
  )
}
