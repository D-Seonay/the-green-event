import { motion } from 'framer-motion';

const Leaf = (props: React.SVGProps<SVGSVGElement>) => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 22s1.5-2 5-2 5 2 5 2-1.5-2-5-2-5 2-5 2z" />
    <path d="M2 16s1.5-2 5-2 5 2 5 2-1.5-2-5-2-5 2-5 2z" />
    <path d="M14 22V10c0-2.2-1.8-4-4-4s-4 1.8-4 4v12" />
  </motion.svg>
);

export default Leaf;
