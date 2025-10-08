import React, { useState } from 'react';
import axios from 'axios';

// This component will be responsible for handling the two file uploads
const ExcelUploader = ({ onProcessComplete }) => {
  const [rfpFile, setRfpFile] = useState(null);
  const [inventoryFile, setInventoryFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleProcessFiles = async () => {
    if (!rfpFile || !inventoryFile) {
      setMessage('Please select both an RFP and an Inventory file.');
      return;
    }

    setIsLoading(true);
    setMessage('Processing files...');
    const formData = new FormData();
    formData.append('rfp', rfpFile);
    formData.append('inventory', inventoryFile);

    try {
      const res = await axios.post('http://localhost:5000/api/process-rfp', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Pass the processed data back up to the Dashboard
      onProcessComplete(res.data.results);
      setMessage('Files processed successfully!');
    } catch (error) {
      setMessage('An error occurred during processing.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="details-section" style={{ marginBottom: '20px' }}>
      <h3>Process New RFP with Inventory</h3>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div>
          <label>RFP Excel File:</label><br/>
          <input type="file" accept=".xlsx" onChange={(e) => setRfpFile(e.target.files[0])} />
        </div>
        <div>
          <label>Inventory Excel File:</label><br/>
          <input type="file" accept=".xlsx" onChange={(e) => setInventoryFile(e.target.files[0])} />
        </div>
        <button onClick={handleProcessFiles} className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze RFP'}
        </button>
      </div>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default ExcelUploader;