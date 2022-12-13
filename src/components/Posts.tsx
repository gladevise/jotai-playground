import { useAtom } from 'jotai/react';
import { atom, PrimitiveAtom } from 'jotai/vanilla';
import { splitAtom } from 'jotai/vanilla/utils';
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

const postAtomsAtom = splitAtom(postsAtom);

type PostProps = {
  postAtom: PrimitiveAtom<PostType>;
};

const Post = ({ postAtom }: PostProps) => {
  const [post] = useAtom(postAtom);
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
  const [postAtoms] = useAtom(postAtomsAtom);
  return (
    <>
      <h1>Posts</h1>
      {postAtoms.map((postAtom) => {
        return <Post key={`${postAtom}`} postAtom={postAtom} />;
      })}
    </>
  );
};

export default Posts;
