import React from 'react';

function ResultDisplay({extractedText}){
    return (
        <div className = "result-display">
            <h2>Extracted Text: </h2>
            <p>{extractedText}</p>
        </div>
    );
}

export default ResultDisplay;