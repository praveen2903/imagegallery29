  /* eslint-disable react/prop-types */
  import { Link } from "react-router-dom";
  import {motion} from 'framer-motion'

  function Image({ id, url, title }) {
    const slideDownVariant = {
      hidden: { y: "-100vh" },
      visible: { y: 0 },
    };
    return (
      <Link to={`/detailPage/${id}`}>
        <motion.div key={id} className="group relative hover:scale-110 ease-out duration-300">
          <div>
            <img src={url} alt={title} className="rounded-3xl" />
          </div>
          
          <motion.div variants={slideDownVariant} initial="hidden" animate="visible" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white text-center">
            <h3 className="text-2xl font-medium mb-2">{title}</h3>
          </motion.div>
        </motion.div>
      </Link>
    );
  }

  export default Image;
