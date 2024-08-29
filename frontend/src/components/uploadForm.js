import React, { useState } from 'react';


function UploadForm( { onUpload, onUploadStart, onExtractionStart }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(selectedFile){

            onUploadStart();

            const formData = new FormData();
            formData.append('textImage', selectedFile);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                console.log('Response recieved');
                const data = await response.json();
                if(data.success){

                    onExtractionStart();

                    onUpload(data.data.extractedText);
                } else {
                    console.error('Upload failed:', data.message);
                }
            } catch (error) {
                console.error('Error during Upload: ', error);
            }
        };
    };

    return (
        <form onSubmit={handleSubmit} className='upload-section-custom'>
            <input type="file" onChange={handleFileChange} className='custom-file-input'/>
            <label className="custom-file-label">
                Choose File {fileName && <span>({fileName})</span>}
            </label>
            <button type="submit">Ready!</button>
        </form>
    );

};

export default UploadForm;