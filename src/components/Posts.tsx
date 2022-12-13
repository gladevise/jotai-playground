import { atom, useAtom } from 'jotai';
import React from 'react';

type Post = {
  title: string;
  content: string;
  datePublished: string;
  dateUpdated: string;
};

const INITIAL_POSTS = [
  {
    title: 'foo',
    content: 'lorem',
    datePublished: '2022-12-13T01:39:31.207Z',
  },
  {
    title: 'aaa',
    content: 'bbb',
    datePublished: '2022-12-8T01:39:31.207Z',
  },
] as Post[];

const postsAtom = atom(INITIAL_POSTS);

// const Post = () => {

// }

const Posts = () => {
  const [posts] = useAtom(postsAtom);
  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.title}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div>
              <span>{post.datePublished}</span>
              <span>{post?.dateUpdated}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
