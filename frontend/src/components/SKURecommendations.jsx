import React from "react";

const getMatchColor = (match) => {
  if (match >= 90) return "#22c55e"; // Green
  if (match >= 60) return "#f59e0b"; // Amber
  return "#ef4444"; // Red
};

const SKURecommendations = ({ data }) => (
  <div>
    <h4>Technical Agent SKU Matching</h4>
    {data.map((item, index) => (
      <div key={index} className="sku-item">
        <h5>RFP Product: {item.rfpProduct.name}</h5>
        {item.recommendations.map((rec, recIndex) => (
          <div key={recIndex} style={{ marginBottom: "8px" }}>
            <span>{rec.product.name} - <strong>{rec.match}% Match</strong></span>
            <div className="spec-match-bar">
              <div
                className="spec-match-fill"
                style={{
                  width: `${rec.match}%`,
                  backgroundColor: getMatchColor(rec.match),
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default SKURecommendations;