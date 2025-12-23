import React from 'react';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiHome, FiLogIn } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white relative z-10">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <FiMessageSquare className="w-32 h-32" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <FiMessageSquare className="w-32 h-32" />
      </div>

      {/* Main Content */}
      <div className="text-center max-w-2xl">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-linear-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
            404
          </h1>
          <div className="w-48 h-1 bg-linear-to-r from-pink-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Message */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4">Oops! Chat Not Found</h2>
          <p className="text-lg text-gray-300 mb-2">
            The conversation or page you're looking for seems to have wandered off.
          </p>
          <p className="text-gray-400">
            It might have been deleted, or you may have followed an outdated link.
          </p>
        </div>

        {/* Illustration/SVG */}
        <div className="mb-10">
          <div className="relative inline-block">
            <div className="w-64 h-48 bg-linear-to-br from-pink-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center">
              <div className="relative">
                <div className="w-32 h-32 border-4 border-dashed border-pink-500/30 rounded-full animate-pulse" />
                <FiMessageSquare className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-pink-400" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">?</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="flex items-center justify-center gap-3 px-8 py-3 bg-linear-to-r from-pink-600 to-pink-700 rounded-lg hover:from-pink-700 hover:to-pink-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FiHome className="w-5 h-5" />
            <span className="font-semibold">Back to Chat</span>
          </Link>
          
          <Link
            to="/login"
            className="flex items-center justify-center gap-3 px-8 py-3 bg-linear-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FiLogIn className="w-5 h-5" />
            <span className="font-semibold">Go to Login</span>
          </Link>
        </div>

        {/* Tips/Suggestions */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="font-semibold text-lg mb-3 text-cyan-300">Suggestions:</h3>
          <ul className="text-left text-gray-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">•</span>
              <span>Check if the chat URL is correct</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">•</span>
              <span>Ensure you're logged in with the right account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">•</span>
              <span>The chat might have been archived or deleted</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-pink-400 mt-1">•</span>
              <span>Try refreshing the page or check your internet connection</span>
            </li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="mt-8 text-sm text-gray-400">
          <p>
            Still having trouble?{' '}
            <button className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;