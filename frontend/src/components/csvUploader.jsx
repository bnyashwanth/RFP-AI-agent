import React, { useState } from 'react';
import axios from 'axios';

const CsvUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('rfpFile', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
      onUploadSuccess(); // Refresh the list
    } catch (error) {
      setMessage('File upload failed.');
      console.error(error);
    }
  };

  return (
    <div className="details-section" style={{ marginBottom: '20px' }}>
      <h3>Upload New RFPs from CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload} className="btn-primary" style={{ marginLeft: '10px' }}>
        Upload
      </button>
      {message && <p style={{ marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default CsvUploader;