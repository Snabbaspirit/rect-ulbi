import { useMemo } from 'react';

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        console.log("getSelectedPosts invoked");
        if (sort) {
          return [...posts].sort((a, b) =>
            a[sort].localeCompare(b[sort])
          );
        }
        return posts;
      }, [sort, posts]);

    return sortedPosts
};


export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);
    const sortedAndSelectedPosts = useMemo(() => {
        return sortedPosts.filter((post) => {
          const titleUp = post.title.toUpperCase();
          const queryUp = query.toUpperCase();
          return titleUp.includes(queryUp);
        });
      }, [query, sortedPosts]);
    return sortedAndSelectedPosts
}