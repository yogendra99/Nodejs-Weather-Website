const request = require('request')                                     //load request module


//GEOCODEING
//ADDRESS -> LAT/LONG -> WEATHER

const geocode = (address, callback) => {                                      //geocode callback function 

    //dynamically added addresses into the url
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places//' + address + '.json?access_token=pk.eyJ1IjoieW9nZW5kcmE5OSIsImEiOiJjbDJleDRnNmkwNTVtM2JuemljcnJsaGgyIn0.OENm5wKPauPmstD8zyRwXg&limit=1'

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('Unable to connect to location service', undefined)             //callback the func for network off
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search. Try another Location', undefined)  //cb the func for input wrong
        } else {
            callback(undefined, {                                                   //cb the func for correct input
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
