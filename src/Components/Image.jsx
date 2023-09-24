/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

function Image({id,url,title}) {
  return (
    <Link to={`/detailPage/${id}`}>
        <div key={id}>
            <img src={url} alt={title} className="rounded-xl"/>
        </div>
    </Link>
  )
}

export default Image