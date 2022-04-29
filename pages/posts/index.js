import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
import Head from 'next/head';
import { Fragment } from 'react';
/* 
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
 */

function AllPostsPage(props) {

    return (
        <Fragment>
        <Head>
            <title> All Posts</title>
            <meta name="description" content="All Technology Posts"/>
        </Head>
        <AllPosts posts={props.posts} />
     </Fragment>
    );
}

export function getStaticProps() {
    const allPosts = getAllPosts();

    return ( {
        props: {
            posts: allPosts
        },
        revalidate: 3600
    }
    );
}


export default AllPostsPage;