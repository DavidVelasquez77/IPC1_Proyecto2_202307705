
import logo from './usociallogo.png';
import { motion } from 'framer-motion';

export const UsocialLogo = () => (
  <motion.img 
    src={logo} 
    alt="Usocial Logo" 
    height="36" 
    width="36" 
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: 'spring', bounce: 0.6, duration: 2 }}
  />
);