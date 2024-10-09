import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ATCTrainer from './components/ATCTrainer';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <nav className="bg-primary text-primary-foreground p-4">
          <ul className="flex space-x-4 justify-center">
            <li><Link to="/" className="hover:underline">Trainer</Link></li>
            <li><Link to="/profile" className="hover:underline">Profile</Link></li>
            <li><Link to="/leaderboard" className="hover:underline">Leaderboard</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ATCTrainer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;