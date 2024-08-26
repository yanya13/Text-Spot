import React, { useState } from 'react';


function UploadForm( { onUpload, onUploadStart, onExtractionStart }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
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
                console.error('Error during Uplaod: ', error);
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