import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';

function Router() {
  return (
    <BrowserRouter basename="micro-react">
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        {/* redirect */}
        <Route path="*" element={<Navigate to="/HomePage" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
