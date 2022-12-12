import { motion } from "framer-motion";
import {useLocation, Outlet } from 'react-router-dom'
const PageLayout = ({ children }) => children;

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
  duration: 0.3
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  document.getElementById('svg-root').style.display = 'none';
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};

export default AnimationLayout;