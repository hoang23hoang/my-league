import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Menu() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userData, setUserData] = useState(null); 
    const [emailOrPhone, setEmailOrPhone] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isLoggedIn) {
                    // Sử dụng thư viện Axios để gửi yêu cầu GET đến URL cùng với query param
                    const response = await axios.get('http://localhost:3001/find/players', {
                        params: {
                            phone: emailOrPhone // Sử dụng giá trị emailOrPhone được truyền vào từ state
                        }
                    });
    
                    // Lấy thông tin người dùng từ dữ liệu trả về
                    const userData = response.data;
    
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
                <Navbar.Brand href="#">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1">Trang chủ</Nav.Link>
                        <NavDropdown title="Giải đấu" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Tìm giải đấu</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Tạo giải đấu</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Đội thi đấu" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Tạo đội</NavDropdown.Item>
                            <NavDropdown.Item href="#action3">Tìm đội</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Tạo đội hình</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#action2">Mua sắm</Nav.Link>
                    </Nav>
                    {isLoggedIn ? (
                        <>
                            <NavDropdown title={userData ? userData.name : ''} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#">Thông tin cá nhân</NavDropdown.Item>
                                <NavDropdown.Item href="#">Cài đặt</NavDropdown.Item>
                            </NavDropdown>
                            <Button variant="outline-danger" onClick={handleLogout}>Đăng xuất</Button>
                        </>
                    ) : (
                        <>
                            <Nav.Link href="/auth/register">Tên đăng kí</Nav.Link>
                            <Nav.Link href="/auth/login">Đăng nhập</Nav.Link>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
