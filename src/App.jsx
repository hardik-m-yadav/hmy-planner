import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import Home from "./pages/Home";
import Auth from "./Pages/Auth";
import Dashboard from "./pages/Dashboard";
import Calendar from "./pages/Calendar";
import Notes from "./pages/Notes";
import Analytics from "./pages/Analytics";
import AIPlanner from "./pages/AIPlanner";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Planner from "./pages/Planner";
import Contacts from "./pages/Contacts";

const AppLayout = () => {
  const location = useLocation();
    
    const hideLayout =
  location.pathname === "/auth" ||
  location.pathname === "/dashboard" ||
  location.pathname === "/calendar" ||
  location.pathname === "/notes" ||
  location.pathname === "/analytics"||
  location.pathname === "/profile" ||
   location.pathname === "/ai-planner";
   


  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner/>}/>
        <Route path="/auth" element={<Auth />} />
         <Route path="/contact" element={<Contacts />} />
        
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-planner" element={<AIPlanner />} /> */}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/calendar"
  element={
    <ProtectedRoute>
      <Calendar />
    </ProtectedRoute>
  }
/>

<Route
  path="/notes"
  element={
    <ProtectedRoute>
      <Notes />
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/ai-planner"
  element={
    <ProtectedRoute>
      <AIPlanner />
    </ProtectedRoute>
  }
/>
<Route path="/profile" element={<Profile />} />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <>
      <AppLayout />
    </>
  );
};

export default App;