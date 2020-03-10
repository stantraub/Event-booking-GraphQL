const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const app = express()

const Space = require('./models/space')

app.use(bodyParser.json())

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type Space {
            _id: ID
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
        type RootQuery {
            spaces: [Space!]!

        }

        type RootMutation {
            createSpace(spaceInput: SpaceInput): Space
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      spaces: () => {
       return Space.find()
        .then(spaces => {
          return spaces.map(space => {
            return { ...space._doc, _id: space.id}
          })
        })
        .catch(err => {
          console.log(err)
        })
      },
      createSpace: args => {
        const space = new Space({
          name: args.spaceInput.name,
          address: args.spaceInput.address,
          city: args.spaceInput.city,
          state: args.spaceInput.state,
          zipcode: args.spaceInput.zipcode,
          description: args.spaceInput.description,
          email: args.spaceInput.email,
          cost: +args.spaceInput.cost,
          phone: args.spaceInput.phone,
          website: args.spaceInput.website,
          openHour: args.spaceInput.openHour,
          closingHour: args.spaceInput.closingHour,
          neighborhood: args.spaceInput.neighborhood,
          officeCapacity: args.spaceInput.officeCapacity,
          peopleCapacity: args.spaceInput.peopleCapacity,
          availability: args.spaceInput.availability,
          deskDay: args.spaceInput.deskDay,
          sharedDesk: +args.spaceInput.sharedDesk,
          meetingRooms: +args.spaceInput.meetingRooms,
          hours24Access: args.spaceInput.hours24Access,
          transitStationMiles: args.spaceInput.transitStationMiles,
          wellnessRoom: args.spaceInput.wellnessRoom,
          phoneBooths: args.spaceInput.phoneBooths,
          eventSpace: args.spaceInput.eventSpace,
          bikeParking: args.spaceInput.bikeParking,
          petFriendly: args.spaceInput.petFriendly,
          snacksDrinksIncluded: args.spaceInput.snacksDrinksIncluded,
          teaCoffeeIncluded: args.spaceInput.teaCoffeeIncluded,
          pingPong: args.spaceInput.pingPong,
          billiards: args.spaceInput.billiards,
          foosball: args.spaceInput.foosball,
          showers: args.spaceInput.showers,
          onsiteGym: args.spaceInput.onsiteGym,
          printersIncluded: args.spaceInput.printersIncluded,
          bocceBall: args.spaceInput.bocceBall,
          napRoom: args.spaceInput.napRoom
        })
        return space
          .save()
          .then(result => {
            console.log(result)
            return {
              ...result._doc, _id: space._doc._id.toString()
          }})
          .catch(err => {
            console.log(err)
            throw err
          })
       
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-9taoe.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => 
    app.listen(3000)
    )
  .catch(err => console.log(err)
  );

