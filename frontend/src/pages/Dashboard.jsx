import React, { useEffect, useState } from "react";
import { fetchRFPs, fetchSKURecommendations, fetchPricing, fetchFinalResponse } from "../services/api";
import RFPList from "../components/RFPList";
import SKURecommendations from "../components/SKURecommendations";
import PricingSummary from "../components/PricingSummary";

const Dashboard = () => {
  const [rfps, setRfps] = useState([]);
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [technicalData, setTechnicalData] = useState(null);
  const [pricingData, setPricingData] = useState(null);
  const [masterResponse, setMasterResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRFPs().then((res) => setRfps(res.data));
  }, []);

  const handleSelectRfp = async (rfp) => {
    if (selectedRfp?._id === rfp._id) return; // Don't re-fetch if already selected

    setIsLoading(true);
    setSelectedRfp(rfp);
    setTechnicalData(null);
    setPricingData(null);
    setMasterResponse(null);

    const [techRes, priceRes] = await Promise.all([
      fetchSKURecommendations(rfp._id),
      fetchPricing(rfp._id),
    ]);

    setTechnicalData(techRes.data);
    setPricingData(priceRes.data);
    setIsLoading(false);
  };

  const handleGenerateResponse = async () => {
    if (!selectedRfp) return;
    setIsLoading(true);
    const res = await fetchFinalResponse(selectedRfp._id);
    setMasterResponse(res.data);
    setIsLoading(false);
  };

  return (
    <div>
      <h2>1. Sales Agent: Upcoming RFPs</h2>
      <RFPList
        rfps={rfps}
        onSelectRfp={handleSelectRfp}
        selectedRfpId={selectedRfp?._id}
      />

      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>AI Agents are at work...</p>
        </div>
      )}

      {selectedRfp && technicalData && pricingData && !isLoading && (
        <div className="details-section">
          <h2>2. Technical & Pricing Agent Analysis for "{selectedRfp.title}"</h2>
          <div className="details-grid">
            <div className="recommendations">
              <SKURecommendations data={technicalData} />
            </div>
            <div className="pricing">
              <PricingSummary data={pricingData} />
            </div>
          </div>

          {!masterResponse && (
            <div className="final-response-container">
              <button onClick={handleGenerateResponse} className="btn-primary">
                Consolidate Final Response
              </button>
            </div>
          )}
        </div>
      )}

      {masterResponse && !isLoading && (
         <div className="details-section">
            <h2>3. Master Agent: Final Consolidated Response ✅</h2>
            <div className="final-response-box">
                <h3>{masterResponse.rfpTitle}</h3>
                <p><strong>Status:</strong> {masterResponse.finalStatus}</p>
                <p><strong>Summary:</strong> {masterResponse.message}</p>
            </div>
         </div>
      )}
    </div>
  );
};

export default Dashboard;