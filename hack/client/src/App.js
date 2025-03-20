import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Authorisation/AuthProvider";
import NewsPage from "./Pages/NewsPage";
import LearningCenter from "./Pages/Learnings";
import UserProfile from "./Pages/ProfilePage";
import VerticalRoadmap from "./Pages/Roadmap";
import YouTubeShorts from "./components/Shorts";
import FinancialAdvisor from "./Pages/Heropage";
import ErrorPage from "./components/ErrorPage";
import GovernmentSchemes from "./Pages/GovernmentScheme";
import PPFCalculator from "./Pages/PpfCalculator";
import WomenEmpowerment from "./Pages/WomensSection";
import ChatbotButton from "./components/ChatbobtButton";

import MicroinvestmentPlatform from "./Pages/mip";
import PoultryFarmGuide from "./Pages/poultry";
import RuralBusinessOpportunities from "./Pages/ruralbusiness";
import Chatbot from "./Pages/chatbot";
import DiscussionForums from "./Pages/community";
import DairyForumPage from "./Pages/dairyforum";
import SuccessStories from "./Pages/SuccessStoriesAvi";
import QASessions from "./Pages/qna";

function App() {
  return (
    <div className="App">
      <ChatbotButton />

      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/" element={<FinancialAdvisor />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/learn" element={<LearningCenter />} />
          <Route path="/profiles" element={<UserProfile />} />
          <Route path="/road" element={<VerticalRoadmap />} />
          <Route path="/shorts" element={<YouTubeShorts />} />
          <Route path="/scheme" element={<GovernmentSchemes />} />
          <Route path="/ppf" element={<PPFCalculator />} />
          <Route path="/womens" element={<WomenEmpowerment />} />
          <Route path="*" element={<ErrorPage />} />

          <Route path="/mip" element={<MicroinvestmentPlatform />} />
          <Route path="/poultry" element={<PoultryFarmGuide />} />
          <Route path="/rural" element={<RuralBusinessOpportunities />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/community" element={<DiscussionForums />} />
          <Route path="/dairy" element={<DairyForumPage />} />
          <Route path="/stories" element={<SuccessStories />} />
          <Route path="/qna" element={<QASessions />} />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
