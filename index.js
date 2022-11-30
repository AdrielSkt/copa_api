const express = require('express')
const bodyParser = require('body-parser')
const db = require('./src/utils/db')

const estadioRouter = require('./src/routes/estadios.route')

const port = 3000
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('copa-api is running')
})

// Estadio routes
app.use('/api/v1/estadios', estadioRouter)


app.use((error, req, res, next) => {
    console.log('ERRO', error) 
    res.status(500).json({errorMessage: error.message})
 })

app.listen(port, () => {
    console.log(`copa-api running on port ${port}`)
})