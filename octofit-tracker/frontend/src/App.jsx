import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

function Home() {
  return (
    <section className="row g-4">
      <div className="col-lg-8">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body p-4">
            <p className="text-uppercase fw-semibold text-primary mb-2">React 19 presentation tier</p>
            <h2 className="h4 fw-bold mb-3">Browse the OctoFit tracker data</h2>
            <p className="text-muted mb-0">
              This dashboard connects to the Express API for activities, leaderboard entries, teams,
              users, and workouts. The base URL is resolved from Vite environment variables with a
              safe local fallback.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body p-4">
            <h3 className="h6 fw-semibold mb-3">Quick links</h3>
            <div className="d-grid gap-2">
              <NavLink className="btn btn-outline-primary" to="/activities">
                Activities
              </NavLink>
              <NavLink className="btn btn-outline-primary" to="/leaderboard">
                Leaderboard
              </NavLink>
              <NavLink className="btn btn-outline-primary" to="/teams">
                Teams
              </NavLink>
              <NavLink className="btn btn-outline-primary" to="/users">
                Users
              </NavLink>
              <NavLink className="btn btn-outline-primary" to="/workouts">
                Workouts
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            OctoFit Tracker
          </NavLink>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/activities">
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/leaderboard">
                Leaderboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/teams">
                Teams
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/users">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`} to="/workouts">
                Workouts
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container py-4">
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <p className="text-uppercase fw-semibold text-primary mb-2">Presentation tier</p>
            <h1 className="display-6 fw-bold mb-2">React 19 dashboard for OctoFit</h1>
            <p className="text-muted mb-0">
              Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> to target the
              GitHub Codespaces API URL automatically. Without it, the app falls back to
              <strong> http://localhost:8000</strong>.
            </p>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
