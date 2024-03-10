import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [namePlayer, setNamePlayer] = useState('');
    const [age, setAge] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:3001/auth/register', {
                email,
                password,
                phone,
                namePlayer,
                age
            });
            console.log(response.data); // Log kết quả từ backend
            window.alert('Đăng ký thành công!'); // Hiển thị alert thành công
            // Có thể thực hiện thêm các hành động khác sau khi đăng ký thành công
        } catch (error) {
            if (error.response && error.response.data) {
                window.alert(error.response.data); // Hiển thị alert lỗi
            } else {
                window.alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
            }
        }
    };

    return (
        <div className='register-login-container-form'>
            <div className='register-login-form'>
                <h1>Đăng ký</h1>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    /><br />
                    <input
                        type="text"
                        placeholder="Name Player"
                        value={namePlayer}
                        onChange={(e) => setNamePlayer(e.target.value)}
                    /><br />
                    <input
                        type="text"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    /><br />
                    <button onClick={handleRegister}>Đăng ký</button>
                    <p>Bạn đã có tài khoản ?<a href='/auth/login'>Đăng nhập</a></p>
                </div>
            </div>
        </div>
    );
}