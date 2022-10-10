import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Layout from '../pages/Layout';

function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
