const Space = require('../../models/space')
const User = require('../../models/user')
const { dateToString } = require('../../helpers/date')

const spaces = async spaceIds => {
    try {
        const spaces = await Space.find({ _id: { $in: spaceIds } })
        return spaces.map(space => {
            return transformSpace(space)
        })
    } catch (err) {
        throw err
    }
}

const singleSpace = async spaceId => {
    try {
        const space = await Space.findById(spaceId)
        return transformSpace(space)
    } catch (error) {
        throw error
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id: user.id,
            createdSpaces: spaces.bind(this, user._doc.createdSpaces)
        };
    }
    catch (err) {
        throw err
    }
}

const transformSpace = space => {
    return {
        ...space._doc,
        _id: space.id,
        creator: user.bind(this, space.creator)
    }
}

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        space: singleSpace.bind(this, booking._doc.space),
        createdAt: dateToString(booking._doc.createdAt),
        updatedAt: dateToString(booking._doc.updatedAt)
    }
}
exports.transformSpace = transformSpace
exports.transformBooking = transformBooking
