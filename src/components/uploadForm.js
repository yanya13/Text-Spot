import React, { useState } from 'react';

function UploadForm( { onUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(selectedFile){
            const formData = new FormData();
            formData.append('textImage', selectedFile);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if(data.success){
                onUpload(data.data.extractedText);
            } else {
                console.error('Upload failed:', data.message);
            }
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange}/>
            <button type="submit">Upload</button>
        </form>
    );

};

export default UploadForm;