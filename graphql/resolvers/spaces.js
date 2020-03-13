const Space = require('../../models/space')
const User = require('../../models/user')
const { transformSpace } = require('./merge')
const aws = require("aws-sdk")
require("dotenv").config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});
const s3Bucket = process.env.S3_BUCKET

module.exports = {

  signS3: async (parent, { filename, filetype }) => {
    // AWS_ACCESS_KEY_ID
    // AWS_SECRET_ACCESS_KEY
    const s3 = new aws.S3({
      signatureVersion: "v4",
      region: "us-west-1"
    });

    const s3Params = {
      Bucket: s3Bucket,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: "public-read"
    };

    const signedRequest = await s3.getSignedUrl("putObject", s3Params);
    const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

    return {
      signedRequest,
      url
    };
  },
  spaces: async (args, req) => {
    try {
      const spaces = await Space.find();
      return spaces.map(space => {
        return transformSpace(space);
      });
    } catch (err) {
      throw err;
    }
  },
  createSpace: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const space = new Space({
      creator: "5e6a6402faab69dd8eacf979",
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
      napRoom: args.spaceInput.napRoom,
      mainPhoto: args.spaceInput.mainPhoto
    });
    let createdSpace;
    try {
      const result = await space.save();
      createdSpace = transformSpace(result);
      const creator = await User.findById("5e6a6402faab69dd8eacf979");
      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdSpaces.push(space);
      await creator.save();
      return createdSpace;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};