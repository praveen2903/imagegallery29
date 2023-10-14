/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Image({ id, url, title }) {
  return (
    <Link to={`/detailPage/${id}`}>
      <div key={id} className="group relative">
        <img src={url} alt={title} className="rounded-3xl" />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white text-center">
          <h3 className="text-2xl font-medium mb-2">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default Image;
