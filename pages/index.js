import { Fragment } from 'react';
import Head from 'next/head';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';
import { FavoriteContextProvider } from '../store/notification-context';
const DUMMY_POSTS = [
    {
        title: "about web performance",
        slug:"about-web-performance",
        image:'getting-started.jpeg',
        excerpt:'Most people do not understand web performance, this explains it',
        date: '2022-02-10',
        key: '1'
    },
    {
        title: "about web performance2",
        slug:"about-web-performance2",
        image:'getting-started2.jpeg',
        excerpt:'Most people do not understand web performance, this explains it2',
        date: '2022-02-11',
        key: '2',
    },
    {
        title: "about web performance3",
        slug:"about-web-performance3",
        image:'getting-started3.jpeg',
        excerpt:'Most people do not understand web performance, this explains it3',
        date: '2022-02-12',
        key: '3'
    }
];

function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title> Siddharth's Blog</title>
                <meta name="description" content="I write about Technology and Technlogy Management"/>
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts} />
        </Fragment>
    )
}

// can use either getStaticProps or getServerProps
// or an api route. 
export function getStaticProps() {

    const featuredPosts = getFeaturedPosts();

    return {
        props: {
            posts: featuredPosts
        },
        // refresh content periodically
        revalidate: 3600 // seconds every hour
    }

}

export default HomePage;
