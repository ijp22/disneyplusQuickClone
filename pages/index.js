import { gql, GraphQLClient } from 'graphql-request';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Section from '../components/Section';
import disneyLogo from '../public/disney-button.png';
import marvelLogo from '../public/marvel-button.png';
import natgeoLogo from '../public/natgeo-button.png';
import starwarsLogo from '../public/star-wars-button.png';
import pixarLogo from '../public/pixar.png';

export const getStaticProps = async () => {
  const url = process.env.GRAPH_CMS_ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const videosQuery = gql`
    query {
      videos {
        createdAt
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `;

  const accountQuery = gql`
    query {
      account(where: { id: "ckyr6g91c1xwb0b58fj7lf66x" }) {
        username
        avatar {
          url
        }
      }
    }
  `;

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos;
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account;

  return {
    props: {
      videos,
      account,
    },
  };
};

const Home = ({ videos, account }) => {
  const randomVideo = (videos) => {
    return videos[Math.floor(Math.random() * videos.length)];
  };

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre));
  };

  const unSeenVideos = (videos) => {
    return videos.filter(
      (video) => video.seen === false || video.seen === null
    );
  };

  return (
    <>
      <Navbar account={account} />
      <div className="app">
        <div className="main-video">
          <img
            src={randomVideo(videos).thumbnail.url}
            alt={randomVideo(videos).thumbnail.title}
          />
        </div>

        <div className="video-feed">
          <Link href="/">
            <div className="franchise" id="disney">
              <Image src={disneyLogo} />
            </div>
          </Link>
          <Link href="/">
            <div className="franchise" id="pixar">
              <Image src={pixarLogo} />
            </div>
          </Link>
          <Link href="/">
            <div className="franchise" id="star-wars">
              <Image src={starwarsLogo} />
            </div>
          </Link>
          <Link href="/">
            <div className="franchise" id="nat-geo">
              <Image src={natgeoLogo} />
            </div>
          </Link>
          <Link href="/">
            <div className="franchise" id="marvel">
              <Image src={marvelLogo} />
            </div>
          </Link>
        </div>

        <Section genre={'Recommended for you'} videos={unSeenVideos(videos)} />
        <Section
          genre={'Recently Added'}
          videos={filterVideos(videos, 'family')}
        />
        <Section
          genre={'Family Movies'}
          videos={filterVideos(videos, 'thriller')}
        />
        <Section
          genre={'Classic Movies'}
          videos={filterVideos(videos, 'classic')}
        />
      </div>
    </>
  );
};

export default Home;
