import React from 'react';
import SKURecommendations from './SKURecommendations';
import PricingSummary from './PricingSummary';

// << ADD selectedRfpId to the props list here >>
const RFPDetails = ({ technicalData, pricingData, onGenerateResponse, showGenerateButton, selectedRfpId }) => {
  return (
    <div className="details-section" style={{ marginTop: '0', borderTop: '3px solid #0077c8' }}>
      <div className="details-grid">
        <div className="recommendations">
          <SKURecommendations data={technicalData} />
        </div>
        <div className="pricing">
          <PricingSummary data={pricingData} />
        </div>
      </div>
      
      <div className="final-response-container">
        <a href={`http://localhost:5000/api/technical/${selectedRfpId}/download`} target="_blank" rel="noopener noreferrer">
            <button className="btn-primary" style={{ marginRight: '10px', backgroundColor: '#6c757d' }}>Download Match Report (CSV)</button>
        </a>

        {showGenerateButton && (
          <button onClick={onGenerateResponse} className="btn-primary">
            Consolidate Final Response
          </button>
        )}
      </div>
    </div>
  );
};

 export default RFPDetails;