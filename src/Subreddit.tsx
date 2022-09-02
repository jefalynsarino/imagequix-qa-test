import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
  id: string;
  author: string;
  subreddit: string;
  title: string;
}

interface PostResult {
  data: Post;
}

function Subreddit() {
  const { subreddit } = useParams<{ subreddit?: string }>();
  const [posts, setPosts] = useState<PostResult[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      const result = await fetch(
        `https://www.reddit.com/r/${subreddit || 'all'}/new.json`
      ).catch(() => null);

      if (!result || !result.ok) {
        setError(`Could not retrieve results for ${subreddit}`);
      } else {
        const json = await result.json();
        if (!json) {
          setError(`Could not parse results for ${subreddit}`);
        } else {
          setPosts(json.data.children);
        }
      }
    };

    init();
  }, [subreddit]);

  const renderPosts = () => {
    return posts.map(post => (
      <div className="post" key={post.data.id}>
        <div className="author">/u/{post.data.author}{!subreddit ? ` posted to /r/${post.data.subreddit}` : ''}</div>
        <div className="title">{post.data.title}</div>
      </div>
    ))
  }

  return <div>{error || renderPosts()}</div>;
}

export default Subreddit;
