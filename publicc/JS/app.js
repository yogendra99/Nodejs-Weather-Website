

// fetch('http://puzzle.mead.io/puzzle').then((response) => {               //fetch pura baki hai
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherform = document.querySelector('form')                             //pending
const search = document.querySelector('input')
const message_one = document.querySelector('#message-1')
const message_two = document.querySelector('#message-2')



//message_one.textContent = ''

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message_one.textContent = 'Loading...'
    message_two.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_one.textContent = data.error
            } else {
                message_one.textContent = data.location
                message_two.textContent = data.forecast
            }
        })
    })

})