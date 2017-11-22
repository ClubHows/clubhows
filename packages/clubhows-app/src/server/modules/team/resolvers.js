/*eslint-disable no-unused-vars*/
import mongoose from 'mongoose';
import Team from './mongodb';
import log from '../../../common/log';

import TeamSchema from './Team';

export default pubsub => ({
  Query: {
    teamById(obj, args, context) {
      return context.Team.team(args);
    },
    teamByMember(obj, args, context) {
      return context.Team.teamByMember(args);
    },
    teamByLocation(obj, args, context) {
      return context.Team.teamByLocation(args.locId);
    },
    teamBySlug(obj, args, context) {
      return context.Team.teamBySlug(args.slug);
    },
    async allTeams(obj, { orderBy, filter }, context) {
      return await context.Team.teams({ orderBy, filter });
    },
    async allTeamsPagination(obj, { limit, after }, context) {
      let edgesArray = [];
      let teams = await context.Team.teamsPagination(limit, after);

      teams.map(team => {
        edgesArray.push({
          cursor: team._id,
          node: {
            id: team._id,
            name: team.name,
            slug: team.slug
          }
        });
      });

      const endCursor = edgesArray.length > 0 ? edgesArray[edgesArray.length - 1].cursor : 0;

      const values = await Promise.all([context.Post.getTotal(), context.Post.getNextPageFlag(endCursor)]);

      return {
        totalCount: values[0].count,
        edges: edgesArray,
        pageInfo: {
          endCursor: endCursor,
          hasNextPage: values[1].count > 0
        }
      };
    },
    post(obj, { id }, context) {
      return context.Post.post(id);
    }
  },
  Mutation: {
    createTeam(_, args, context) {
      log(args);
      const { name, owner } = args.input;
      return context.Team.addTeam({ name: name, owner: owner });
    },
    removeTeam(_, args, context) {
      log(args);
      const { name, owner } = args.input;
      return context.Team.removeTeam({ name: name, owner: owner });
    },
    addLocation(_, args, context) {
      log(args);
      const { slug, name, owner } = args.input;
      return context.Team.addTeam({
        slug: args.slug,
        name: args.name,
        addr1: args.addr1,
        addr2: args.addr2,
        city: args.city,
        state: args.state,
        zip: args.zip,
        country: args.country,
        phone: args.phone
      });
    }
  },
  Subscription: {}
});
