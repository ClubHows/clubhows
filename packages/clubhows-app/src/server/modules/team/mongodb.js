/*eslint-disable no-unused-vars*/
import slugify from 'slugify';
import uuidv5 from 'uuid/v5';
import mongoose from 'mongoose';
import NodeGeocoder from 'node-geocoder';

import mongodb from '../../../server/mongodb/connector';

import TeamSchema from './Team';
import log from '../../../common/log';

mongodb();

export default class Team {
  team(id) {
    return TeamSchema.getById(id);
  }

  teamByMember(id) {
    return TeamSchema.getByMember(id);
  }

  teamByLocation(locId) {
    return TeamSchema.getByLocation(locId);
  }

  teamBySlug(slug) {
    return TeamSchema.getBySlug(slug);
  }

  async teams(orderby, sortby) {
    return await TeamSchema.list()
      .sort(sortby)
      .exec((err, results) => {
        if (!err) {
          results.filter(sortby => {
            return results.sortby;
          });
        }
      });
  }

  async teamsPagination(limit, after) {
    return await TeamSchema.find()
      .select('name')
      .limit(limit)
      .skip(after)
      .sort({ name: 'asc' });
  }

  addTeam(args) {
    log(args);
    const slug = slugify(args.name, { lower: true });
    return TeamSchema.create({
      _id: uuidv5(slug, process.env.CLUBHOWS_APP_UUID),
      name: args.name,
      owner: args.owner,
      slug: slug
    });
  }

  async addLocation(args) {
    const location = await processLocation(args).catch(err => {
      log(err);
    });

    if (location) {
      const teamId = location._id;
      const loc = {
        name: args.name,
        addr1: args.addr1,
        addr2: args.addr2,
        city: args.city,
        state: args.state,
        zip: args.zip,
        country: args.country,
        coords: { lat: location.lat, lon: location.lon },
        phone: { name: args.name, number: args.number }
      };

      return TeamSchema.update(location.id, location.loc)
        .then(team => team)
        .catch(err => {
          log(err);
        });
    } else {
      log(location);
      return location;
    }
  }

  editTeam({ id, name, owner }) {
    const slug = slugify(name, { lower: true });
    return TeamSchema.save(id, { name: name, owner: owner, slug: slug });
  }

  async countLocations(id) {
    return TeamSchema.statics.get(id).then(team => team.locations.length);
  }
}

const processLocation = async args => {
  let teamLoc;
  log(args);
  const options = {
    provider: 'locationiq',
    httpAdapter: 'http',
    apiKey: process.env.LOCATION_IQ_KEY
  };
  const geocoder = NodeGeocoder(options);

  const data = await TeamSchema.findOne({ slug: args.slug }, '_id');
  const moreData = await geocoder.geocode({ address: args.addr1, country: args.country, zipcode: args.zip });

  return teamLoc(data, moreData);
};
