import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse'; // 

const ResultsTable = ({ data }) => {
  const [finalReport, setFinalReport] = useState(null);

  const handleConsolidate = () => {
    const availableItems = data.filter(item => item.Stock_Status === 'Available');
    setFinalReport(availableItems);
  };

  
  const downloadCsv = (reportData, filename) => {
    const csv = Papa.unparse(reportData); // Papaparse converts JSON to CSV

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generic download function for PDF
  const downloadPdf = async (reportData, filename) => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-report/pdf', { data: reportData }, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF', error);
    }
  };

  // Helper to render any table
  const renderTable = (tableData) => (
    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          {Object.keys(tableData[0] || {}).map(key => <th key={key} style={{ padding: '10px' }}>{key.replace(/_/g, ' ')}</th>)}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((val, i) => <td key={i} style={{ padding: '10px' }}>{val}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="details-section">
      {!finalReport ? (
        // --- INITIAL ANALYSIS VIEW ---
        <>
          <h2>Processed RFP Analysis</h2>
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => downloadCsv(data, 'Initial_Analysis.csv')} className="btn-primary" style={{ marginRight: '10px' }}>Download Full Report (CSV)</button>
            <button onClick={handleConsolidate} className="btn-primary">Consolidate Final Response</button>
          </div>
          {renderTable(data)}
        </>
      ) : (
        // --- FINAL REPORT VIEW ---
        <>
          <h2>Final Consolidated Report (Available Items) </h2>
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => downloadCsv(finalReport, 'Final_Response.csv')} className="btn-primary" style={{ marginRight: '10px' }}>Download Final CSV</button>
            <button onClick={() => downloadPdf(finalReport, 'Final_Response.pdf')} className="btn-primary">Download Final PDF</button>
          </div>
          {renderTable(finalReport)}
        </>
      )}
    </div>
  );
};

export default ResultsTable;