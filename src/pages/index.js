import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Parallax } from 'react-spring/renderprops-addons.cjs';

import Layout from '../components/LandingPage/Layout';
import ProjectCard from '../components/ProjectCard';
import { Title, BigTitle, SubTitle, Inner } from '../components/common';
import Hero from '../components/LandingPage/Hero';
import Projects from '../components/LandingPage/Projects';
import About from '../components/LandingPage/About';
import Contact from '../components/LandingPage/Contact';

import avatar from '../styles/images/avatar.jpg';

const ProjectsWrapper = styled.div`
  ${tw`flex flex-wrap justify-between mt-8`};
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 1200px) {
    grid-gap: 3rem;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-gap: 2rem;
  }
`;

const AboutHero = styled.div`
  ${tw`flex flex-col lg:flex-row items-center mt-8`};
`;

const Avatar = styled.img`
  ${tw`rounded-full w-32 xl:w-48 shadow-lg h-auto m-0`};
`;

const AboutSub = styled.span`
  ${tw`text-white pt-12 lg:pt-0 lg:pl-12 text-xl lg:text-2xl xl:text-3xl`};
`;

const AboutDesc = styled.p`
  ${tw`text-grey-light text-lg md:text-l lg:text-xl font-sans pt-10 md:pt-16 text-justify`};
`;

const ContactText = styled.p`
  ${tw`text-grey-light font-sans text-xl md:text-2xl lg:text-3xl`};
`;

const Footer = styled.footer`
  ${tw`text-center text-grey absolute pin-b p-6 font-sans text-md lg:text-lg`};
`;

export default () => (
  <>
    <Layout />
    <Parallax pages={5}>
      <Hero offset={0}>
        <BigTitle>
          Hello, <br /> I'm Chau Bao Long.
        </BigTitle>
        <SubTitle>who's having some fun in coding Mobile App, Web App, DevOps and Cloud Computing.</SubTitle>
      </Hero>
      <Projects offset={1}>
        <Title>Recent Projects</Title>
        <ProjectsWrapper>
          <ProjectCard
            title="Mapion Aruku"
            link="https://play.google.com/store/apps/details?id=com.mapion.android.arukuto"
            bg="linear-gradient(to right, #D4145A 0%, #FBB03B 100%)"
          >
            App with more than 100.000 users at the moment. Aim to encourages everybody to walk and live in a healthy ways.
            In some aspects, It can be considered as a game where people walk to achieve mission and get gifts return.
          </ProjectCard>
          <ProjectCard
            title="Globis Platform"
            link="https://www.globis.ac.jp/"
            bg="linear-gradient(to right, #662D8C 0%, #ED1E79 100%)"
          >
            Japan's No. 1 MBA, who want to turn their business into digital platform.
            I responsible for building up their online courses and online payment.
          </ProjectCard>
          <ProjectCard
            title="JCC Platform"
            link="https://fundinno.com/"
            bg="linear-gradient(to right, #009245 0%, #FCEE21 100%)"
          >
            Japan's first stock investment by crowdfunding, who possess the accumulative value of 1.8 bilion yen with more than 14.000 users.
            This platform act as a bridge that connect investor to start-up company, give them a help to control their business as well as financial forecast
            Beside it, there are specialist from us to give help to company that facilitate their business.
          </ProjectCard>
          <ProjectCard
            title="IoT D-Room"
            link="https://play.google.com/store/apps/details?id=jp.co.daiwaliving.iot.droom"
            bg="linear-gradient(to right, #D585FF 0%, #00FFEE 100%)"
          >
            Application to control all IoT devices in our house. It works like a remote to control house appliance through AWS IoT platform.
          </ProjectCard>
        </ProjectsWrapper>
      </Projects>
      <About offset={3}>
        <Title>More about me</Title>
        <AboutHero>
          <Avatar src={avatar} alt="Chau Bao Long" />
          <AboutSub>
            To me, programming is a way to make my life becomes meaningful. I've made up my mind to spend my bloom of youth do coding stuff, to gain more and more experiences day by day.
          </AboutSub>
        </AboutHero>
        <AboutDesc>
          •  4 years of hands-on experience in Mobile development including Android, React Native and Xamarin.<br />
          •  3 years of hands-on experience in Web development with Ruby On Rails.<br />
          •  2 years of hands-on experience in Web Frontend especially SPA with React and other latest trending technologies.<br />
          •  1 year of experience in DevOps using Ansible, Terraform, Docker, Kubernetes, Helm on the platform like AWS, GCP as well as on-premise servers.<br />
          •  Strong knowledge in design database and ERD diagram for large scale project.<br />
          •  Have good knowledge of design patterns and building project using clean architecture (Android, React).<br />
          •  Fast learning a new language and technique in a couple of days.<br />
          •  Proficient in Linux and daily use command line.<br />
          •  Expert in VIM.<br />
          •  Deep knowledge about networking, protocol at various network layer, firewall and security.<br />
          •  Ability to build CI/CD system and setup an entire staging environment.<br />
          •  Ability to fully build a small production environment with load balancing, auto scale and monitor system on AWS and on-premise fleet of servers.<br />
          •  Experience with serverless technology (AWS lambda, API gateway)<br />
        </AboutDesc>
      </About>
      <Contact offset={4}>
        <Inner>
          <Title>Get in touch</Title>
          <ContactText>
            Say <a href="mailto:chau.bao.long.vn@gmail.com">Hi</a> or find me on other platforms:{' '}
            <a href="https://www.instagram.com/topcancode" target="_blank">Instagram</a> &{' '}
            <a href="https://twitter.com/topcbl" target="_blank">Twitter</a>
          </ContactText>
        </Inner>
        <Footer>
          &copy; 2019 by topcbl.{' '}
          <a href="https://github.com/chau-bao-long/my-blog" target="_blank">Github Repository</a>. Thanks to{' '}
          <a href="https://www.gatsbyjs.org/" target="_blank">Gatsby</a>.
        </Footer>
      </Contact>
    </Parallax>
  </>
);
