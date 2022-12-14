import dayjs from 'dayjs';
import { useAtom } from 'jotai/react';
import { atom, PrimitiveAtom } from 'jotai/vanilla';
import { splitAtom } from 'jotai/vanilla/utils';
import { nanoid } from 'nanoid';
import React from 'react';

type PostType = {
  id: string;
  title: string;
  content: string;
  datePublished: string;
  dateUpdated?: string;
};

const INITIAL_POSTS: PostType[] = [
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
    datePublished: '2022-12-08T01:39:31.207Z',
    dateUpdated: '2022-12-11T21:39:31.207Z',
  },
];

const postsAtom = atom(INITIAL_POSTS);

const postAtomsAtom = splitAtom(postsAtom);

const titleAtom = atom('');
const contentAtom = atom('');
const createAtom = atom(
  (get) => !!get(titleAtom) && !!get(contentAtom),
  (get, set) => {
    const title = get(titleAtom);
    const content = get(contentAtom);
    if (title && content) {
      const newPost: PostType = {
        id: nanoid(),
        title,
        content,
        datePublished: new Date().toISOString(),
      };
      set(postsAtom, (prev) => [...prev, newPost]);
      set(titleAtom, '');
      set(contentAtom, '');
    }
  }
);

const deleteAtom = atom(null, (get, set, postId: string) => {
  set(postsAtom, (prev) => prev.filter((post) => post.id !== postId));
});

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
      <button onClick={() => deletePost(post.id)}>Delete</button>
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
