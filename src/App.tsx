import './styles/main.css';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import routes from '~react-pages'
import { Suspense } from 'react'
import { Home } from './components/Home/Home';
import { Game } from './pages/Game/Game';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nlw-esports-frontend/" element={<Home />} />
        <Route path="/nlw-esports-frontend/game/:gameName" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
