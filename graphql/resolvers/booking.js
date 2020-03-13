const Booking = require('../../models/booking')
const Space = require('../../models/space')
const { transformSpace, transformBooking } = require('./merge')


module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find()
            return bookings.map(booking => {
                return transformBooking(booking)
            })
        } catch (err) {
            throw err
        }
    },
    bookSpace: async (args, req) => {
        if (!req.isAuth) {
          throw new Error("Unauthenticated");
        }

        const fetchedSpace = await Space.findOne({ _id: args.spaceId })
        const booking = new Booking({
            userId: req.user.id,
            space: fetchedSpace
        })
        const result = await booking.save()
        return transformBooking(result)
    },
    cancelBooking: async (args, req) => {
        if (!req.isAuth) {
          throw new Error("Unauthenticated");
        }

        try {
            const booking = await Booking.findById(args.bookingId).populate('space')
            const space = transformSpace(booking.space)
            await Booking.deleteOne({ _id: args.bookingId })
            return space
        } catch (error) {
            throw error
        }
    }
}