import React from "react";
import { useState } from "react";

export default function HomeContent() {
    return (
        <div className="homeContent-container">
            <div className="homeContent-content">
                <h1>Tổ chức giải đấu dễ dàng</h1>
                <h1>Quản lý đội thể thao đơn giản!</h1>
            </div>
            <div className="homeContent-button">
                <button className="home-button">Tạo giải đấu</button>
                <button className="home-button">Tìm giải đấu</button>
                <button className="home-button">Tạo đội hình</button>
                <button className="home-button">Quản lý đội</button>
            </div>
        </div>
    )
}