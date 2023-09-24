import React from "react";
import SinglePost from "./SinglePost";

const Posts: React.FC<any> = ({
  posts,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {posts?.map((postItem: any, index: number) => {
        return (
          <SinglePost
            postItem={postItem}
            key={index}
            likedPosts={likedPosts}
            deleteLikePost={deleteLikePost}
            bookmarkPost={bookmarkPost}
            removeBookmarkPosts={removeBookmarkPosts}
          />
        );
      })}
    </div>
  );
};

export default Posts;
