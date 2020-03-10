const bcrypt = require('bcryptjs')
const Space = require('../../models/space')
const User = require('../../models/user')
const Booking = require('../../models/booking')


const spaces = async spaceIds => {
    try {
        const spaces = await Space.find({ _id: { $in: spaceIds } })
        return spaces.map(space => {
            return { 
                ...space._doc, 
                _id: space.id, 
                creator: user.bind(this, space.creator) 
            }
        })
    } catch (err) {
        throw err
    }
}

const singleSpace = async spaceId => {
    try {
        const space = await Space.findById(spaceId)
        return {
            ...space._doc,
            _id: space.id, 
            creator: user.bind(this, space.creator)
        }
    } catch (error) {
        throw error
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return { 
            ...user._doc, 
            id: user.id, 
            createdSpaces: spaces.bind(this, user._doc.createdSpaces) };
        }
    catch (err) {
        throw err
    }
}

module.exports = {
    spaces: async () => {
        try {
            const spaces = await Space.find()
            return spaces.map(space => {
                return {
                    ...space._doc,
                    _id: space.id,
                    creator: user.bind(this, space._doc.creator)
                }
            })
        } catch(err) {
            throw(err)
        }
    },
    bookings: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    _id: booking.id, 
                    user: user.bind(this, booking._doc.user),
                    space: singleSpace.bind(this, booking._doc.space),
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString()
                }
            })
        } catch (err) {
            throw err
        }
    },
    createSpace: async args => {
        const space = new Space({
            creator: "5e6803cc8bcd7a760a001944",
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
        let createdSpace;
        try {
            const result = await space.save()
            createdSpace = {
                ...result._doc, _id: result._doc._id.toString(),
                creator: user.bind(this, result._doc.creator)
            }
            const creator = await User.findById("5e6803cc8bcd7a760a001944")
            if (!creator) {
                throw new Error("User not found.");
            }
            creator.createdSpaces.push(space)
            await creator.save()
            return createdSpace
        }  catch(err) {
            throw err
        }
    },
    createUser: async args => {
        try {
            const exisitingUser = await User.findOne({ email: args.userInput.email })
            if (exisitingUser) {
                throw new Error('User exists already.')
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user.save()

            return { ...result._doc, password: null, _id: result.id }

        } catch(err) {
            throw err
        }   
    },
    bookSpace: async args => {
        const fetchedSpace = await Space.findOne({_id: args.spaceId})
        const booking = new Booking({
            userId: "5e6803cc8bcd7a760a001944",
            space: fetchedSpace
        })
        const result = await booking.save()
        return {
            ...result._doc,
            _id: result.id,
            user: user.bind(this, booking._doc.user),
            space: singleSpace.bind(this, booking._doc.space),
            createdAt: new Date(result._doc.createdAt).toISOString(),
            updatedAt: new Date(result._doc.updatedAt).toISOString()
        }
    }
}