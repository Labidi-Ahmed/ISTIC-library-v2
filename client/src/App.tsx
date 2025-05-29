import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PrivateRoutes from '@/features/auth/components/PrivateRoutes';
import PublicRoutes from '@/features/auth/components/PublicRoutes';
import NotFoundPage from './pages/NorFoundPage';
import AppLayout from './layouts/AppLayout';
import {Toaster} from './components/ui/sonner';

import ThemeWrapper from './components/ThemeWrapper';
import ReportSubmissionForm from './features/report-submition/components/ValidateForm';
import ELibraryPage from './pages/Book-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to={'/app/books'} />} />
      <Route element={<ThemeWrapper />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/app" element={<AppLayout />}>
            <Route path="books" element={<ELibraryPage />} />

            <Route
              path="validate"
              element={
                <div className="flex items-center h-[calc(100dvh-20dvh)]">
                  <div className="container mx-auto max-w-xl">
                    <ReportSubmissionForm />
                  </div>
                </div>
              }
            />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <section className="antialiased">
      <Toaster />
      <RouterProvider router={router} />
    </section>
  );
};

export default App;
