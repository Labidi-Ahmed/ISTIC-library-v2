import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PrivateRoutes from '@/components/auth/PrivateRoutes';
import PublicRoutes from '@/components/auth/PublicRoutes';
import NotFoundPage from './pages/NorFoundPage';
import AppLayout from './layouts/AppLayout';
import {Toaster} from './components/ui/sonner';

import ThemeWrapper from './components/ThemeWrapper';
import SubmitReportPage from './components/report-publish/report-form';
import ReportSubmissionForm from './pages/report-validation/ValidateForm';
import ELibraryPage from './pages/books/Book-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to={'/app/publish'} />} />
      <Route element={<ThemeWrapper />}>
        <Route element={<PrivateRoutes />}>
          <Route path="/app" element={<AppLayout />}>
            <Route path="books" element={<ELibraryPage />} />

            <Route path="publish" element={<SubmitReportPage />} />
            <Route
              path="validate"
              element={
                <div className="flex flex-1 flex-col items-center justify-center bg-background p-4">
                  <div className="w-full max-w-3xl space-y-8">
                    <div className="space-y-2 text-center">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Report Validation
                      </h1>
                      <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                        Submit your final year report for professor review and
                        validation.
                      </p>
                    </div>
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
