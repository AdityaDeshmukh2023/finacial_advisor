function Footer() {
  return (
    <div>
      <footer className="bg-gradient-to-br from-green-50 to-white text-black py-6">
        <div className="max-w-screen-lg mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center md:text-left">
              <p>&copy; 2025 SmartPlan. All Rights Reserved.</p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-black hover:text-gray-400"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                className="text-black hover:text-gray-400"
              >
                Twitter
              </a>
              <a
                href="https://instagram.com"
                className="text-black hover:text-gray-400"
              >
                Instagram
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4">
            <nav className="text-center">
              <ul className="space-x-4">
                <li className="inline">
                  <a href="/about" className="text-black hover:text-gray-400">
                    About Us
                  </a>
                </li>
                <li className="inline">
                  <a href="/contact" className="text-black hover:text-gray-400">
                    Contact
                  </a>
                </li>
                <li className="inline">
                  <a href="/privacy" className="text-black hover:text-gray-400">
                    Privacy Policy
                  </a>
                </li>
                <li className="inline">
                  <a href="/terms" className="text-black hover:text-gray-400">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
