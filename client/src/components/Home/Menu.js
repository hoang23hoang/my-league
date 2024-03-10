import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Menu() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userData, setUserData] = useState(null); 
    const [emailOrPhone, setEmailOrPhone] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isLoggedIn) {
                    const response = await axios.get('http://localhost:3001/find/players', {
                        params: {
                            phone: emailOrPhone // Sử dụng giá trị emailOrPhone được truyền vào từ state
                        }
                    });
    
                    const userData = response.data;
                    console.log(userData);
    
                    // Cập nhật state userData với thông tin người dùng được trả về từ máy chủ
                    setUserData(userData);
                }
            } catch (error) {
                console.error("Error fetching user data: ", error);
            }
        };

        fetchData();
    }, [isLoggedIn, emailOrPhone]); // emailOrPhone được thêm vào danh sách dependency để hàm useEffect được gọi lại khi emailOrPhone thay đổi

    const handleLogout = () => {
        setIsLoggedIn(false); 
        setUserData(null); 
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top">
            <Container fluid>
                <Navbar.Brand href="#" className='nav-link'>Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link  href="#action1" className='nav-link'>Trang chủ</Link >
                        <Link  to="/find-teams" className='nav-link'>Tìm CLB</Link >
                        <Link  to="/create-team" className='nav-link'>Tạo CLB</Link >
                        <Link  href="#action2"className='nav-link'>Mua sắm</Link >
                    </Nav>
                    {isLoggedIn ? (
                        <>
                        <Link  href="#action2">haha</Link >
                            
                            <Button variant="outline-danger" onClick={handleLogout}>Đăng xuất</Button>
                        </>
                    ) : (
                        <>
                            <Link  to="/auth/register" className='nav-link'>Đăng ký</Link >
                            <Link  to="/auth/login" className='nav-link'>Đăng nhập</Link >
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
