import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ContactCollector from "./ContactCollector";
import ContactsPage from "./ContactsPage";

function App() {
  return (
    <BrowserRouter>
      <div>

        {/* Simple top navigation */}
        <nav className="p-4 bg-gray-800 text-white flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/contacts">View Contacts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ContactCollector />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
