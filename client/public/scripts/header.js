const header = document.querySelector('header')

// Create header container
const headerContainer = document.createElement('div')
headerContainer.className = 'header-container'

// Create left side of header
const headerLeft = document.createElement('div')
headerLeft.className = 'header-left'

// Create logo
const headerLogo = document.createElement('img')
headerLogo.src = '/logo.png'

// Create title
const headerTitle = document.createElement('h1')
headerTitle.textContent = 'Gym Locator'

// Add logo and title to left side
headerLeft.appendChild(headerLogo)
headerLeft.appendChild(headerTitle)

// Create right side of header
const headerRight = document.createElement('div')
headerRight.className = 'header-right'

// Create Home button
const headerButton = document.createElement('button')
headerButton.textContent = 'Home'

headerButton.addEventListener('click', function handleClick(event) {
  window.location = '/'
})

// Add button to right side
headerRight.appendChild(headerButton)

// Add left and right sides to header container
headerContainer.appendChild(headerLeft)
headerContainer.appendChild(headerRight)

// Add container to header
header.appendChild(headerContainer)