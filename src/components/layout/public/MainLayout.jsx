import { Link, Outlet } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

const MainLayout = () => {
  return (
    <div>
      <nav className="sticky top-0 z-50 bg-white shadow">
        <MainNavbar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <MainFooter />
      </footer>
    </div>
  );
};

export default MainLayout;
