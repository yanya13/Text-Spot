import React, { useState } from 'react';
import UploadForm from './components/uploadForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
    const [extractedText, setExtractedText] = useState('');

    const handleUpload = (text) => {
        setExtractedText(text);
    };

    return (
        <div className="app>">
            <div className="upload-section">
                <UploadForm onUpload={handleUpload}/>
            </div>
            <div className="result-section">
                <ResultDisplay extractedText={extractedText}/>
            </div>
        </div>
    );
}