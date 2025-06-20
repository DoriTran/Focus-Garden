import { Outlet } from "components";
import { Garden, Grow, Shop } from "pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Navigate to="/grow" />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/grow" element={<Grow />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<Navigate to="/grow" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
