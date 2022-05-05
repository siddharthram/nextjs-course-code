import PostContent from "./post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Head from "next/head";
import { Fragment } from 'react';

function PostDetailPage(props) {
  return (
    <Fragment>
        <Head>
            <title>{props.post.title}</title>
            <meta name="description" content={props.post.excerpt}/>
        </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export function getStaticProps(content) {
  const { params } = content; // getStaticProps get content by default, which will have the slug
  const { slug } = params;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 60 * 60, // seconds, for a single file only
  };
}
//If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
export function getStaticPaths() {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fname) => fname.replace(/\.md$/, ""));
  const foo = slugs.map((slug) => ({ params: { slug: slug } }));

  console.log(foo);

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false, // data prepared on the fly, nothing pre prepared.
    // can be blocking also till data is generate if rarely read/visited
    // in this case not too much content, can set fallback to false
  };
}

export default PostDetailPage;
