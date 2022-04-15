import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const DUMMY_POST = {
  title: "about web performance",
  slug: "about-web-performance",
  image: "getting-started.jpeg",
  date: "2022-02-10",
  content: "# This is a first post",
};

function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
  const customRenderers = {
    /*         img(image) {
            return ( <div className={classes.image}>
                <Image
                src={`/images/posts/${post.slug}/${image.properties.src}`}
                alt={image.alt}
                width={600}
                height={300}/>
            </div>
            )
        }, */
    p(paragraph) {
      const { node } = paragraph;

      // override img tag with Image if that is the first child
      if (node.children[0].tagName == "img") {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{paragraph.children} </p>;
    },
    code({node, inline, className, children, ...props}) {
      const language = /language-(\w+)/.exec(className || '');
      console.log(language[1] );
      return <SyntaxHighlighter style={dracula} language={language[1]} children={children} />;
    },
  };
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
