import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import EventCard from '../components/EventCard.jsx'
import './GymDetails.css'

const GymDetails = () => {

    const { gymId } = useParams()

    const [gym, setGym] = useState({
        id: 0,
        name: "",
        pricePoint: "",
        image: "",
        description: "",
        classes: "",
        location: ""
    })

    const [events, setEvents] = useState([])

    useEffect(() => {

        const getGymData = async () => {

            // Get all gyms
            const response = await fetch('/gyms')
            const data = await response.json()

            // Find the selected gym
            const selectedGym = data.find(
                gym => gym.id === parseInt(gymId)
            )

            if (selectedGym) {
                setGym(selectedGym)
            }

            // Get events for selected gym
            const eventsResponse = await fetch(`/gyms/${gymId}/events`)
            const eventsData = await eventsResponse.json()

            setEvents(eventsData)
        }

        getGymData()

    }, [gymId])

    return (
        <div className="GymDetails">

            <header className="header-container">

                <div className="header-left">
                    <img src="/logo.png" alt="Gym Locator logo" />
                    <h1>Gym Locator</h1>
                </div>

                <div className="header-right">
                    <Link to="/">Home</Link>
                </div>

            </header>

            <main id="gym-content" className="gym-info">

                <div className="image-container">
                    <img
                        id="image"
                        src={gym.image}
                        alt={gym.name}
                    />
                </div>

                <div className="gym-details">

                    <h2 id="name">
                        {gym.name}
                    </h2>

                    <p id="pricePoint">
                        {'Price: ' + gym.pricePoint}
                    </p>

                    <p id="location">
                        {'Location: ' + gym.location}
                    </p>

                    <p id="classes">
                        {'Classes: ' + gym.classes}
                    </p>

                    <p id="description">
                        {gym.description}
                    </p>

                    <section className="events-section">

                        <h2>Events at this Gym</h2>

                        {events.length > 0 ? (

                            events.map(event => (
                                <EventCard
                                    key={event.id}
                                    name={event.name}
                                    description={event.description}
                                    date={event.date}
                                    time={event.time}
                                />
                            ))

                        ) : (

                            <p>No events scheduled for this gym.</p>

                        )}

                    </section>

                </div>

            </main>

        </div>
    )
}

export default GymDetails