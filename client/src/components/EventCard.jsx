import React from 'react'
import './EventCard.css'

const EventCard = (props) => {

    return (
        <div className="event-card">

            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <p>{'Date: ' + props.date.split('T')[0]}</p><p>{'Date: ' + props.date}</p>
            <p>{'Time: ' + props.time}</p>

        </div>
    )
}

export default EventCard