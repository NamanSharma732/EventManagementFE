// import React, { useState, useEffect } from "react";



// //rounter
// import { Link } from "react-router-dom";


// //prism
// import "../../node_modules/prismjs/prism";
// import "../../node_modules/prismjs/themes/prism-okaidia.css";

// // SliderTab
// import SliderTab from "../directives/slider-tabs";


// const Index = React.memo(() => {


//   useEffect(() => {
//     return () => {
//       setTimeout(() => {
//         Array.from(
//           document.querySelectorAll('[data-toggle="slider-tab"]'),
//           (elem) => {
//             return new SliderTab(elem);
//           }
//         );
//       }, 100);
//     };
//   });

//   useEffect(() => {
//     const backToTop = document.getElementById("back-to-top");

//     if (backToTop) {
//       backToTop.classList.add("animate__animated", "animate__fadeOut");

//       const handleScroll = () => {
//         if (document.documentElement.scrollTop > 250) {
//           backToTop.classList.remove("animate__fadeOut");
//           backToTop.classList.add("animate__fadeIn");
//         } else {
//           backToTop.classList.remove("animate__fadeIn");
//           backToTop.classList.add("animate__fadeOut");
//         }
//       };

//       window.addEventListener("scroll", handleScroll);

//       return () => {
//         window.removeEventListener("scroll", handleScroll);
//       };
//     }
//   }, []);

//   return (
//     <div className="d-flex justify-content-center align-items-center">
//     <div>
//       <Link
//         className="bg-white btn  text-black d-flex"
//         to="/dashboard"
//         target="_black"
//       >
//         <svg
//           width="22"
//           height="22"
//           className="me-1"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//           ></path>
//         </svg>
//         Dashboard Demo
//       </Link>
//     </div>
//   </div>
//   );
// });

// export default Index;
