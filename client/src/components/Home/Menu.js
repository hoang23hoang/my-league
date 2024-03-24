import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Menu() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken'); 
                if (token) {
                    const response = await axios.get('http://localhost:3001/auth/login', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log('Đăng nhập thành công');
                    const userData = response.data;
                    setUserData(userData);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); 
        setIsLoggedIn(false);
        setUserData(null);
    };

    return (
        <Navbar expand="lg" className="sticky-top" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand className='nav-link'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXeFZhDFCjYod8WHzK3WfuYm2Ajb54P0diWxFlh98xZt4QYxHzSQ_Y3g5GGzlnIHwkx8&usqp=CAU'
                    style={{ height: '40px' }}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to="/" className='nav-link'>Trang chủ</Link>
                        <Link to="/find-teams" className='nav-link'>Tìm CLB</Link>
                        <Link to="/create-team" className='nav-link'>Tạo CLB</Link>
                        <Link to="/my-team" className='nav-link'>Đội của tôi</Link>
                        <Link to="/highlight" className='nav-link'>Highlight</Link>
                    </Nav>
                    {isLoggedIn ? (
                        <>
                            <Button variant="outline-danger" onClick={handleLogout}>Đăng xuất</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth/register" className='nav-link' style={{ color: 'gray' }}>Đăng ký</Link>
                            <Link to="/auth/login" className='nav-link' style={{ color: 'gray' }}>Đăng nhập</Link>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}