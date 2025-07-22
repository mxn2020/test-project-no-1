// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Dashboard } from './components/auth/Dashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './components/auth/AuthProvider';
import { DevModeApp, Container } from './lib/dev-container';
import { componentRegistry } from './registry/componentRegistry';
import { componentLibrary } from './registry/componentLibrary';

function App() {
  return (
    <DevModeApp system={{ registry: componentRegistry, library: componentLibrary }}>
      <AuthProvider>
        <Router>
          <Container componentId="app-root">
            <div className="App">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Container>
        </Router>
      </AuthProvider>
    </DevModeApp>
  );
}

export default App;