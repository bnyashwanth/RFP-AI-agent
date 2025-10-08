import React, { useEffect, useState } from "react";
import { fetchRFPs, fetchSKURecommendations, fetchPricing, fetchFinalResponse } from "../services/api";
import RFPList from "../components/RFPList";

const Dashboard = () => {
  const [rfps, setRfps] = useState([]);
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [technicalData, setTechnicalData] = useState(null);
  const [pricingData, setPricingData] = useState(null);
  const [masterResponse, setMasterResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedRfps, setCompletedRfps] = useState([]);

  useEffect(() => {
    
    fetchRFPs().then((res) => setRfps(res.data));
  }, []);

  const handleSelectRfp = async (rfp) => {
    // If the clicked card is already open, close it.
    if (selectedRfp?._id === rfp._id) {
        setSelectedRfp(null);
        return;
    }

    // Set the selected card and start the loading spinner.
    setSelectedRfp(rfp);
    setIsLoading(true);
    setTechnicalData(null);
    setPricingData(null);
    setMasterResponse(null);

    try {
        // If the RFP is already completed, fetch its final response data.
        if (completedRfps.includes(rfp._id)) {
            const res = await fetchFinalResponse(rfp._id);
            setMasterResponse(res.data);
        } else {
            // Otherwise, fetch the technical and pricing data for analysis.
            const [techRes, priceRes] = await Promise.all([
                fetchSKURecommendations(rfp._id),
                fetchPricing(rfp._id),
            ]);
            setTechnicalData(techRes.data);
            setPricingData(priceRes.data);
        }
    } catch (error) {
        console.error("API CALL FAILED:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleGenerateResponse = async () => {
    if (!selectedRfp) return;
    setIsLoading(true);
    try {
      const res = await fetchFinalResponse(selectedRfp._id);
      setMasterResponse(res.data);
      // Add the RFP's ID to the completed list if it's not already there.
      if (!completedRfps.includes(selectedRfp._id)) {
        setCompletedRfps(prevCompleted => [...prevCompleted, selectedRfp._id]);
      }
    } catch (error) {
      console.error("Failed to generate final response:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h2>1. Sales Agent: Upcoming RFPs</h2>
      <RFPList
        rfps={rfps}
        onSelectRfp={handleSelectRfp}
        selectedRfpId={selectedRfp?._id}
        technicalData={technicalData}
        pricingData={pricingData}
        masterResponse={masterResponse}
        onGenerateResponse={handleGenerateResponse}
        isLoading={isLoading}
        completedRfps={completedRfps}
      />
    </div>
  );
};

export default Dashboard;