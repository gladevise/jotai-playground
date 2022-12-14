import { atom, PrimitiveAtom } from 'jotai/vanilla';
import { splitAtom } from 'jotai/vanilla/utils';
import { nanoid } from 'nanoid';

export type PostType = {
  id: string;
  title: string;
  content: string;
  datePublished: string;
  dateUpdated?: string;
};

export const INITIAL_POSTS: PostType[] = [
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

export const postsAtom = atom(INITIAL_POSTS);

export const postAtomsAtom = splitAtom(postsAtom);

export const titleAtom = atom('');
export const contentAtom = atom('');
export const createAtom = atom(
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

export const deleteAtom = atom(
  null,
  (get, set, selectedAtom: PrimitiveAtom<PostType>) => {
    const selectedPost = get(selectedAtom);
    set(postsAtom, (prev) =>
      prev.filter((post) => post.id !== selectedPost.id)
    );
  }
);
