import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { AboutPage } from "../pages/AboutPage/AboutPage";
import { HowItWorksPage } from "../pages/HowItWorksPage/HowItWorksPage";
import { ReviewsPage } from "../pages/ReviewsPage/ReviewsPage";
import { SearchPage } from "../pages/SearchPage/SearchPage";
import { LastTicketsPage } from "../pages/LastTicketsPage/LastTicketsPage";
import { TrainPage } from "../pages/TrainPage/TrainPage";
import { PassengerPage } from "../pages/PassengerPage/PassengerPage";
import { PaymentPage } from "../pages/PaymentPage/PaymentPage";
import { ConfirmationPage } from "../pages/ConfirmationPage/ConfirmationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "how-it-works", element: <HowItWorksPage /> },
      { path: "reviews", element: <ReviewsPage /> },
      { path: "search", element: <SearchPage /> },
      { path: "last-tickets", element: <LastTicketsPage /> },
      { path: "train/:id", element: <TrainPage /> },
      { path: "passenger", element: <PassengerPage /> },
      { path: "payment", element: <PaymentPage /> },
      { path: "confirmation", element: <ConfirmationPage /> },
    ],
  },
]);
