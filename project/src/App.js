import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.js'
import Search from './pages/Search.js'
import SelectedRoom from './pages/SelectedRoom.js'
import FloorSelection from './pages/FloorSelection.js'
import FloorSelection from './pages/Map.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='Search' element={<Search />} />
          <Route path='Search/:RoomCode' element={<SelectedRoom />} />
          <Route path='FloorSelection/:House' element={<FloorSelection />} />
          <Route path='Map/:House/:Floor' element={<FloorSelection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
