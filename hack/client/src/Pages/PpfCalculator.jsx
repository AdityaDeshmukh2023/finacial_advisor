import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { InfoIcon } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const PPFCalculator = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState(10000);
  const [timePeriod, setTimePeriod] = useState(15);
  const [rateOfInterest, setRateOfInterest] = useState(7.1);
  const [results, setResults] = useState({
    investedAmount: 0,
    totalInterest: 0,
    maturityValue: 0,
  });
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    calculatePPF();
  }, [yearlyInvestment, timePeriod, rateOfInterest]);

  const calculatePPF = () => {
    let totalInvestment = yearlyInvestment * timePeriod;
    let maturityValue = 0;
    let balance = 0;

    for (let year = 1; year <= timePeriod; year++) {
      balance += yearlyInvestment;
      let interest = balance * (rateOfInterest / 100);
      balance += interest;
      maturityValue = balance;
    }

    setResults({
      investedAmount: totalInvestment,
      totalInterest: Math.round(maturityValue - totalInvestment),
      maturityValue: Math.round(maturityValue),
    });
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "hi" : "en"));
  };

  const chartData = [
    { name: "Total Investment", value: results.investedAmount },
    { name: "Total Interest", value: results.totalInterest },
  ];

  const COLORS = ["#E2E8F0", "#4ADE80"];

  return (
    <>
      <NavBar language={language} toggleLanguage={toggleLanguage} />

      <div className="mx-auto p-6 space-y-8 bg-gradient-to-tr from-green-300 to-green-50">
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 space-y-6 mt-16">
          <h2 className="text-2xl font-bold text-gray-800">PPF Calculator</h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-600">Yearly Investment (₹)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="500"
                  max="150000"
                  step="500"
                  value={yearlyInvestment}
                  onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  ₹{yearlyInvestment.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600">Time Period (in years)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="15"
                  max="30"
                  step="1"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="bg-green-50 text-green-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {timePeriod} Yr
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-gray-600">Rate of Interest (%)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="6"
                  max="8"
                  step="0.1"
                  value={rateOfInterest}
                  onChange={(e) => setRateOfInterest(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
                <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md min-w-[120px] text-center">
                  {rateOfInterest}%
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6 ">
            <div className="space-y-4 order-2 md:order-1">
              <div className="space-y-1">
                <label className="text-gray-500">Invested Amount</label>
                <p className="text-xl font-semibold">
                  ₹{results.investedAmount.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500">Total Interest</label>
                <p className="text-xl font-semibold">
                  ₹{results.totalInterest.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-gray-500">Maturity Value</label>
                <p className="text-xl font-semibold text-green-500">
                  ₹{results.maturityValue.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="h-64 order-1 md:order-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-sm text-gray-600">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <InfoIcon className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-semibold">About PPF Investment</h3>
          </div>

          <div className="space-y-4 text-gray-600">
            <p>
              The Public Provident Fund (PPF) is a long-term savings scheme
              backed by the Government of India. It offers a secure investment
              option with attractive returns and tax benefits under Section 80C
              of the Income Tax Act.
            </p>

            <div className="space-y-2">
              <h4 className="font-semibold">Key Features:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Lock-in period of 15 years with partial withdrawal facility
                  after 6 years
                </li>
                <li>
                  Tax-free returns and tax deduction on investment under Section
                  80C
                </li>
                <li>Minimum yearly deposit of ₹500 and maximum of ₹1,50,000</li>
                <li>
                  Interest rate is reviewed and announced quarterly by the
                  government
                </li>
                <li>Can be opened in banks and post offices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PPFCalculator;
