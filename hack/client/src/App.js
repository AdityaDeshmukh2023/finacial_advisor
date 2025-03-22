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
import ProtectedRoute from "./Authorisation/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <ChatbotButton />

      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <RegistrationPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<FinancialAdvisor />} />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <NewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learn"
            element={
              <ProtectedRoute>
                <LearningCenter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profiles"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/road"
            element={
              <ProtectedRoute>
                <VerticalRoadmap />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shorts"
            element={
              <ProtectedRoute>
                <YouTubeShorts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scheme"
            element={
              <ProtectedRoute>
                <GovernmentSchemes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ppf"
            element={
              <ProtectedRoute>
                <PPFCalculator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/womens"
            element={
              <ProtectedRoute>
                <WomenEmpowerment />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <ErrorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mip"
            element={
              <ProtectedRoute>
                <MicroinvestmentPlatform />
              </ProtectedRoute>
            }
          />
          <Route
            path="/poultry"
            element={
              <ProtectedRoute>
                <PoultryFarmGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rural"
            element={
              <ProtectedRoute>
                <RuralBusinessOpportunities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <DiscussionForums />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dairy"
            element={
              <ProtectedRoute>
                <DairyForumPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stories"
            element={
              <ProtectedRoute>
                <SuccessStories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/qna"
            element={
              <ProtectedRoute>
                <QASessions />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
