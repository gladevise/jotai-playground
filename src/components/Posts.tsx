import dayjs from 'dayjs';
import { useAtom } from 'jotai/react';
import { atom, PrimitiveAtom } from 'jotai/vanilla';
import { splitAtom } from 'jotai/vanilla/utils';
import { nanoid } from 'nanoid';
import React from 'react';
import {
  contentAtom,
  createAtom,
  deleteAtom,
  postAtomsAtom,
  PostType,
  titleAtom,
} from './postAtoms';

const PostEditor = () => {
  const [title, setTitle] = useAtom(titleAtom);
  const [content, setContent] = useAtom(contentAtom);
  const [enableCreate, createPost] = useAtom(createAtom);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <span>Post Title: </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <span>Post Content: </span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button disabled={!enableCreate} onClick={createPost}>
          Create
        </button>
      </div>
    </div>
  );
};

type PostProps = {
  postAtom: PrimitiveAtom<PostType>;
};
const Post = ({ postAtom }: PostProps) => {
  const [post] = useAtom(postAtom);
  const [, deletePost] = useAtom(deleteAtom);

  const datePublished = dayjs(post.datePublished).format('YYYY-MM-DD HH:mm:ss');
  const dateUpdated = post?.dateUpdated
    ? dayjs(post?.dateUpdated).format('YYYY-MM-DD HH:mm:ss')
    : undefined;
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div>
        <div>
          <span>Published At: </span>
          <span>{datePublished}</span>
        </div>
        {dateUpdated && (
          <div>
            <span>Updated At: </span>
            <span>{dateUpdated}</span>
          </div>
        )}
      </div>
      <button onClick={() => deletePost(postAtom)}>Delete</button>
    </div>
  );
};

const Posts = () => {
  const [postAtoms] = useAtom(postAtomsAtom);
  return (
    <>
      <h1>Posts</h1>
      <PostEditor />
      {postAtoms.map((postAtom) => {
        return <Post key={`${postAtom}`} postAtom={postAtom} />;
      })}
    </>
  );
};

export default Posts;
