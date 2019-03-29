import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import tw from 'tailwind.macro';

const Container = styled.div`
  ${tw`flex flex-col items-center py-6 rounded-lg`};
  background: white;
  margin-bottom: 2rem;
  margin: 3rem 3rem 0 0;
`;

const Avatar = styled(Image)`
  ${tw`rounded-full h-10 w-10`};
  margin: 2rem;
`;

const Autobiography = styled.h3`
  ${tw`font-bold text-lg p-4`};
`;

const Divider = styled.div`
  ${tw`w-16 h-px`};
  margin: 1rem;
  background: ${p => p.theme.color.category};
`;

const MoreInfo = styled.p`
  margin: 0.5rem 3rem;
`;

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={(data) => {
        const { author, social } = data.site.siteMetadata;
        return (
          <Container>
            <Avatar fixed={data.avatar.childImageSharp.fixed} alt={author} />
            <Autobiography>Hi, I am Long. Call me Top!</Autobiography>
            <Divider />
            <MoreInfo>
              This following blogs has been written by
              {' '}
              <strong>{author}</strong>
              {' '}
              who lives and works in Da Nang city doing coding things.
              {' '}
              <a href={`https://twitter.com/${social.twitter}`}>
                You can follow me on Twitter
              </a>
            </MoreInfo>
          </Container>
        );
      }}
    />
  );
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 140, height: 140) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
        }
      }
    }
  }
`;

export default Bio;
