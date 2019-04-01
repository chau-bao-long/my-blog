import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Parallax } from 'react-spring/renderprops-addons.cjs';

import Layout from '../components/LandingPage/Layout';
import ProjectCard from '../components/LandingPage/ProjectCard';
import { Title, BigTitle, SubTitle, Inner } from '../components/common';
import Hero from '../components/LandingPage/Hero';
import Projects from '../components/LandingPage/Projects';
import About from '../components/LandingPage/About';
import Contact from '../components/LandingPage/Contact';
import ViewBlogButton from '../components/LandingPage/ViewBlogButton';
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

const AboutDesc = styled.span`
  ${tw`block text-grey-light text-sm md:text-sm lg:text-xl font-sans pt-10 md:pt-16 text-justify leading-loose mt-10 px-12`};
`;

const DescLine = styled.p`
  ${tw`mt-4`};
  opacity: 0.8;
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
    <Parallax pages={6}>
      <Hero offset={0}>
        <BigTitle>
          Hello, <br /> I'm Chau Bao Long.
        </BigTitle>
        <SubTitle>who's having some fun in coding Mobile App, Web App, DevOps and Cloud Computing.</SubTitle>
        <ViewBlogButton />
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
      <About offset={3.8}>
        <Title>More about me</Title>
        <AboutHero>
          <Avatar src={avatar} alt="Chau Bao Long" />
          <AboutSub>
            To me, programming is a way to make my life becomes meaningful. I've made up my mind to spend my bloom of youth do coding stuff, to gain more and more experiences day by day.
          </AboutSub>
        </AboutHero>
        <AboutDesc>
          <DescLine>•  4 years of hands-on experience in Mobile development including Android, React Native and Xamarin.</DescLine>
          <DescLine>•  3 years of hands-on experience in Web development with Ruby On Rails.</DescLine>
          <DescLine>•  2 years of hands-on experience in Web Frontend especially SPA with React and other latest trending technologies.</DescLine>
          <DescLine>•  1 year of experience in DevOps using Ansible, Terraform, Docker, Kubernetes, Helm on the platform like AWS, GCP as well as on-premise servers.</DescLine>
          <DescLine>•  Strong knowledge in design database and ERD diagram for large scale project.</DescLine>
          <DescLine>•  Have good knowledge of design patterns and building project using clean architecture (Android, React).</DescLine>
          <DescLine>•  Fast learning a new language and technique in a couple of days.</DescLine>
          <DescLine>•  Proficient in Linux, VIM and daily use command line.</DescLine>
          <DescLine>•  Deep knowledge about networking, protocol at various network layer, firewall and security.</DescLine>
          <DescLine>•  Ability to build CI/CD system and setup an entire staging environment.</DescLine>
          <DescLine>•  Ability to fully build a small production environment with load balancing, auto scale and monitor system on AWS and on-premise fleet of servers.</DescLine>
          <DescLine>•  Experience with serverless technology (AWS lambda, API gateway)</DescLine>
        </AboutDesc>
      </About>
      <Contact offset={5}>
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
          <a href="https://github.com/facebook/react" target="_blank">React</a>.
        </Footer>
      </Contact>
    </Parallax>
  </>
);
