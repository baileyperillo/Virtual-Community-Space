const renderGyms = async () => {

  // Get gym data from server
  const response = await fetch('/gyms')
  const data = await response.json()

  // Get main content
  const mainContent = document.getElementById('main-content')

  if (data) {

    data.map(gym => {

      // Create card
      const card = document.createElement('div')
      card.classList.add('card')

      // Create top container
      const topContainer = document.createElement('div')
      topContainer.classList.add('top-container')

      // Create bottom container
      const bottomContainer = document.createElement('div')
      bottomContainer.classList.add('bottom-container')

      // Gym image
      topContainer.style.backgroundImage = `url(${gym.image})`

      // Gym name
      const name = document.createElement('h3')
      name.textContent = gym.name
      bottomContainer.appendChild(name)

      // Price
      const pricePoint = document.createElement('p')
      pricePoint.textContent = 'Price: ' + gym.pricePoint
      bottomContainer.appendChild(pricePoint)

      // Location
      const location = document.createElement('p')
      location.textContent = 'Location: ' + gym.location
      bottomContainer.appendChild(location)

      // Read More link
      const link = document.createElement('a')
      link.textContent = 'Read More >'
      link.href = `/gyms/${gym.id}`
      link.setAttribute('role', 'button')
      bottomContainer.appendChild(link)

      // Add containers to card
      card.appendChild(topContainer)
      card.appendChild(bottomContainer)

      // Add card to page
      mainContent.appendChild(card)
    })

  }
  else {
    const message = document.createElement('h2')
    message.textContent = 'No Gyms Available 😞'
    mainContent.appendChild(message)
  }
}

renderGyms()