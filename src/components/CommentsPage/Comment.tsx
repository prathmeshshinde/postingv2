import { Button, Form, Input, Layout, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import SinglePost from "../HomePage/SinglePost";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { useUserAuth } from "../../context/AuthContext";
import Header from "../HomePage/Header";

const Comment: React.FC<any> = ({
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  const location = useLocation();
  const { postItem } = location.state;

  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [limit, setLimit] = useState(false);
  const { user, username, currUser }: any = useUserAuth();
  const [comments, setComments] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainPost, setMainPost] = useState<any>();
  const [error, setError] = useState<any>();

  const getComments = async () => {
    const docRef = collection(db, "posts", postItem.id, "comments");
    getDocs(docRef)
      .then((snapshot) => {
        let commentDocs: any = [];
        snapshot.docs.forEach((doc) => {
          commentDocs.push({ ...doc.data(), id: doc.id });
        });
        setComments(commentDocs);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const getPost = async () => {
    const docRef = doc(db, "posts", postItem.id);
    const document = await getDoc(docRef);
    const post = { ...document.data(), id: postItem.id };
    setMainPost(post);
  };

  const handleComment = async () => {
    try {
      if (comment.trim().length !== 0) {
        const obj = {
          date: date,
          post: comment,
          userId: user.uid,
          username: username,
          profile: currUser?.profile,
          id: postItem.id,
        };
        const res = await addDoc(
          collection(db, "posts", postItem.id, "comments"),
          obj
        );

        setComments((prevState: any) => [{ ...obj, id: res.id }, ...prevState]);

        setComment("");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    var options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const current = new Date().toLocaleString("en-US", options);
    setDate(current);

    if (e.target.value.length >= 100) {
      setLimit(true);
    } else {
      setLimit(false);
    }
  };

  useEffect(() => {
    getComments();
    getPost();
  }, []);

  return (
    <>
      <Layout className="profile-payout-div">
        <Layout className="site-layout scroll-app ">
          <Content style={{ margin: "10px 0px 0", overflow: "initial" }}>
            <Header />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="comment-post-title">Post</p>
            </div>

            {error ? (
              <p className="no-comments-text">Error Please try Again!</p>
            ) : null}

            <SinglePost
              postItem={mainPost}
              likedPosts={likedPosts}
              deleteLikePost={deleteLikePost}
              bookmarkPost={bookmarkPost}
              removeBookmarkPosts={removeBookmarkPosts}
            />

            <div className="post-div">
              <Space.Compact
                style={{
                  height: "40px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Form
                  style={{ display: "flex", justifyContent: "center" }}
                  onFinish={handleComment}
                >
                  <Form.Item>
                    <Input
                      className="post-input"
                      placeholder="Comment on Post"
                      value={comment}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Item>
                  {limit ? (
                    <p className="limit-text">
                      Please enter only 100 characters
                    </p>
                  ) : null}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ height: "40px" }}
                    >
                      Comment
                    </Button>
                  </Form.Item>
                </Form>
              </Space.Compact>
            </div>

            <p className="comment-post-title" style={{ marginTop: "20px" }}>
              Comments
            </p>

            {loading ? (
              <div className="loading"></div>
            ) : (
              <div>
                {comments.length === 0 ? (
                  <p className="no-comments-text">No Comments</p>
                ) : (
                  comments?.map((postItem: any, index: number) => {
                    return (
                      <SinglePost
                        compare={location.state.postItem.userId}
                        deleteId={postItem.id}
                        postItem={postItem}
                        key={index}
                        postCommentDeleltId={mainPost}
                        likedPosts={likedPosts}
                        deleteLikePost={deleteLikePost}
                        bookmarkPost={bookmarkPost}
                        removeBookmarkPosts={removeBookmarkPosts}
                      />
                    );
                  })
                )}
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Comment;
