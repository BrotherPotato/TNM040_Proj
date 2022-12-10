import './styles/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./pages/Layout.js"
import Home from './pages/Home.js'
import Search from './pages/Search.js'
import SelectedRoom from './pages/SelectedRoom.js'
import FloorSelection from './pages/FloorSelection.js'
import Map from './pages/Map.js'
import NavigationScreen from './pages/NavigationScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path='Search' element={<Search />} />
          <Route path='Search/:RoomCode' element={<SelectedRoom />} />
          <Route path='FloorSelection/:House' element={<FloorSelection />} />
          <Route path='Map/:House/:Floor' element={<Map />} />
          <Route path='NavigationScreen/:RoomCode' element={<NavigationScreen />} />  
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
