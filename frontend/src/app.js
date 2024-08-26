import React, { useState } from 'react';
import UploadForm from './components/uploadForm';
import ResultDisplay from './components/ResultDisplay';
import ProgressBar from './components/progressBar';
import './app.css';

function App() {
    const [extractedText, setExtractedText] = useState('');
    const [progressMessage, setProgressMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);

    const handleUpload = (text) => {
        setExtractedText(text);
        setIsUploading(false);
        setIsExtracting(false);
    };


    const handleUploadStart = () => {
        console.log('Upload Started');
        setProgressMessage('Uploading Image');
        setIsUploading(true);
        setIsExtracting(false);
    };

    const handleExtractionStart = () => {
        console.log('Extraction Started');
        setProgressMessage('Extracting Text');
        setIsUploading(false);
        setIsExtracting(true);
    };


    return (
        <div className="app">
            {(isUploading || isExtracting) && <ProgressBar message = {progressMessage} />}
            <div className="container">  
                <div className="upload-section">
                    <UploadForm 
                        onUpload={handleUpload} 
                        onUploadStart = {handleUploadStart} 
                        onExtractionStart = {handleExtractionStart} 
                    />
                </div>
                <div className="result-section">
                    <ResultDisplay extractedText={extractedText}/>
                </div>
            </div>
        </div>
    );
}

export default App;