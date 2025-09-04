import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";

export default function PortfolioPage() {
  return (
    <div className="bg-gray-50 text-gray-900">
      <Navbar />
      <Portfolio />
      <Footer />
    </div>
  );
}