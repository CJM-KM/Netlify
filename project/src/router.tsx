import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import JourneyPage from './pages/JourneyPage';
import ComparePage from './pages/ComparePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ReviewsPage  from './pages/ReviewsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'journey',
        element: <JourneyPage />,
      },
      {
        path: 'compare',
        element: <ComparePage />,
      },
      {
        path: 'reviews',
        element: <ReviewsPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
    ],
  },
]);

export default router;