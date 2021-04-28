import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import bidding from './controllers/bidding.controller'

// Connection URL
const CONNECTION_URL = 'mongodb+srv://Test:password1234@roundup.1xnaq.mongodb.net/Roundup?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;
mongoose.Promise = global.Promise
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${CONNECTION_URL}`)
})

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`Server started on port: ${PORT}`)
})

bidding(server)