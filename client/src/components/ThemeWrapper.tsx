import {Outlet} from 'react-router-dom';
import {ThemeProvider} from '@/components/theme-provider';

const ThemeWrapper = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-istic-theme">
      <Outlet />
    </ThemeProvider>
  );
};

export default ThemeWrapper;
