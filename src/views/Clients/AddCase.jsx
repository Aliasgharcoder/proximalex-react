import React, { useState, useEffect } from "react";
import { createCase, getLawyers,predictLawyers } from "../../services/caseService";
import { toast } from "react-toastify";

const AddCase = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    document: null,
    category: "",
    location: "",
    urgency_level: "",
    caseStatus: "",
    policeStation: "",
    firNumber: "",
    courtName: "",
    caseNumber: "",
    opposingParty: "",
    applicableLaws: "",
    hearingDate: "",
    selectedLawyer: "",
    sub_category: "", // For sub-specialization matching
    complexity: "Moderate", // Default value
    max_hourly_rate: "", // For budget filtering
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [matchedLawyers, setMatchedLawyers] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [showMatchResults, setShowMatchResults] = useState(false);

  const caseTypes = [
    "murder",
    "visa issue",
    "patent",
    "merger",
    "divorce",
    "discrimination",
    "contract",
    "harassment",
    "robbery",
    "child custody",
    "property dispute",
    "financial fraud",
    "cyber crime",
    "drug offense",
    "corruption",
  ];

  const locations = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Multan", "Faisalabad", "Rawalpindi"];
  const urgencyLevels = ["high", "medium", "low"];
  const caseStatuses = ["FIR Registered", "Under Investigation", "Challan Submitted", "Trial Started", "Appeal Filed", "Settled"];
  const courts = ["District Court", "High Court", "Supreme Court", "Family Court", "Anti-Terrorism Court", "Banking Court", "Customs Court"];

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await getLawyers(token);
        setLawyers(response);
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      }
    };
    fetchLawyers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      document: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      const caseData = new FormData();
      // Enhanced case data for better matching
      const matchingData = {
      case_type: formData.category,
      case_subtype: formData.sub_category,
      location: formData.location,
      urgency: formData.urgency_level.toLowerCase(),
      complexity: formData.complexity,
      max_hourly_rate: formData.max_hourly_rate || null
      };

      // Append all form fields to caseData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== "") {
          caseData.append(key, formData[key]);
        }
      });
      // Add matching-specific data
      caseData.append('matching_data', JSON.stringify(matchingData));
      // First try prediction if no lawyer selected
      if (!formData.selectedLawyer) {
           const predictionData = {
            case_type: formData.category,
            case_subtype: formData.sub_category, // <-- ADD THIS
            location: formData.location,
            urgency: formData.urgency_level,
            complexity: formData.complexity
          }; 
        const matches = await predictLawyers(predictionData, token);
        setMatchedLawyers(matches.matches);
        setShowMatchResults(true);
        setIsSubmitting(false);  // Reset submitting state
        return;
      } // If lawyer selected, create case
      const response = await createCase(caseData, token);
      toast.success("Case created successfully!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        document: null,
        category: "",
        location: "",
        urgency_level: "",
        caseStatus: "",
        policeStation: "",
        firNumber: "",
        courtName: "",
        caseNumber: "",
        opposingParty: "",
        applicableLaws: "",
        hearingDate: "",
        selectedLawyer: "",
        sub_category: "",
        complexity: "Moderate",
        max_hourly_rate: ""
      });
          setShowMatchResults(false);  // Hide any previous match results

    }catch (err) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Failed to submit case");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a Case</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Basic Case Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Case Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Property Dispute Case"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Case Type*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a case type</option>
              {caseTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Case Description */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Detailed Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Provide complete details including events, dates, and people involved..."
          />
        </div>

        {/* Case Status and Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Current Status*</label>
            <select
              name="caseStatus"
              value={formData.caseStatus}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select case status</option>
              {caseStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Location*</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Urgency Level*</label>
            <select
              name="urgency_level"
              value={formData.urgency_level}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select urgency_level</option>
              {urgencyLevels.map((urg) => (
                <option key={urg} value={urg}>
                  {urg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Police and FIR Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Police Station (if applicable)</label>
            <input
              type="text"
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Clifton Police Station"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700 font-medium">FIR Number (if applicable)</label>
            <input
              type="text"
              name="firNumber"
              value={formData.firNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 123/2023"
            />
          </div>
        </div>
         {/*Case_Subtype and Hourly rate */}
         <div>
            <label className="block mb-2 text-gray-700 font-medium">Case Sub-Category (Optional)</label>
            <input
              type="text"
              name="sub_category"
              value={formData.sub_category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., Land Ownership Dispute"
            />
          </div>
          
           <div>
             <label className="block mb-2 text-gray-700 font-medium">Maximum Hourly Rate (Optional)</label>
             <input
               type="number"
               name="max_hourly_rate"
               value={formData.max_hourly_rate}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
               placeholder="e.g., 5000"
               min={0}
             />
             </div>

        {/* Court Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Court Name (if in court)</label>
            <select
              name="courtName"
              value={formData.courtName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select court</option>
              {courts.map((court) => (
                <option key={court} value={court}>
                  {court}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Case Number (if in court)</label>
            <input
              type="text"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., 456/2023"
            />
          </div>
        </div>

        {/* Legal Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Opposing Party Details</label>
            <input
              type="text"
              name="opposingParty"
              value={formData.opposingParty}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Name and contact if known"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Applicable Laws/Sections</label>
            <input
              type="text"
              name="applicableLaws"
              value={formData.applicableLaws}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g., PPC 302, 324"
            />
          </div>
        </div>

        {/* Hearing Date */}
        <div className="w-full md:w-1/2">
          <label className="block mb-2 text-gray-700 font-medium">Next Hearing Date (if known)</label>
          <input
            type="date"
            name="hearingDate"
            value={formData.hearingDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Lawyer Selection */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Select a Lawyer (Optional)</label>
          <select
            name="selectedLawyer"
            value={formData.selectedLawyer}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Let system auto-match</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer.id} value={lawyer.id}>
                {lawyer.username}({lawyer.specialization})
              </option>
            ))}
          </select>
        </div>

        {/* Document Upload */}
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Upload Documents (Optional)</label>
          <p className="text-sm text-gray-500 mb-2">FIR copy, court orders, evidence, etc. (PDF, JPG, PNG)</p>
          <div className="mt-1 flex items-center">
            <label className="cursor-pointer bg-white rounded-lg border border-gray-300 px-4 py-2 flex items-center justify-center hover:bg-gray-50">
              <span className="text-gray-600">
                {formData.document ? formData.document.name : "Choose a file"}
              </span>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium ${
            isSubmitting
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-700"
          } text-white transition-colors`}
        >
          {isSubmitting ? "Submitting..." : "Submit Case"}
        </button>
      </form>

      {/* Matched Lawyer Info */}
      {showMatchResults && (
            <div className="mt-6 bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {matchedLawyers.length > 0 ? "Matched Lawyers" : "No Matching Lawyers Found"}
              </h3>
              {matchedLawyers.length > 0 ? (
                <ul className="space-y-2">
                  {matchedLawyers.map((lawyer) => (
                    <li key={lawyer.id} className="border p-3 rounded bg-white shadow">
                      <p><strong>Name:</strong> {lawyer.username}</p>
                      <p><strong>Specialization:</strong> {lawyer.specialization}</p>
                      <p><strong>Hourly Rate:</strong> ${lawyer.hourly_rate}</p>
                      <p><strong>Success Rate:</strong> {lawyer.success_rate}</p>
                      <p><strong>Match Score:</strong> {(lawyer.match_score * 100).toFixed(1)}%</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No lawyers match your criteria. Try adjusting your filters.</p>
              )}
            </div>
          )}
    </div>
  );
};

export default AddCase;