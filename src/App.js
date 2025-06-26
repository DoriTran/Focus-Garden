import { Outlet, ApSnackbar } from "components";
import { SnackbarProvider } from "notistack";
import { Garden, Grow, Shop } from "pages";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={2500}
      Components={{
        coin: ApSnackbar,
        gem: ApSnackbar,
        okay: ApSnackbar,
        fail: ApSnackbar,
        info: ApSnackbar,
      }}
    >
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
    </SnackbarProvider>
  );
};

export default App;
