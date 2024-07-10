// Get references to HTML elements
const header = document.querySelector('h1')
const app = document.getElementById('app')
const ddMenu = document.querySelector('#ddMenu')
const sandwitch = document.querySelectorAll('svg')
const html = document.documentElement
// Toggle between dark and light themes
const toggle = () => html.classList.toggle('dark')
// Set the current view and render the corresponding content
const setView = (v) => {
    header.innerText = v
    toggleMenu(true)// Hide the dropdown menu

    if (v === 'Calculator') {
        renderCalculator()
    } else if (v === 'About') {
        renderAbout()
    } else if (v === 'Contact') {
        renderContact()
    }
}
// Toggle the visibility of the dropdown menu
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}
// Add a row of buttons to the calculator container
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`
    container.insertAdjacentHTML('beforeend', row)
}
// Add the monitor display to the calculator container
const addMonitor = (container, text) => {
    const t = text ?? ''
    const monitor = `<div id='monitor' class="bg-white border-4 border-pink-400 h-20 flex items-center col-span-5 text-pink-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`
    container.insertAdjacentHTML('beforeend', monitor)
}
// Create a button with the given text
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : ''
    return `<div class='bg-pink-400 hover:bg-pink-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`
}
// Add buttons to the calculator container
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('')
    addRow(container, btnHTML)
}
// Handle button clicks in the calculator
const click = (event) => {
    const monitor = document.getElementById('monitor')
    const bac = monitor.innerText.trim()
    const a = event.target.innerText
    console.log(a)
    if (a === 'clear') {
        monitor.innerText = ''
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac)
    } else {
        monitor.innerText += a
    }
}
// Render the calculator view
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear']
    app.innerHTML = ''
    addMonitor(app)
    addButtons(app, labels)
    const buttons = document.querySelectorAll('.d-btn')
    buttons.forEach((el) => el.addEventListener('click', click))
}
// Render the About view
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>'
}
// Render the Contact view
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>'
}
// Render the dropdown menu
const renderMenu = () => {
    const menu = `
    <div id="ddMenu" class="hidden absolute bg-white shadow-md rounded-md mt-2">
        <div class="py-2 px-4 cursor-pointer hover:bg-gray-200" onclick="setView('Calculator')">Calculator</div>
        <div class="py-2 px-4 cursor-pointer hover:bg-gray-200" onclick="setView('About')">About</div>
        <div class="py-2 px-4 cursor-pointer hover:bg-gray-200" onclick="setView('Contact')">Contact</div>
    </div>
    <div class="cursor-pointer" onclick="toggleMenu(false)">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
        <svg class="h-6 w-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </div>
`
document.body.insertAdjacentHTML('afterbegin', menu)
}
// Render the theme toggle button
const renderThemeToggle = () => {
    const themeToggle = `
    <div class="absolute top-0 right-0 m-4">
        <button onclick="toggle()" class="bg-gray-200 text-gray-800 py-2 px-4 rounded-md">Toggle Theme</button>
    </div>
`
document.body.insertAdjacentHTML('afterbegin', themeToggle)
}

renderMenu()
renderThemeToggle()
renderCalculator()
