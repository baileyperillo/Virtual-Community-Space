import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = (props) => { 
    
    const [gym, setGym] = useState({
        id: 0,
        name: "",
        pricePoint: "",
        location: "",
        image: ""
    })

    useEffect(() => {
        setGym({
            id: props.id,
            name: props.name,
            pricePoint: props.pricePoint,
            location: props.location,
            image: props.image
        })
    }, [props])

    return (
        <div className="card">

            <div
                className="top-container"
                style={{ backgroundImage: `url(${gym.image})` }}
            >
            </div>

            <div className="bottom-container">

                <h3>{gym.name}</h3>
                <p>{'Price: ' + gym.pricePoint}</p>
                <p>{'Location: ' + gym.location}</p>
                <Link to={'/gyms/' + gym.id}>
                    Read More →
                </Link>

            </div>

        </div>
    )
}

export default Card