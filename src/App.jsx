import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import PageLoader from './components/PageLoader';

// Lazy-loaded routes — each page becomes its own chunk, so the initial
// bundle only contains what's needed for the first paint.
const Home = lazy(() => import('./pages/Home/Home'));
const Portofolio = lazy(() => import('./pages/Portofolio/Portofolio'));
const Store = lazy(() => import('./pages/Store/Store'));
const Testimoni = lazy(() => import('./pages/Testimoni/Testimoni'));
const Progress = lazy(() => import('./pages/Progress/Progress'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/portofolio" element={<Portofolio />} />
            <Route path="/store" element={<Store />} />
            <Route path="/testimoni" element={<Testimoni />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/undefine" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}