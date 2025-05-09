import {Outlet} from 'react-router-dom';
import {ThemeProvider} from '@/components/theme-provider';

const ThemeWrapper = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-istic-theme">
      <Outlet />
    </ThemeProvider>
  );
};

export default ThemeWrapper;
