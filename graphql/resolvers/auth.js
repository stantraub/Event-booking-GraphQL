const bcrypt = require('bcryptjs')
const User = require('../../models/user')

module.exports = {
    spaces: async () => {
        try {
            const spaces = await Space.find()
            return spaces.map(space => {
                return transformSpace(space)
            })
        } catch (err) {
            throw (err)
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

        } catch (err) {
            throw err
        }
    }
}