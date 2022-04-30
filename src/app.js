const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000                           //setting port value 

//Define path for express config
const pub_Dir = path.join(__dirname, '../publicc')            //(__dirname = curr dir name and +../public) is publicc   
const viewspath = path.join(__dirname, '../templetes/views')       //setting the path for dir accessing
const partial_path = path.join(__dirname, '../templetes/partials')       //path for partials 

//Setup handlebars engine and views location
app.set('view engine', 'hbs')                                 //view engine , hbd ---pending
app.set('views', viewspath)                                  //use viewpath as views & pending
hbs.registerPartials(partial_path)                           //use header partials file 

//Set up static directory to serve
app.use(express.static(pub_Dir))                             //pending & custimized the server i.e use it 
    

app.get('', (req, res) => {                                  //route handler to the index.hbs file
    res.render('index', {
        title: 'Weather Website',
        name: 'Yogendra Kumar'
    })
})
 
app.get('/about', (req, res) => {                             
    res.render('about', {
        title: 'About Me.',
        name: 'Yogendra Kumar'
    })
})

//MAIN QUERY WEATHER FUNCTION

app.get('/weather', (req, res) => {                          
    if(!req.query.address) {                                   //query using address
        return res.send({
            error: 'You must provide an address!'             //send error if no query on req
        })
    }

    //callback chaining & using query in geocode address
    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {  //using array destructring with empty defalut{}
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude,longitude ,(error, forecastdata) => {                //using forecast
            if(error) {
                return res.send ({
                    error: error
                })
            }

            res.send ({
                forecast: forecastdata,
                location : location,
                address : req.query.address
            })
        })

    })


    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})


app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query)                                                            //query info in the req.query [obj]
    res.send({
        product: []
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'This is some helpful text.',
        name : 'Yogendra Kumar'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {                                          //res.render(cont1, {cont2}) || cont1= rendering page i.e 404 here
        title:'404 ',
        name: 'Yogendra Kumar',
        errorMessage: 'Help Article Not found.'
    })
})

app.get('*', (req, res) => {                                     //for generic 404 i.e nothing matching the page
      res.render('404', {
          title:'404',
          name: 'Yogendra Kumar',
          errorMessage: 'Page Not Found'
      })

})



app.listen(port, () => {
    console.log('Everything is all right')
    console.log(`Server is up on port${port}.`)
})



