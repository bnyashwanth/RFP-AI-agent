import React from "react";

const RFPList = ({ rfps, onSelectRfp, selectedRfpId }) => (
  <div className="rfp-list">
    {rfps.map((rfp) => (
      <div
        key={rfp._id}
        className={`rfp-card ${selectedRfpId === rfp._id ? "selected" : ""}`}
        onClick={() => onSelectRfp(rfp)}
      >
        <div className="rfp-card-info">
          <h3>{rfp.title}</h3>
          <p>Due Date: {new Date(rfp.dueDate).toLocaleDateString()}</p>
        </div>
        <span className="badge badge-pending">{rfp.status}</span>
      </div>
    ))}
  </div>
);

export default RFPList;