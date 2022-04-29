const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=496eba413e8d009aa8a7738afc2c8aa0&query=' + latitude + ',' + longitude + '&units=f' 

    request ({url: url, json: true}, (error, response) => {            //automatically convert string url data into obj           
     if(error) {
         callback('Unable to connect to weather service!' , undefined)                //for os level error
     } else if (response.body.error) {
         callback('Unable to find location', undefined)                       //network connected but not able find the location
     } else {
      callback(undefined , response.body.current.weather_descriptions[0] + '. It is currently '+ response.body.current.temperature + ' degress/Fahrenheit out. It Feels Like ' + response.body.current.feelslike + ' degree/fahrenheit out')
     }  
    })                                                                     
}

module.exports = forecast