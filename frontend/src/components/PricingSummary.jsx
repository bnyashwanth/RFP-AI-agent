import React from "react";

const PricingSummary = ({ data }) => (
  <div>
    <h4>Pricing Agent Summary</h4>
    <ul className="pricing-list">
      {data.breakdown.map((item, index) => (
        <li key={index}>
          <span>{item.product}</span>
          <strong>${item.unitPrice.toLocaleString()}</strong>
        </li>
      ))}
    </ul>
    <div className="total-price">
      <span>Total Material Price</span>
      <span>${data.total.toLocaleString()}</span>
    </div>
  </div>
);

export default PricingSummary;