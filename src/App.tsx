import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import Home from "@/pages/Home";
import Messenger from "@/pages/Messenger";
import Farm from "@/pages/Farm";
import Safety from "@/pages/Safety";
import Explore from "@/pages/Explore";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/farm" element={<Farm />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}
