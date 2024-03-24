import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HighlightPage() {
    const [files, setFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);

    // Giả sử bạn đã lưu trữ thông tin người dùng đăng nhập trong localStorage hoặc state
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    useEffect(() => {
        const storedImages = localStorage.getItem('uploadedImages');
        if (storedImages) {
            setUploadedImages(JSON.parse(storedImages));
        }
    }, []);

    const handleFileChange = (event) => {
        const newFiles = [...event.target.files];
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleUpload = async () => {
        try {
            const token = localStorage.getItem('accessToken');

            const promises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                const config = {
                    headers: { authorization: `Bearer ${token}` }
                };
                const response = await axios.post('http://localhost:3001/team/upload', formData, config);
                console.log(response);
                return response.data;
            });

            const newUploadedImages = await Promise.all(promises);
            const allUploadedImages = [...uploadedImages, ...newUploadedImages];
            setUploadedImages(allUploadedImages);
            setFiles([]);
            localStorage.setItem('uploadedImages', JSON.stringify(allUploadedImages));
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div className="highlight-page">
            <h1 className="highlight-title">Highlight Page</h1>
            <div className='box-upload'>
                <input type="file" multiple className="highlight-file" onChange={handleFileChange} />
                <button className="highlight-button" onClick={handleUpload}>Upload</button>
            </div>
            {uploadedImages.length > 0 && (
                <div className='box-img-highlight'>
                    <h2 className="highlight-subtitle">Uploaded Images:</h2>
                    {uploadedImages.map((imageUrl, index) => (
                        <div key={index} className='box-img'>
                            <img src={imageUrl} className="highlight-image" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

