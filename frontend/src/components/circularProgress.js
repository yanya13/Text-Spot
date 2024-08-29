// CircularProgress.js
import React from 'react';

const CircularProgress = ({ percentage }) => {
  return (
    <div className="circular-progress">
      <div className="circular-progress-inner">
        <div className="circular-progress-circle">
          <svg className="progress-ring" width="120" height="120">
            <circle
              className="progress-ring-circle"
              stroke="#FF5733"
              strokeWidth="10"
              fill="transparent"
              r="50"
              cx="60"
              cy="60"
              style={{ strokeDasharray: 314, strokeDashoffset: 314 - (314 * percentage) / 100 }}
            />
          </svg>
          <div className="circular-progress-text">{`${percentage}%`}</div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
