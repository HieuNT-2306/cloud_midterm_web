import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './pages/user';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
