const authResolver = require('./auth')
const bookingResolver = require('./booking')
const spacesResolver = require('./spaces')

const rootResolver = {
    ...authResolver,
    ...spacesResolver,
    ...bookingResolver
}

module.exports = rootResolver;