const express = require('express')
const config = require('config')

const app = express()

const PORT = config.get('PORT')


const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()
