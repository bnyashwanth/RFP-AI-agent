import React, { useState } from 'react';
// << CORRECTED PATHS START HERE >>
import ExcelUploader from '../components/ExcelUploader';
import ResultsTable from '../components/ResultsTable';

const UploadPage = () => {
  const [processedResults, setProcessedResults] = useState(null);

  return (
    <div>
      <h1>Upload Center</h1>
      <ExcelUploader onProcessComplete={setProcessedResults} />
      {processedResults && <ResultsTable data={processedResults} />}
    </div>
  );
};

export default UploadPage;