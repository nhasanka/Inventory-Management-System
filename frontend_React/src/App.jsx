import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Users from "./pages/Users";
import Cupboards from "./pages/Cupboards";
import EditCupboard from "./pages/EditCupboard";
import Places from "./pages/Places";
import EditPlace from "./pages/EditPlace";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cupboards" element={<Cupboards />} />
            <Route path="/cupboards/edit/:id" element={<EditCupboard />} />
            <Route path="/places" element={<Places />} />
            <Route path="/places/edit/:id" element={<EditPlace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
