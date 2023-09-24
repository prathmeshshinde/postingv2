import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../HomePage/Header";
import { Content } from "antd/es/layout/layout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../App";
import SinglePost from "../HomePage/SinglePost";

const Bookmark: React.FC<any> = ({
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>();

  const colRef = collection(db, "posts");

  const getLikedPosts = () => {
    getDocs(colRef)
      .then((snapshot) => {
        let postDocs: any = [];
        snapshot.docs.forEach((doc) => {
          postDocs.push({ ...doc.data() });
        });

        let newLikedPosts: any = [];
        postDocs.map((post: any) => {
          bookmarkPost.map((ids: any) => {
            if (post.postId === ids) {
              newLikedPosts.push(post);
            }
          });
        });

        setUserPost(newLikedPosts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    getLikedPosts();
  }, [userPost]);

  return (
    <Layout>
      <Layout className="site-layout scroll-app">
        <Header />
        <h1 className="like-title">Bookmarks</h1>

        {error ? (
          <p className="no-comments-text">Error Please try Again!</p>
        ) : null}
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          {loading ? (
            <div className="loading"></div>
          ) : (
            <div>
              {userPost?.length === 0 ? (
                <p className="no-comments-text">No posts</p>
              ) : (
                <div>
                  {userPost.map((newPost: any, index: any) => {
                    return (
                      <SinglePost
                        key={index}
                        postItem={newPost}
                        likedPosts={likedPosts}
                        deleteLikePost={deleteLikePost}
                        bookmarkPost={bookmarkPost}
                        removeBookmarkPosts={removeBookmarkPosts}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Bookmark;
