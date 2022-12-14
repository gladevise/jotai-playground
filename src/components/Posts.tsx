import dayjs from 'dayjs';
import { useAtom } from 'jotai/react';
import { atom, PrimitiveAtom } from 'jotai/vanilla';
import React, { useMemo } from 'react';
import {
  contentAtom,
  createAtom,
  deleteAtom,
  postAtomsAtom,
  PostType,
  selectedPostAtom,
  titleAtom,
  updateAtom,
} from './postAtoms';

const PostEditor = () => {
  const [title, setTitle] = useAtom(titleAtom);
  const [content, setContent] = useAtom(contentAtom);
  const [enableCreate, createPost] = useAtom(createAtom);
  const [enableUpdate, updatePost] = useAtom(updateAtom);
  const [enableDelete, deletePost] = useAtom(deleteAtom);

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
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <button disabled={!enableCreate} onClick={createPost}>
          Create
        </button>
        <button disabled={!enableUpdate} onClick={updatePost}>
          Update
        </button>
        <button disabled={!enableDelete} onClick={deletePost}>
          Delete
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
  const [selected, setSelected] = useAtom(
    useMemo(
      () =>
        atom(
          (get) => get(selectedPostAtom) === postAtom,
          (_get, set) => set(selectedPostAtom, postAtom)
        ),
      [postAtom]
    )
  );

  const datePublished = dayjs(post.datePublished).format('YYYY-MM-DD HH:mm:ss');
  const dateUpdated = post?.dateUpdated
    ? dayjs(post?.dateUpdated).format('YYYY-MM-DD HH:mm:ss')
    : undefined;
  return (
    <div
      onClick={setSelected}
      style={{
        backgroundColor: selected ? 'lightblue' : 'white',
      }}
    >
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
