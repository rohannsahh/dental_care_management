import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import CalendarView from "./pages/CalendarView";
import { seedMockData } from "./utils/fakeData";

seedMockData(); 
function ProtectedRoute({ children, role }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (role && currentUser.role !== role) return <Navigate to="/login" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
<Route
  path="/admin/patients"
  element={
    <ProtectedRoute role="admin">
      <Patients />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/appointments"
  element={
    <ProtectedRoute role="admin">
      <Appointments />
    </ProtectedRoute>
  }
/>

          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />


<Route
  path="/admin/calendar"
  element={
    <ProtectedRoute role="admin">
      <CalendarView />
    </ProtectedRoute>
  }
/>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
