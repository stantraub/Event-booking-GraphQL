const bcrypt = require('bcryptjs')
const Space = require('../../models/space')
const User = require('../../models/user')



const spaces = spaceIds => {
    return Space.find({ _id: { $in: spaceIds } })
        .then(spaces => {
            return spaces.map(space => {
                return { ...space._doc, _id: space.id, creator: user.bind(this, space.creator) }
            })
        })
        .catch(err => {
            console.log(err)
        })
}

const user = userId => {
    return User.findById(userId)
        .then(user => {
            return { ...user._doc, id: user.id, createdSpaces: spaces.bind(this, user._doc.createdSpaces) };
        })
        .catch(err => {
            throw err
        }
        )
}

module.exports = {
    spaces: () => {
        return Space.find()
            .then(spaces => {
                return spaces.map(space => {
                    return {
                        ...space._doc,
                        _id: space.id,
                        creator: user.bind(this, space._doc.creator)
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    createSpace: args => {
        const space = new Space({
            creator: "5e67d88861e2a560241aef03",
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
        return space
            .save()
            .then(result => {
                createdSpace = {
                    ...result._doc, _id: result._doc._id.toString(),
                    creator: user.bind(this, result._doc.creator)
                }
                return User.findById("5e67d88861e2a560241aef03")
            })
            .then(user => {
                if (!user) {
                    throw new Error("User not found.");
                }
                user.createdSpaces.push(space)
                return user.save()
            })
            .then(result => {
                return createdSpace
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    },
    createUser: args => {
        User.findOne({ email: args.userInput.email })
            .then(user => {
                if (user) {
                    throw new Error('User exists already.')
                }

                return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });
                return user.save()
            }
            )
            .then(result => {
                return { ...result._doc, password: null, _id: result.id }
            })
            .catch(err => {
                console.log(err)
            })
    }
}