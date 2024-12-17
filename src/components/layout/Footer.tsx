import Link from "next/link";
import AppIcon from "../AppIcon";

const Footer = () => {
    return (
      <footer className="py-8 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-4">
          {/* Left Section: Site Name + Social Media */}
          <div className="flex flex-col items-start gap-3 mb-6 md:mb-0">
            <AppIcon />
            <div className="flex space-x-4 text-gray-500">
                <p className="max-w-96">
                "Sobat Hukum" adalah platform berbasis web yang dirancang untuk memberikan layanan bantuan hukum kepada masyarakat. 
                </p>              
            </div>
          </div>
  
          {/* Right Section: Links */}
          <div className="grid grid-cols-3 gap-20 lg:gap-36">
            {/* Topics */}
            {[1].map((topic) => (
              <div key={topic}>
                <h2 className="text-md font-bold text-gray-600 mb-2">Laman</h2>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="hover:text-gray-700 cursor-pointer">
                    <Link href={"/"}>Beranda</Link>
                  </li>
                  <li className="hover:text-gray-700 cursor-pointer">
                    <Link href={"/about"}>Tentang</Link>
                  </li>
                  <li className="hover:text-gray-700 cursor-pointer">
                    <Link href={"/our-lawyer"}>Lawyer Kami</Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  