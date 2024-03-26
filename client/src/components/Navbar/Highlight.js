import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HighlightPage() {
    const [files, setFiles] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);


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
                <input
                    type="file"
                    multiple
                    accept="image/*,video/*" 
                    className="highlight-file"
                    onChange={handleFileChange}
                />

                <button className="highlight-button" onClick={handleUpload}>Upload</button>
            </div>
            {uploadedImages.length > 0 && (
                <div className='box-img-highlight'>
                    <h2 className="highlight-subtitle">Uploaded Images:</h2>
                    {uploadedImages.map((item, index) => (
                        <div key={index} className='box-img'>
                            {item.data.endsWith('.mp4') || item.data.endsWith('.avi') || item.data.endsWith('.mov') ? (
                                <video controls src={item.data} className="highlight-video" />
                            ) : (
                                <img src={item.data} className="highlight-image" />
                            )}
                            <p className="player-name">Uploaded by: {item.playerName}</p>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}
