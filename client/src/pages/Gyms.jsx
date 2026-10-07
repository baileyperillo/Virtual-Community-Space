import React, { useState, useEffect } from 'react'
import './Gyms.css'
import Card from '../components/Card'


const Gyms = (props) => {

    const [gyms, setGyms] = useState([])

    useEffect(() => {
        setGyms(props.data)
    }, [props])

    return (
        <div className="Gyms">
            <main>
            {
                gyms && gyms.length > 0 ?
                gyms.map((gym, index) =>

                    <Card
                        key={gym.id}
                        id={gym.id}
                        image={gym.image}
                        name={gym.name}
                        pricePoint={gym.pricePoint}
                        location={gym.location}
                    />

                ) : <h3 className="noResults">{'No Gyms Yet 😞'}</h3>
            }
            </main>
        </div>
    )
}

export default Gyms