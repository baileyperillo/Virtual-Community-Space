const renderGym = async () => {

    // Get the gym ID from the URL
    const requestedID = parseInt(window.location.href.split('/').pop())

    // Get gym data
    const response = await fetch('/gyms')
    const data = await response.json()

    // Get the gym content element
    const gymContent = document.getElementById('gym-content')

    let gym

    // Find the gym with the matching ID
    if (data) {
        gym = data.find(gym => gym.id === requestedID)
    }

    // Display gym information
    if (gym) {
        document.getElementById('image').src = gym.image
        document.getElementById('name').textContent = gym.name
        document.getElementById('pricePoint').textContent = 'Price: ' + gym.pricePoint
        document.getElementById('location').textContent = 'Location: ' + gym.location
        document.getElementById('classes').textContent = 'Classes: ' + gym.classes
        document.getElementById('description').textContent = gym.description

        document.title = `Gym - ${gym.name}`
            // Get events for this gym
        const eventsResponse = await fetch(`/gyms/${requestedID}/events`)
        const events = await eventsResponse.json()

        // Get events container
        const eventsContainer = document.getElementById('events-container')

        // Display events
        if (events.length > 0) {

            events.forEach(event => {

                // Create event card
                const eventCard = document.createElement('div')
                eventCard.classList.add('event-card')

                // Event name
                const eventName = document.createElement('h3')
                eventName.textContent = event.name

                // Event description
                const eventDescription = document.createElement('p')
                eventDescription.textContent = event.description

                // Event date
                const eventDate = document.createElement('p')
                eventDate.textContent = 'Date: ' + event.date

                // Event time
                const eventTime = document.createElement('p')
                eventTime.textContent = 'Time: ' + event.time

                // Add event information to card
                eventCard.appendChild(eventName)
                eventCard.appendChild(eventDescription)
                eventCard.appendChild(eventDate)
                eventCard.appendChild(eventTime)

                // Add event card to page
                eventsContainer.appendChild(eventCard)
            })

        }
        else {
            const message = document.createElement('p')
            message.textContent = 'No events scheduled for this gym.'
            eventsContainer.appendChild(message)
        }
    }
    else {
        const message = document.createElement('h2')
        message.textContent = 'No Gym Available 😞'
        gymContent.appendChild(message)
    }
}

renderGym()