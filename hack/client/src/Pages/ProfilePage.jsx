import React from "react";
import {
  Users,
  Briefcase,
  Book,
  Bike,
  Newspaper,
  MessageCircle,
  Image,
  CheckSquare,
} from "lucide-react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../Authorisation/AuthProvider";
import { handleSuccess } from "../utils";

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const UserProfile = () => {
  const { logout } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  function handleLogout() {
    handleSuccess("logged out successfully ");
    if (logout) logout();
    navigate("/login");
  }

  return (
    <>
      <NavBar
        language="en"
        toggleLanguage={() => console.log("Language toggled")}
      />
      <div className="min-h-screen bg-gradient-to-br pt-16 from-green-50 to-white">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-300 to-green-50 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
                <Users size={48} className="text-green-600" />
              </div>
              <div className="text-black">
                <h1 className="text-3xl font-bold">Aditya Deshmukh</h1>
                <p className="text-black">Software Engineer</p>
                <p className="mt-2">Pune, Maharashtra</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    aditya.deshmukh@gmail.com
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> +91 98765 43210
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> Mumbai, Maharashtra
                  </p>
                  <p>
                    <span className="font-medium">Languages:</span> English, Hindi, Marathi
                  </p>
                </div>
              </CardContent>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleLogout}
                  className="logout-button bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </Card>

            {/* Activities Section */}
            <div className="md:col-span-2 space-y-6">
              {/* Job & Learning */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase className="text-green-600" />
                      <h3 className="text-lg font-semibold">Current Job</h3>
                    </div>
                    <p>Senior Developer at TCS</p>
                    <p className="text-sm text-gray-600 mt-2">2021 - Present</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Book className="text-green-600" />
                      <h3 className="text-lg font-semibold">
                        Learning Progress
                      </h3>
                    </div>
                    <p>5 Courses Completed</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Currently learning Financial Management
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Feed */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Recent Activities
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Bike className="text-green-600" />
                      <div>
                        <p className="font-medium">Tracked monthly expenses</p>
                        <p className="text-sm text-gray-600">
                          Yesterday at 3:30 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="text-green-600" />
                      <div>
                        <p className="font-medium">Discussion on SIP investments</p>
                        <p className="text-sm text-gray-600">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image className="text-green-600" />
                      <div>
                        <p className="font-medium">Uploaded income documents</p>
                        <p className="text-sm text-gray-600">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tasks & News */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckSquare className="text-green-600" />
                      <h3 className="text-lg font-semibold">Financial Goals</h3>
                    </div>
                    <div className="space-y-2">
                      <p>• Start SIP investments</p>
                      <p>• Create emergency fund</p>
                      <p>• Plan tax-saving investments</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Newspaper className="text-green-600" />
                      <h3 className="text-lg font-semibold">Financial News</h3>
                    </div>
                    <div className="space-y-2">
                      <p>• RBI Policy Updates</p>
                      <p>• Sensex Movement</p>
                      <p>• New Tax Guidelines</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;