const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookingSchema = new Schema({
    space: {
        type: Schema.Types.ObjectId,
        ref: 'Space'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, 
{ timestamps: true}
)

module.exports = mongoose.model('Booking', bookingSchema)