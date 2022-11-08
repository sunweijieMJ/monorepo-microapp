import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../pages/Layout';
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
