import { atom, useAtom } from 'jotai';
import React from 'react';

type PostType = {
  id: string;
  title: string;
  content: string;
  datePublished: string;
  dateUpdated: string;
};

const INITIAL_POSTS = [
  {
    id: '1',
    title: 'foo',
    content: 'lorem',
    datePublished: '2022-12-13T01:39:31.207Z',
  },
  {
    id: '2',
    title: 'aaa',
    content: 'bbb',
    datePublished: '2022-12-8T01:39:31.207Z',
  },
] as PostType[];

const postsAtom = atom(INITIAL_POSTS);

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div>
        <span>{post.datePublished}</span>
        <span>{post?.dateUpdated}</span>
      </div>
    </div>
  );
};

const Posts = () => {
  const [posts] = useAtom(postsAtom);
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </>
  );
};

export default Posts;
