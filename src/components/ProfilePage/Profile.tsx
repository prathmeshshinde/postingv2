import { Button, Layout, notification } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../HomePage/Header";
import { Content } from "antd/es/layout/layout";
import { useUserAuth } from "../../context/AuthContext";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import Posts from "../HomePage/Posts";
import ProfileUpdateModal from "./ProfileUpdateModal";

type NotificationType = "success" | "info" | "warning" | "error";

const Context = React.createContext({ name: "Default" });

const Profile: React.FC<any> = ({
  posts,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
}) => {
  const { user, currUser, userDoc }: any = useUserAuth();
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [userPost, setUserPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(currUser);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      const updateProfile = doc(db, "users", userDoc);
      const obj = {
        username: values.username.username,
        profile: values.profile.profile,
        bio: values.bio.bio,
      };
      await updateDoc(updateProfile, obj);
      setUserProfile(obj);
      setIsModalOpen(false);
      openNotificationWithIcon("success", "Successfully updated profile");
    } catch (err) {
      openNotificationWithIcon(
        "error",
        "Something went wrong please try again!"
      );
    }
  };

  const colRef = collection(db, "posts");

  const getPosts = () => {
    getDocs(colRef)
      .then((snapshot) => {
        let postDocs: any = [];
        snapshot.docs.forEach((doc) => {
          postDocs.push({ ...doc.data(), id: doc.id });
        });

        const newposts = postDocs.filter((ele: any) => {
          return ele.userId === currUser.userId;
        });
        setUserPost(newposts);
        setLoading(false);
      })
      .catch((err) => {
        console.log();
      });
  };

  useEffect(() => {
    getPosts();
    setUserProfile(currUser);
  }, [currUser, posts]);

  const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      {loading ? (
        <div className="loading"></div>
      ) : (
        <Layout className="profile-payout-div">
          <Layout className="site-layout scroll-app profile-layout">
            <Header />
            <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
              <div className="profile-main">
                <div className="profile-head">
                  <div className="image-circle">
                    {currUser?.profile === "" ? (
                      <div className="profile-image-conatainer">
                        <p className="profile-image-circle">
                          {userProfile.username.charAt(0)}
                        </p>
                      </div>
                    ) : (
                      <img
                        className="image-circle"
                        src={userProfile?.profile}
                        alt="profile"
                      />
                    )}
                  </div>
                  <div>
                    <Button type="primary" onClick={showModal}>
                      Edit Profile
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="username-profile">{userProfile?.username} </p>
                  <p className="email-profile">{user?.email}</p>
                  <p className="bio-profile">{userProfile?.bio}</p>
                </div>
              </div>

              <ProfileUpdateModal
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                onFinish={onFinish}
                currUser={userProfile}
              />

              {userPost.length === 0 ? (
                <p className="user-posts">User not posted Anything</p>
              ) : (
                <Posts
                  posts={userPost}
                  likedPosts={likedPosts}
                  deleteLikePost={deleteLikePost}
                  bookmarkPost={bookmarkPost}
                  removeBookmarkPosts={removeBookmarkPosts}
                />
              )}
            </Content>
          </Layout>
        </Layout>
      )}
    </Context.Provider>
  );
};

export default Profile;
