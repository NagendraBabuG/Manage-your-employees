import { Link } from "react-router-dom"
const CardComponent = ({ props }) => {
    /*
    card contains
    title, bgc, content, link
    */

    return
    (<div className='card-container'>
    
        <div className='basic-info'>
            {item.name ? (
                <p className='title'>{item.name}</p>
            ) : (
                <p className='title'>{item.title}</p>
            )}

            {item.first_air_date ? (
                <p className='title'> {item.first_air_date.substring(0, 4)}</p>
            ) : (
                <p className='title'>{item.release_date.substring(0, 4)} </p>
            )}
        </div>
    </div>);

}