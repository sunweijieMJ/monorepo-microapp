import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layout/index';
import Login from '../pages/Login';

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
