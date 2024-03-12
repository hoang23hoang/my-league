import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HighlightPage() {
    const [files, setFiles] = useState([]); 
    const [uploadedUrls, setUploadedUrls] = useState([]);

    // Lấy dữ liệu đã lưu trữ trong localStorage khi trang được tải
    useEffect(() => {
        const storedUrls = localStorage.getItem('uploadedUrls');
        if (storedUrls) {
            setUploadedUrls(JSON.parse(storedUrls));
        }
    }, []);

    const handleFileChange = (event) => {
        const newFiles = [...event.target.files]; 
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleUpload = async () => {
        try {
            const promises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                const response = await axios.post('http://localhost:3001/team/upload', formData);
                return response.data;
            });
            const uploadedUrls = await Promise.all(promises);
            setUploadedUrls((prevUrls) => [...prevUrls, ...uploadedUrls]); 
            setFiles([]);
            localStorage.setItem('uploadedUrls', JSON.stringify([...uploadedUrls, ...uploadedUrls]));
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div className="highlight-page">
            <h1 className="highlight-page__title">Highlight Page</h1>
            <input type="file" className="highlight-page__file-input" onChange={handleFileChange} /> 
            <button className="highlight-page__upload-button" onClick={handleUpload}>Upload</button>
            {uploadedUrls.length > 0 && (
                <div>
                    <h2 className="highlight-page__subtitle">Uploaded Images:</h2>
                    {uploadedUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Uploaded ${index + 1}`} className="highlight-page__image" style={{ maxWidth: '100%' }} />
                    ))}
                </div>
            )}
        </div>
    );
}
