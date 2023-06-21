const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNumberValidators = [
  {
    // have length of 8 or more
    validator: (number) => {
      return number.length >= 8
    },
    message: 'phone number must have 8 digits or more',
  },
  {
    // be formed of two parts that are separated by -, the first part has two or three numbers
    // and the second part also consists of numbers
    validator: (number) => {
      return /^\d{2,3}-\d{5,}$/.test(number)
    },
    message: 'incorrect phone number format'
  }
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'person name required'],
  },
  number: {
    type: String,
    validate: phoneNumberValidators,
    required: [true, 'person phone number required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)