import React, { useState } from "react";
import { Menu, User, Search, ShoppingCart } from "lucide-react";
import { Typography } from "@mui/material";

const Header = () => {
  const [catalogOpen, setCatalogOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 border-b-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Navigation */}
          <div className="flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setCatalogOpen(!catalogOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <Typography variant="body1">CATALOG</Typography>
                <svg
                  className={`w-4 h-4 transition-transform ${catalogOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
            <Typography>BRAND</Typography>
          </div>

          {/* Center Section - Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded-full"></div>
              <span className="text-xl font-semibold text-gray-900">Zen</span>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <User className="w-5 h-5" />
              <Typography>ACCOUNT</Typography>
            </button>
            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
              <Search className="w-5 h-5" />
              <Typography>SEARCH</Typography>
            </button>
            <button className="bg-black gap-3 text-white px-4 py-2 rounded hover:bg-gray-800 flex items-center space-x-2">
              <Typography>CART</Typography>
              <Typography>2</Typography>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
