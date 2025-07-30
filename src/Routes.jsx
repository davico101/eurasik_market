import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import UserLogin from './pages/user-login';
import GameSearchAndBrowse from './pages/game-search-and-browse';
import GameDetailAndBidding from './pages/game-detail-and-bidding';
import MarketplaceDashboard from './pages/marketplace-dashboard';
import UserRegistration from './pages/user-registration';
import GameListingCreation from './pages/game-listing-creation';
import UserProfileAndSettings from './pages/user-profile-and-settings';
import MessagesAndCommunication from './pages/messages-and-communication';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<GameDetailAndBidding />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/game-search-and-browse" element={<GameSearchAndBrowse />} />
        <Route path="/game-detail-and-bidding" element={<GameDetailAndBidding />} />
        <Route path="/marketplace-dashboard" element={<MarketplaceDashboard />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/game-listing-creation" element={<GameListingCreation />} />
        <Route path="/user-profile-and-settings" element={<UserProfileAndSettings />} />
        <Route path="/messages-and-communication" element={<MessagesAndCommunication />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;