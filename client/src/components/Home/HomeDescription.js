import React from "react";
import { Link } from 'react-router-dom';

export default function HomeContent() {
    return (
        <div className="homeContent-container">
            <div className="homeContent-content">
                <h1>Quản lý đội thể thao đơn giản !</h1>
                <h2>Cùng xem lại những khoảnh khắc đáng nhớ !</h2>
            </div>
            <div className="homeContent-button">
                <button className="home-button"><Link to="/find-teams" className='nav-link'>Tìm CLB</Link></button>
                <button className="home-button"><Link to="/create-team" className='nav-link'>Tạo CLB</Link></button>
                <button className="home-button"><Link to="/my-team" className='nav-link'>Đội của tôi</Link></button>
                <button className="home-button"><Link to="/highlight" className='nav-link'>Highlight</Link></button>
            </div>
        </div>
    )
}