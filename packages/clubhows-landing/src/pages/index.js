/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import Link from 'gatsby-link';
import { css } from 'emotion';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import { Group, Flag, Magic, Catalog } from 'grommet-icons';

import { queries } from '../utils/mediaQueries';
import colors from '../utils/colors';
import IntroBackground from '../assets/images/ClubHows-intro-graphic.png';
import IntroBackgroundMobile from '../assets/images/ClubHows-intro-graphic-mobile.png';

const introBox = css`
  background-image: url('${IntroBackgroundMobile}');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  padding: 0 0 11rem 0;

  ${queries.medium`
    background-image: url('${IntroBackground}');
    padding: 1rem 0 4rem 12rem;
  `};

  ${queries.large`
    background-image: url('${IntroBackground}');
    padding: 2rem 0 6rem 13rem;
  `};

  ${queries.xLarge`
    background-image: url('${IntroBackground}');
    padding: 3rem 0 6rem 16rem;
  `};
`;

const introContent = css`
  margin: 1rem 1.5rem 1rem 1.5rem;
  padding: 0rem 0rem 2rem 0rem;

  ${queries.medium`
    margin: 0 1.5rem 0 4rem;
    padding: 1rem 1rem 2rem 1rem;
  `};

  ${queries.large`
    margin: 1rem 2rem 1rem 6rem;
  `};

  ${queries.xLarge`
    margin: 1rem 2rem 1rem 16rem;
  `};
`;

const introTitle = css`
  color: ${colors.light};
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 0rem;

  ${queries.medium`
    text-align: right;
  `};

  ${queries.large`
    text-align: right;
    margin-left: 4rem;
  `};

  ${queries.xLarge`
    text-align: right;
    margin-left: 4rem;
  `};
`;

const introSubtitle = css`
  color: ${colors.gray9};
  text-align: center;
  font-weight: 600;

  ${queries.medium`
    text-align: right;
  `};

  ${queries.large`
    text-align: right;
  `};

  ${queries.xLarge`
    text-align: right;
  `};
`;

const introButton = css`
  color: ${colors.gray1};
  padding: 0.5rem 1rem;
  background-color: ${colors.blue2};
  opacity: 0.7;
  font-weight: 400;
  font-size: 1.2em;
  margin: 0 auto;

  ${queries.medium`
    margin: 0 0 0 auto;
  `};

  ${queries.large`
    margin: 0 0 0 auto;
  `};

  ${queries.xLarge`
    margin: 0 0 0 auto;
  `};
`;

export default () => (
  <div>
    <Box bg={colors.primary} className={introBox} pad={{ between: 'none' }}>
      <Box
        align="center"
        wrap
        className={introContent}
        justify="end"
        alignContent="end"
        pad={{ between: 'none' }}
      >
        <h1 className={introTitle}>
          ClubHows simplifies the complex details between people and spaces
        </h1>
        <h3 className={introSubtitle}>
          Easily create and share documentation of the <em>hows, wheres </em>
          and <em>whats</em> of a space
        </h3>
        <Link to="/how-it-works" className={introButton}>
          Learn How It Works
        </Link>
      </Box>
    </Box>
    <Box flex direction="row" justify="between" wrap>
      <Box
        flex
        direction="row"
        justify="between"
        align="start"
        pad="medium"
        margin={{ horizontal: 'none', vertical: 'medium' }}
      >
        <Box pad="small" margin="small" textAlign="center" width="50%">
          <Group
            type="logo"
            size="large"
            colorIndex="warning"
            style={{ margin: '0 auto' }}
          />
          <Heading tag="h3" pad="none" margin="small">
            For The People
          </Heading>
          <Paragraph pad="none" margin="none">
            We all get tired of asking or being asked &ldquo;Where is
            <em> this</em> at?&rdquo; or &ldquo;How do I do <em>that</em>?&rdquo;
            Put those basics into easily accessible formats and empower your
            people to get back to focusing on the important things.
          </Paragraph>
        </Box>
        <Box pad="small" margin="small" textAlign="center" width="50%">
          <Flag
            type="logo"
            size="large"
            colorIndex="critical"
            style={{ margin: '0 auto' }}
          />
          <Heading tag="h3" pad="none" margin="small">
            Conquer Documentation
          </Heading>
          <Paragraph pad="none" margin="none">
            The art of documentation is challenging both in creation and
            digestion. ClubHows breaks the process up into smaller, more natural
            segments that makes the task feasible and manageable.
          </Paragraph>
        </Box>
      </Box>
      <Box
        flex
        direction="row"
        justify="between"
        align="start"
        pad="medium"
        margin={{ horizontal: 'none', vertical: 'medium' }}
      >
        <Box pad="small" margin="small" textAlign="center" width="50%">
          <Magic
            type="logo"
            size="large"
            colorIndex="accent-2"
            style={{ margin: '0 auto' }}
          />
          <Heading tag="h3" pad="none" margin="small">
            Complexity Made Simple
          </Heading>
          <Paragraph pad="none" margin="none">
            The trick to documentation is being able to access and recieve the
            information in a manner contextually relevant to the current needs.
            Create and find your documentation in context to people, place and
            situation.
          </Paragraph>
        </Box>
        <Box pad="small" margin="small" textAlign="center" width="50%">
          <Catalog
            type="logo"
            size="large"
            colorIndex="light-1"
            style={{ margin: '0 auto', fill: '#c67554' }}
          />
          <Heading tag="h3" pad="none" margin="small">
            It&apos;s Your Data
          </Heading>
          <Paragraph pad="none" margin="none">
            Export your data as desired into a multitude of data formats such as
            MS Word or Excel, JSON, XML or even as full web-ready or print-ready
            operations manuals.
          </Paragraph>
        </Box>
      </Box>
    </Box>
  </div>
);
