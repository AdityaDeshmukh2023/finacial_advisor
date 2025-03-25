import { useState, useEffect } from "react";

export default function FinancialAdvisorChatbotUi() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    preferred_language: "English",
    monthly_income: "",
    family_size: "",
    business_type: "",
    existing_savings: "",
    financial_goal: "",
    risk_tolerance: "low",
  });
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    fetch("/business-types")
      .then((response) => response.json())
      .then((data) => setBusinessTypes(data.business_types));
  }, []);

  useEffect(() => {
    const isValid =
      formData.name.trim() !== "" &&
      formData.age > 0 &&
      formData.monthly_income > 0 &&
      formData.location.trim() !== "";
    setFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValid) return;
    setLoading(true);
    setAdvice(null);

    try {
      const response = await fetch("/get-financial-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setAdvice(result.data);
    } catch (error) {
      alert("Error fetching advice. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-6 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-2xl border border-green-300">
        <h1 className="text-3xl font-extrabold text-green-800 mb-6 text-center">
          🌿 Rural Financial Advisor
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />

          <select
            name="preferred_language"
            required
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Odia">Odia</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="monthly_income"
              placeholder="Monthly Income (₹)"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
            <input
              type="number"
              name="family_size"
              placeholder="Family Size"
              required
              className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>

          <select
            name="business_type"
            required
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          >
            <option value="">Select Business Type</option>
            {businessTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>

          <input
            type="number"
            name="existing_savings"
            placeholder="Existing Savings (₹)"
            required
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />

          <textarea
            name="financial_goal"
            placeholder="Your Financial Goals"
            required
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          />

          <select
            name="risk_tolerance"
            required
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-green-500"
            onChange={handleChange}
          >
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 disabled:opacity-50"
            disabled={!formValid}
          >
            Get Financial Advice
          </button>
        </form>

        {loading && <p className="text-center mt-4 font-semibold text-green-700">Generating advice...</p>}

        {advice && (
          <div className="mt-6 p-6 bg-green-100 rounded-xl shadow-lg border border-green-400">
            <h2 className="text-xl font-bold text-green-800">📢 Financial Advice:</h2>
            <p className="text-gray-700 mt-3 text-lg leading-relaxed">{advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}