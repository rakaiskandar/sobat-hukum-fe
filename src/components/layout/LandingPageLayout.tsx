import Footer from "./Footer";
import Navbar from "./Navbar";

const LandingPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen mx-8 my-2">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
