const mongoose = require('mongoose')

const Schema = mongoose.Schema

const spaceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: false
     },
    openHour: {
        type: String,
        required: true
    },
    closingHour: {
        type: String,
        required: true
    },
    neighborhood: {
        type: String,
        required: false
    },
    officeCapacity: {
        type: Number,
        required: false
    },
    people_capacity: {
        type: Number,
        required: false
    },
    availability: {
        type: Boolean,
        required: false
    },
    deskDay: {
        type: Boolean,
        required: false
    },
    sharedDesk: {
        type: Number,
        required: false
    },
    meetingRooms: {
        type: Number,
        required: false
    },
    hours24Access: {
        type: Boolean,
        required: false
    },
    transitStationMiles: {
        type: Number,
        required: false
    },
    wellnessRoom: {
        type: Boolean,
        required: false
    },
    phoneBooths: {
        type: Number,
        required: false
    },
    eventSpace: {
        type: Boolean,
        required: false
    },
    bikeParking: {
        type: Boolean,
        required: false
    },
    petFriendly: {
        type: Boolean,
        required: false
    },
    snacksDrinksIncluded: {
        type: Boolean,
        required: false
    },
    teaCoffeeIncluded: {
        type: Boolean,
        required: false
    },
    pingPong: {
        type: Boolean,
        required: false
    },
    billiards: {
        type: Boolean,
        required: false
    },
    foosball: {
        type: Boolean,
        required: false
    },
    showers: {
        type: Boolean,
        required: false
    },
    onsiteGym: {
        type: Boolean,
        required: false
    },
    printersIncluded: {
        type: Boolean,
        required: false
    },
    bocceBall: {
        type: Boolean,
        required: false
    },
    napRoom: {
        type: Boolean,
        required: false
    },
    mainPhoto: {
        type: String,
        required: false
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Space', spaceSchema)