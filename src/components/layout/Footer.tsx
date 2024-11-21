import AppIcon from "../AppIcon";

const Footer = () => {
    return (
      <footer className="w-full py-8">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Section: Site Name + Social Media */}
          <div className="flex flex-col items-start gap-3 mb-6 md:mb-0">
            <AppIcon />
            <div className="flex space-x-4 text-gray-500">
                <p className="max-w-96">
                    Subheading that sets up context, shares more info about the website, or generally gets people psyched to keep scrolling. 
                </p>              
            </div>
          </div>
  
          {/* Right Section: Links */}
          <div className="grid grid-cols-3 gap-20 lg:gap-36">
            {/* Topics */}
            {[1, 2, 3].map((topic) => (
              <div key={topic}>
                <h2 className="text-md font-bold text-gray-600 mb-2">Topic</h2>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li className="hover:text-gray-700 cursor-pointer">Page</li>
                  <li className="hover:text-gray-700 cursor-pointer">Page</li>
                  <li className="hover:text-gray-700 cursor-pointer">Page</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  