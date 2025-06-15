import { Outlet } from "components";
import { Garden, Grow } from "pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Navigate to="/garden" />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/grow" element={<Grow />} />
          <Route path="*" element={<Navigate to="/garden" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
