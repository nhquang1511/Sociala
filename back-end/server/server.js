import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

// Connection URL
mongoose.Promise = global.Promise
// mongoose.connect(config.mongoUri)
mongoose.connect('mongodb+srv://root:123abc@cluster0.8xz9x.mongodb.net/myfirt?retryWrites=true&w=majority&appName=Cluster0')

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})
