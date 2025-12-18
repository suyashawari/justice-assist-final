
import React from 'react';
import './AnalysisModal.css';

const AnalysisModal = ({ reportDetails, onClose }) => {
  if (!reportDetails) return null;

  // Function to handle the download of the JSON file
  const handleDownloadJson = () => {
    // Convert the report object to a formatted JSON string
    const jsonString = JSON.stringify(reportDetails, null, 2);
    // Create a blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `forensic-report-${reportDetails.report_id}.json`; // Set the file name
    document.body.appendChild(a);
    a.click(); // Programmatically click the anchor
    document.body.removeChild(a); // Clean up the anchor element
    URL.revokeObjectURL(url); // Free up memory
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Forensic Analysis Report</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <pre>
            <code>{JSON.stringify(reportDetails, null, 2)}</code>
          </pre>
        </div>
        <div className="modal-footer">
          <button className="download-json-btn" onClick={handleDownloadJson}>
            Download Report as JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisModal;