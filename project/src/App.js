import './styles/App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Layout from "./pages/Layout.js"
import Home from './pages/Home.js'
import Search from './pages/Search.js'
import SelectedRoom from './pages/SelectedRoom.js'
import FloorSelection from './pages/FloorSelection.js'
import Map from './pages/Map.js'
import NavigationScreen from './pages/NavigationScreen'
//import { motion } from "framer-motion";
/*
const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <Layout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </Layout>
  );
};
*/
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
