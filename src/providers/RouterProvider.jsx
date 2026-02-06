import { createBrowserRouter } from "react-router-dom";

// import Signup from "@/features/auth/Signup";
// import ProductList from "@/features/products/ProductList";
// import ProductDetails from "@/features/products/ProductDetails";
// import Wardrobe from "@/features/wardrobe/Wardrobe";
// import Cart from "@/features/cart/Cart";
// import ProtectedRoute from "@/routes/ProtectedRoute";

import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import LoginPage from "../auth/pages/Login";
import OtpPage from "../auth/pages/OtpPage";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/verify-otp", element: <OtpPage /> },
      //   { path: "/signup", element: <Signup /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      //   { path: "/", element: <ProductList /> },
      //   { path: "/product/:id", element: <ProductDetails /> },
      //   {
      //     path: "/wardrobe",
      //     element: (
      //       <ProtectedRoute>
      //         <Wardrobe />
      //       </ProtectedRoute>
      //     ),
      //   },
      //   {
      //     path: "/cart",
      //     element: (
      //       <ProtectedRoute>
      //         <Cart />
      //       </ProtectedRoute>
      //     ),
      //   },
    ],
  },
]);

// import React from "react";
// import { useRoutes } from "react-router-dom";

// export function RouterProvider() {
//   useAuthContext();

//   return useRoutes([
//     // ================= PUBLIC ROUTES WITHOUT LAYOUT =================
//     // These routes have their own layouts

//     // ================= AUTH ROUTES WITH AUTH LAYOUT =================
//     {
//       element: <AuthLayout />,
//       children: [{ path: "/login", element: <LoginPage /> }],
//     },

//     // ================= PUBLIC ROUTES WITH MAIN LAYOUT =================
//     {
//       path: "/",
//       element: <MainLayout />,
//       children: [
//         {
//           path: "/",
//           element: <LandingPage />,
//         },
//         { path: "/about", element: <About /> },
//         { path: "/stories", element: <Stories /> },
//         { path: "/search", element: <SearchPage /> },

//         // ================= PROTECTED ROUTES =================
//         {
//           element: <ProtectedRoute />,
//           children: [
//             { path: "/profile", element: <MyProfilePage /> },
//             { path: "/profile/edit", element: <EditProfilePage /> },
//             { path: "/matches", element: <MatchesPage /> },
//             { path: "/chat", element: <ChatPage /> },
//             { path: "/chat/:conversationId", element: <ChatPage /> },
//             { path: "/notifications", element: <NotificationsPage /> },
//             { path: "/interests", element: <InterestPage /> },
//             { path: "/blocked-users", element: <BlockedUsersPage /> },
//             { path: "/shortlisted", element: <ShortlistedPage /> },
//             { path: "/profile/view/:userId", element: <ViewProfilePage /> },
//           ],
//         },

//         // 404 route
//         { path: "*", element: <h1>404 – Page Not Found</h1> },
//       ],
//     },

//     // ================= ADMIN ROUTES =================
//     {
//       element: <AdminRoute />,
//       children: adminRoutes,
//     },
//   ]);
// }