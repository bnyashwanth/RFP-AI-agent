import React from "react";
import RFPDetails from "./RFPDetails";

const RFPList = ({ 
  rfps, 
  onSelectRfp, 
  selectedRfpId, 
  technicalData, 
  pricingData, 
  masterResponse,
  onGenerateResponse,
  isLoading,
  completedRfps 
}) => (
  <div className="rfp-list">
    {rfps.map((rfp) => {
      const isCompleted = completedRfps.includes(rfp._id);

      return (
        <React.Fragment key={rfp._id}>
          <div
            className={`rfp-card ${selectedRfpId === rfp._id ? "selected" : ""} ${isCompleted ? 'completed' : ''}`}
            onClick={() => onSelectRfp(rfp)}
          >
            <div className="rfp-card-info">
              <h3>{rfp.title}</h3>
              <p>Due Date: {new Date(rfp.dueDate).toLocaleDateString()}</p>
            </div>
            
            {isCompleted ? (
              <a href={`http://localhost:5000/api/master/${rfp._id}/download`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <button className="btn-primary" style={{ padding: '5px 10px', fontSize: '0.8em' }}>Download PDF</button>
              </a>
            ) : (
              <span className="badge badge-pending">Pending</span>
            )}
          </div>

          {selectedRfpId === rfp._id && (
            isLoading ? (
              <div className="loader-container"><div className="loader"></div></div>
            ) : masterResponse ? (
              <div className="details-section" style={{ marginTop: '0', borderTop: '3px solid #228b22' }}>
                <div className="final-response-box">
                    <h3>{masterResponse.rfpTitle} ✅</h3>
                    <p><strong>Status:</strong> {masterResponse.finalStatus}</p>
                    <p><strong>Summary:</strong> {masterResponse.message}</p>
                </div>
              </div>
            ) : technicalData && pricingData ? (
              <RFPDetails 
                technicalData={technicalData} 
                pricingData={pricingData}
                onGenerateResponse={onGenerateResponse}
                showGenerateButton={!masterResponse}
                selectedRfpId={selectedRfpId}
              />
            ) : null
          )}
        </React.Fragment>
      )
    })}
  </div>
);
export default RFPList;