import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CreateApplication from "./pages/CreateApplication";
import ApplicationOverview from "./pages/ApplicationOverview";
import SopEditor from "./pages/SopEditor";
import Analysis from "./pages/Analysis";
import ReviewResults from "./pages/ReviewResults";
import SentenceReview from "./pages/SentenceReview";
import VersionHistory from "./pages/VersionHistory";
import CompareVersions from "./pages/CompareVersions";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Billing from "./pages/Billing";
import Help from "./pages/Help";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/applications/new" element={<CreateApplication />} />
        <Route path="/applications/:id" element={<ApplicationOverview />} />
        <Route path="/applications/:id/edit" element={<SopEditor />} />
        <Route path="/applications/:id/analyzing" element={<Analysis />} />
        <Route path="/applications/:id/review" element={<ReviewResults />} />
        <Route
          path="/applications/:id/review/sentences"
          element={<SentenceReview />}
        />
        <Route path="/applications/:id/versions" element={<VersionHistory />} />
        <Route path="/applications/:id/compare" element={<CompareVersions />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/help" element={<Help />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
