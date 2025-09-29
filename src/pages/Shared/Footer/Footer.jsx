const Footer = () => {
  return (
    <footer className="text-neutral-content">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row w-full">
        {/* Contact Us */}
        <div className="flex-1 bg-[#1F2937] p-6 text-center sm:text-left">
          <h2 className="text-lg font-bold mb-2">CONTACT US</h2>
          <div className="space-y-1 text-sm">
            <p>123 ABS Street, Uni 21, Bangladesh</p>
            <p>+45 123456789</p>
            <p>Mon - Fri: 08:00 - 22:00</p>
            <p>Sat - Sun: 10:00 - 23:00</p>
          </div>
        </div>

        {/* Follow Us */}
        <div className="flex-1 bg-[#111827] p-6 text-center sm:text-left">
          <h2 className="text-lg font-bold mb-2">Follow US</h2>
          <p className="text-sm mb-2">Join us on social media</p>
          <div className="flex justify-center sm:justify-start gap-4 mt-4">
            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current hover:text-orange-500 transition" viewBox="0 0 24 24">
                <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.932 4.932 0 002.165-2.724
                9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.953 
                13.953 0 011.671 3.149a4.902 4.902 0 001.523 6.574A4.902 4.902 
                0 01.96 9.14v.061a4.918 4.918 0 003.946 4.827 4.902 4.902 0 
                01-2.212.084 4.928 4.928 0 004.6 3.417A9.867 9.867 0 010 
                21.539a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.496 
                14.01-13.986 0-.21-.005-.423-.014-.634A10.012 
                10.012 0 0024 4.557z" />
              </svg>
            </a>

            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <svg className="w-6 h-6 fill-current hover:text-orange-500 transition" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 
                0-3.897.266-4.356 2.62-4.385 8.816.029 
                6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 
                15.23 0 3.897-.266 4.356-2.62 
                4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 
                15.999V8l8 3.999-8 4z" />
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current hover:text-orange-500 transition" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.333C14 
                5.378 14.192 5 15.115 5H18V0h-3.808C10.596 
                0 9 1.583 9 4.615V8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer footer-center bg-[#1E1E1E] p-4 text-xs sm:text-sm">
        <aside>
          <p>© {new Date().getFullYear()} CulinaryCloud. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;


