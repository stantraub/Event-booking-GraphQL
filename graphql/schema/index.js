const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type Booking {
    _id: ID!
    space: Space!
    user: User!
    createdAt: String!
    updatedAt: String!
}
type Space {
    _id: ID!
    creator: User!
    name: String!
    address: String!
    city: String!
    state: String!
    zipcode: Int!
    description: String!
    email: String!
    cost: Int!
    phone: String
    website: String
    openHour: String!
    closingHour: String!
    neighborhood: String
    officeCapacity: Int
    peopleCapacity: Int
    availability: Boolean
    deskDay: Boolean
    sharedDesk: Int
    meetingRooms: Int
    hours24Access: Boolean
    transitStationMiles: Float
    wellnessRoom: Boolean
    phoneBooths: Int
    eventSpace: Boolean
    bikeParking: Boolean
    petFriendly: Boolean
    snacksDrinksIncluded: Boolean
    teaCoffeeIncluded: Boolean
    pingPong: Boolean
    billiards: Boolean
    foosball: Boolean
    showers: Boolean
    onsiteGym: Boolean
    printersIncluded: Boolean
    bocceBall: Boolean
    napRoom: Boolean
}

type User {
    _id: ID!
    email: String!
    password: String
    createdSpaces: [Space!]
}

input SpaceInput {
    name: String!
    address: String!
    city: String!
    state: String!
    zipcode: Int!
    description: String!
    email: String!
    cost: Int!
    phone: String
    website: String
    openHour: String!
    closingHour: String!
    neighborhood: String
    officeCapacity: Int
    peopleCapacity: Int
    availability: Boolean
    deskDay: Boolean
    sharedDesk: Int
    meetingRooms: Int
    hours24Access: Boolean
    transitStationMiles: Float
    wellnessRoom: Boolean
    phoneBooths: Int
    eventSpace: Boolean
    bikeParking: Boolean
    petFriendly: Boolean
    snacksDrinksIncluded: Boolean
    teaCoffeeIncluded: Boolean
    pingPong: Boolean
    billiards: Boolean
    foosball: Boolean
    showers: Boolean
    onsiteGym: Boolean
    printersIncluded: Boolean
    bocceBall: Boolean
    napRoom: Boolean
}

input UserInput {
    email: String!
    password: String!
}

type RootQuery {
    spaces: [Space!]!
    bookings: [Booking!]!

}

type RootMutation {
    createSpace(spaceInput: SpaceInput): Space
    createUser(userInput: UserInput): User
    bookSpace(spaceId: ID): Booking!
    cancelBooking(bookingId: ID!): Space!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)