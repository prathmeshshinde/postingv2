import React, { useMemo, useState } from "react";
import { useUserAuth } from "../../context/AuthContext";
import { Layout, Space, Input, Button, Form, notification } from "antd";
import Posts from "./Posts";
import Header from "./Header";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";

type NotificationType = "success" | "info" | "warning" | "error";

const { Content } = Layout;

const Context = React.createContext({ name: "Default" });

const Home: React.FC<any> = ({
  posts,
  loading,
  forInfiniteScroll,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  const [post, setPost] = useState("");
  const [date, setDate] = useState("");
  const [limit, setLimit] = useState(false);
  const { user, username, currUser }: any = useUserAuth();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };

  const handlePost = async () => {
    if (post.trim().length !== 0 && !limit) {
      addDoc(collection(db, "posts"), {
        date: date,
        post: post,
        userId: user.uid,
        username: username,
        profile: currUser?.profile,
      }).then((res) => {
        updateDoc(doc(db, "posts", res.id), {
          postId: res.id,
        });
        openNotificationWithIcon("success", "Post Successful");
      });
      setPost("");
    } else {
      openNotificationWithIcon("error", "Please try again!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
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

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <Layout>
        <Layout
          className="site-layout scroll-app"
          onScroll={(e) => forInfiniteScroll(e)}
        >
          <Header />

          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
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
                  onFinish={handlePost}
                >
                  <Form.Item>
                    <Input
                      className="post-input"
                      placeholder="Write Post"
                      value={post}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ height: "40px" }}
                    >
                      Post
                    </Button>
                  </Form.Item>
                </Form>
              </Space.Compact>
            </div>
            {limit ? (
              <p className="limit-text">Please enter only 100 characters</p>
            ) : null}

            {loading ? (
              <div className="loading"></div>
            ) : (
              <div>
                {posts.length === 0 ? (
                  <p className="no-comments-text">No posts</p>
                ) : (
                  <Posts
                    posts={posts}
                    likedPosts={likedPosts}
                    deleteLikePost={deleteLikePost}
                    bookmarkPost={bookmarkPost}
                    removeBookmarkPosts={removeBookmarkPosts}
                  />
                )}
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    </Context.Provider>
  );
};

export default Home;
