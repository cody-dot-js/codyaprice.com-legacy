import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import {
  FaDribbble,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMedium,
  FaRss,
  FaTwitter,
} from 'react-icons/fa';
import Link from './Link';
import VisuallyHidden from './VisuallyHidden';
import { IconType } from 'react-icons/lib/cjs';

export enum Social {
  dribbble = 'dribble',
  facebook = 'facebook',
  github = 'github',
  instagram = 'instagram',
  linkedin = 'linkedin',
  medium = 'medium',
  rss = 'rss',
  twitter = 'twitter',
}

const iconMap: Record<string, IconType> = {
  dribbble: FaDribbble,
  facebook: FaFacebook,
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  medium: FaMedium,
  rss: FaRss,
  twitter: FaTwitter,
};

interface IconProps {
  id: Social;
}

function Icon({ id, ...otherProps }: IconProps) {
  const Icon: IconType = iconMap[id];

  return <Icon {...otherProps} />;
}

type SocialMetadata = {
  id: Social;
  user?: string;
  url: string;
};

interface Props {
  otherLinks?: Array<SocialMetadata>;
}

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-flow: row wrap;
`;

function Socials({ otherLinks = [] }: Props) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          socials {
            id
            url
          }
        }
      }
    }
  `);

  const {
    socials,
  }: { socials: Array<SocialMetadata> } = data.site.siteMetadata;

  const allLinks = socials.concat(otherLinks);

  return (
    <div css={style}>
      {allLinks.map(({ id, url }) => {
        return (
          <Link
            key={id}
            to={url}
            aria-label={`Link to ${id}`}
            css={css`
              text-decoration: none;
              font-size: 2rem;
              padding: 1rem;
              color: white;
              display: block;
              :hover {
                color: #a44fb6;
              }
            `}
          >
            <Icon
              id={id}
              css={css`
                vertical-align: middle;
              `}
            />
            <VisuallyHidden id={`icon_${id}`}>Icon for {id}</VisuallyHidden>
          </Link>
        );
      })}
    </div>
  );
}

export default Socials;
