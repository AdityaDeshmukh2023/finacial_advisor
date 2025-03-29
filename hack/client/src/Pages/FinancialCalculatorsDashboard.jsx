import React, { useState } from 'react';
import NavBar from "../components/NavBar";
import PPFCalculator from './PPFCalculator';
import SIPCalculator from './SIPCalculator';
import EMICalculator from './EMICalculator';
import RetirementCalculator from './RetirementCalculator';
import CompoundInterestCalculator from './CompoundInterestCalculator';
import TaxCalculator from './TaxCalculator';

// Placeholder icons using emojis instead of Lucide
const icons = {
  ppf: '💰',
  sip: '📈',
  emi: '💳',
  retirement: '🏦',
  compoundInterest: '🧮',
  tax: '📋'
};

const CalculatorCard = ({ icon, title, description, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white hover:bg-green-50 transition-all duration-500 ease-in-out rounded-xl shadow-md p-6 cursor-pointer group border border-gray-100 hover:border-green-300 hover:shadow-2xl transform hover:-translate-y-3 hover:scale-105 max-w-sm h-72 flex flex-col justify-between overflow-hidden relative"
    >
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-green-100 rounded-full opacity-0 group-hover:opacity-50 transition-all duration-500"></div>
      <div>
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 transform">
            {icon}
          </span>
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 mb-4 transition-all duration-300 group-hover:text-gray-800">
          {description}
        </p>
      </div>
      <div className="flex justify-end overflow-hidden">
        <span className="text-green-500 font-medium transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 flex items-center">
          Calculate 
          <span className="inline-block ml-1 transform group-hover:translate-x-1 transition-all duration-300">→</span>
        </span>
      </div>
    </div>
  );
};

const FinancialCalculatorsDashboard = () => {
  const [activeCalculator, setActiveCalculator] = useState(null);
  const [language, setLanguage] = useState("en");

  const calculators = [
    {
      id: 'ppf',
      title: 'PPF Calculator',
      description: 'Calculate your Public Provident Fund investment growth and potential returns.',
      icon: icons.ppf,
      component: PPFCalculator
    },
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Estimate your Systematic Investment Plan returns and wealth creation potential.',
      icon: icons.sip,
      component: SIPCalculator
    },
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate your Equated Monthly Installments for loans.',
      icon: icons.emi,
      component: EMICalculator
    },
    {
      id: 'retirement',
      title: 'Retirement Calculator',
      description: 'Plan your retirement corpus and understand future financial needs.',
      icon: icons.retirement,
      component: RetirementCalculator
    },
    {
      id: 'compoundInterest',
      title: 'Compound Interest Calculator',
      description: 'Understand the power of compounding on your investments.',
      icon: icons.compoundInterest,
      component: CompoundInterestCalculator
    },
    {
      id: 'tax',
      title: 'Tax Calculator',
      description: 'Estimate your tax liability and potential savings.',
      icon: icons.tax,
      component: TaxCalculator
    }
  ];

  const handleCalculatorSelect = (calculator) => {
    setActiveCalculator(calculator);
  };

  const handleBackToDashboard = () => {
    setActiveCalculator(null);
  };

  if (activeCalculator) {
    const SelectedCalculator = activeCalculator.component;
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar language={language} toggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')} />
        <div className="flex-grow pt-6">
          <div className="container mx-auto px-4">
            <button 
              onClick={handleBackToDashboard}
              className="mb-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md hover:shadow-lg flex items-center"
            >
              <span className="mr-1">←</span> Back to Calculators
            </button>
            <SelectedCalculator />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-green-50 to-green-100">
      <NavBar language={language} toggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')} />
      <div className="flex-grow p-8 pt-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-12 text-center animate-fade-in-down">
            Financial Calculators
          </h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {calculators.map((calculator) => (
              <CalculatorCard
                key={calculator.id}
                title={calculator.title}
                description={calculator.description}
                icon={calculator.icon}
                onClick={() => handleCalculatorSelect(calculator)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculatorsDashboard;