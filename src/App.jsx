import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

import Loading from './components/ui/Utilities/Loading.jsx';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
