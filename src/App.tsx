import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WeatherApp from './components/WeatherApp';
import StudentList from './components/StudentList';
import StudentDetail from './components/StudentDetail';
import NewsApp from './components/NewsApp';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Weather App</Link>
          <Link to="/students">Student List</Link>
          <Link to="/news">News App</Link>
        </nav>
        <Routes>
          <Route path="/" element={<WeatherApp />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:id" element={<StudentDetail />} />
          <Route path="/news" element={<NewsApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;