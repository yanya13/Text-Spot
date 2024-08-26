import React from 'react';

function ProgressBar({ message }) {
    console.log('ProgressBar rendered with message:', message);
    return (
        <div className='progress-bar'>
            <div className='progress-bar-message'>
                { message }
            </div>
            <div className='progress-bar-loader'>
                {/*Simple loading spinner or a progress bar */}
                <div className='spinner'></div>
            </div>
        </div>
    );
}

export default ProgressBar;