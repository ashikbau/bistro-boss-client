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
            {/* Social Icons */}
            <a aria-label="Twitter">
              <svg className="w-6 h-6 fill-current hover:text-orange-500 transition" viewBox="0 0 24 24">
                <path d="M24 4.557c-..."></path>
              </svg>
            </a>
            <a aria-label="YouTube">
              <svg className="w-6 h-6 fill-current hover:text-orange-500 transition" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-..."></path>
              </svg>
            </a>
            <a aria-label="Facebook">
              <svg className="w-6 h-6 fill-current hover:text-orange-500 transition" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5..."></path>
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


// const Footer = () => {
//     return (
//         <div>

// <footer className="footer  text-neutral-content p-o"
// // style={{ backgroundColor: '#1F2937' }}

// >
//    <div className="flex flex-col sm:flex-row  w-full">
//      <div className="flex-1 bg-[#1F2937] p-10 text-center" >
   
//       <h2 className="text-lg font-bold mb-2">
//         CONTACT US
//        </h2>
//        <div className="space-y-1 text-xs">
//         <p >123 ABS Street, Uni 21, Bangladesh</p>
//        <p>+45 123456789</p>
//        <p>Mon - Fri: 08:00 - 22:00</p>
//        <p>Sat - Sun: 10:00 - 23:00</p>
//        </div>
//     </div>
//     <div className="flex-1 bg-[#111827] p-10 text-center">
//       <h2 className="text-lg font-bold mb-2">Follow US</h2>
//       <p className="text-xs mb-2">Join us on social media</p>
      
//       <div className="flex justify-center gap-4 mt-9">
//          <a>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           className="fill-current">
//           <path
//             d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//         </svg>
//       </a>
//       <a>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           className="fill-current">
//           <path
//             d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//         </svg>
//       </a>
//       <a>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           className="fill-current">
//           <path
//             d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
//         </svg>
//       </a>
//       </div>
//     </div>
//    </div>
//   </footer>

//   <footer className="footer sm:footer-horizontal footer-center bg-[#1E1E1E] text-neutral-content p-4 mb-10"
//   // style={{ backgroundColor: '#F3F4F6' }}
  
//   >
//     <aside >
//       <p>Copyright © {new Date().getFullYear()} CulinaryCloud. All rights reserved.</p>
//     </aside>
//   </footer>

// </div>

//     );
// };

// export default Footer;