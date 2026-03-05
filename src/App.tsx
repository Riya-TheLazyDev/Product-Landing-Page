import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts";
import Home from "./views/public";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
