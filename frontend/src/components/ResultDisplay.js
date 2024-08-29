import React from 'react';
// import { FaCopy } from 'react-icons/fa';
import CircularProgress from './circularProgress';

function ResultDisplay({extractedText, isUploading, isExtracting, progressPercentage}){
    return (
        <div className = "result-display">
            {isUploading || isExtracting ? (
                <CircularProgress percentage={progressPercentage} />
            ): (
                !extractedText ? (
                    <p className='catchy-phrase'>Discover the text in your Image!</p>
                ) : ( <p className='extracted-result'>{extractedText}</p>)
            )}
        </div>
    );
}

export default ResultDisplay;