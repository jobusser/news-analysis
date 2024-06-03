import { FaGlobeAfrica, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas } from "react-icons/fa";

function GlobeIcon({ size }) {

  const icons = [FaGlobeAfrica, FaGlobeEurope, FaGlobeAsia, FaGlobeAmericas];
  const rand = Math.floor(Math.random() * icons.length);

  if (rand === 0) return (<FaGlobeAfrica size={size} />);
  if (rand === 1) return (<FaGlobeEurope size={size} />);
  if (rand === 2) return (<FaGlobeAsia size={size} />);
  if (rand === 3) return (<FaGlobeAmericas size={size} />);
}

export default GlobeIcon;
