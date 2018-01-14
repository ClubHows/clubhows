/*eslint-disable no-unused-vars*/
import mongoose from 'mongoose';
import Team from './mongodb';
import log from '../../../common/log';

import TeamSchema from './Team';

async function getTeamMembers(obj, context) {
  obj.map(async member => {
    log('team reso 10: ', member);
    const members = await context.User.getUser(member.user);
    await log('team reso 12: ', members);
    return members;
  });
}

async function addTeamMembers(obj, context) {
  obj.map(async member => {
    log('team reso 10: ', member);
    const members = await context.User.getUser(member.user);
    await log('team reso 12: ', members);
    return members;
  });
}

export default pubsub => ({
  Query: {
    teamById(obj, args, context) {
      return context.Team.team(args);
    },
    teamByMember(obj, args, context) {
      return context.Team.teamByMember(args);
    },
    async currentTeam(obj, args, context) {
      log('team reso 26: ', context.user);
      if (context.user) {
        let membersArray = [];
        let currentTeam = await context.Team.teamByMember(context.user._id);
        await log('team reso 30: ', currentTeam[0]);
        let teamMembers = await getTeamMembers(currentTeam[0].members, context);
        log('team reso 32: ', await teamMembers);

        await log('team reso 34: ', teamMembers);
        return currentTeam[0];
      }
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
    }
  },
  Team: {
    members({ ids }, args, context) {
      return context.loaders.getMembersForTeam.load(ids);
    }
  },
  Mutation: {
    addTeam(_, args, context) {
      log(args);
      const { name, owner } = args.input;
      if (context.user) {
        const owner = {
          user: context.user._id,
          role: owner,
          location: []
        };
        return context.Team.addTeam({ name: name, owner: owner });
      } else {
        return 'Not logged In';
      }
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
