import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    // const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const loginData = {
                email: emailOrPhone,
                phone: emailOrPhone,
                password: password
            };

            const response = await axios.post('http://localhost:3001/auth/login', loginData);
            console.log(response.data);
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('isLoggedIn', true);
                alert('Đăng nhập thành công!');
                // navigate('/');
                window.location.href = '/';
            } else {
                throw new Error("Lỗi đăng nhập!");
            }
        } catch (error) {
            window.alert('Đăng nhập không thành công! Vui lòng kiểm tra lại thông tin.');
        }
    };


    return (
        <div className="register-login-container-form">
            <div className='register-login-form'>
                <h1>Đăng nhập</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailOrPhone">Email or Phone:</label><br />
                    <div>
                        <input
                            type="text"
                            id="emailOrPhone"
                            name="emailOrPhone"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                        /><br /><br />
                        <label htmlFor="password">Password:</label><br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /><br /><br />
                        <input type="submit" value="Đăng nhập" style={{ backgroundColor: 'green' }} />
                        <span>Bạn chưa có tài khoản ?<Link to='/auth/register' className='nav-link' style={{ color: 'blue' }}>Đăng ký</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
}
