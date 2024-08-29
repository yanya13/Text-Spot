import React, { useState } from 'react';
import UploadForm from './components/uploadForm';
import ResultDisplay from './components/ResultDisplay';
import './app.css';

function App() {
    const [extractedText, setExtractedText] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [progressPercentage, setProgressPercentage] = useState(0);


    const handleUpload = (text) => {
        setExtractedText(text);
        setIsUploading(false);
        setIsExtracting(false);
        setProgressPercentage(0);
    };


    const handleUploadStart = () => {
        setIsUploading(true);
        setIsExtracting(false);
        setProgressPercentage(0);
        simulateProgress();
    };

    const handleExtractionStart = () => {
        setIsUploading(false);
        setIsExtracting(true);
        setProgressPercentage(0);
        simulateProgress();
    };

    const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            if (progress > 100) {
                clearInterval(interval);
                setProgressPercentage(100);
            } else {
                setProgressPercentage(progress);
            }
        }, 100);
    };

    return (
        <div className="app">
          <div className="main-container">
            {/* Header section for the website name */}
            <header className="App-header">
              <h1 className="website-name">Text-Spot</h1>
            </header>

            {/* Main content container */}
            <div className="container">
              <div className="upload-section">
                <UploadForm
                  onUpload={handleUpload}
                  onUploadStart={handleUploadStart}
                  onExtractionStart={handleExtractionStart}
                />
              </div>
              <div className="result-section">
                <ResultDisplay 
                    extractedText={extractedText}
                    isUploading={isUploading}
                    isExtracting={isExtracting}
                    progressPercentage={progressPercentage} 
                />
              </div>
            </div>
          </div>
        </div>
      );      
}

export default App;