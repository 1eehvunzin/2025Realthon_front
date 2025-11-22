import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetail from "./pages/CourseDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/courses/:courseId" element={<CourseDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
