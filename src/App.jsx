import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import toast, { Toaster } from 'react-hot-toast';
import Loading from './components/ui/Utilities/Loading.jsx';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
      <Toaster />
    </Suspense>
  );
}

export default App;
