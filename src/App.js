import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './pages/user';
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login/>} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
