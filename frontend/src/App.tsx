import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Tables from "./pages/tables/Tables";
import MainLayout from "./pages/MainLayout";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import StoredProcedure from "./pages/storedProcedures/StroredProcedures";
import HelpAndDocs from "./pages/helpandDocs/HelpAndDocs";
import Triggers from "./pages/triggers/Triggers";
import Functions from "./pages/functions/Functions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/main/*" element={<MainLayout />} >
          <Route path="home" element={<Home />} />
          <Route path="tables" element={<Tables />} />
          <Route path="storedProcedures" element={<StoredProcedure />} />
          <Route path="functions" element={<Functions />} />
          <Route path="triggers" element={<Triggers />} />
          <Route path="helpandocs" element={<HelpAndDocs />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
