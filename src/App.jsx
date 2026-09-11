import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LiquidEnvironment from './components/LiquidEnvironment'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Results from './pages/Results'
import Challenge from './pages/Challenge'
import Portfolio from './pages/Portfolio'
import Opportunities from './pages/Opportunities'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div className="liquid-app">
      <LiquidEnvironment />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/results" element={<Results />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/opportunities" element={<Opportunities />} />
      </Routes>
    </div>
  )
}