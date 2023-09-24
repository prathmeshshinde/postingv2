import React, { useEffect, useState } from "react";
import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
  ReadFilled,
  ReadOutlined,
} from "@ant-design/icons";
import UpdatePostModal from "../ProfilePage/UpdatePostModal";
import { useUserAuth } from "../../context/AuthContext";
import DeletePostModal from "../ProfilePage/DeletePostModal";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../App";

const SinglePost: React.FC<any> = ({
  postItem,
  compare,
  postCommentDeleltId,
  likedPosts,
  deleteLikePost,
  bookmarkPost,
  removeBookmarkPosts,
  userPost,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [openPop, setOpenPop] = useState<any>(false);
  const [isDeleteModalOpen, setDeleteIsModalOpen] = useState<any>(false);
  const { currUser }: any = useUserAuth();
  const [likedPostId, setLikedPostId] = useState<any>();
  const [bookmarkPostId, setBookmarkPostId] = useState<any>();
  const location = useLocation();

  const updatePost = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setDeleteIsModalOpen(true);
  };

  const handleLike = async (post_id: string, user_id: string) => {
    await addDoc(collection(db, "likes"), {
      postId: post_id,
      userId: user_id,
    });
  };

  const showLikedPosts = () => {
    if (
      likedPosts?.length !== 0 &&
      location.pathname !== "/comment" &&
      location.pathname !== "/profile"
    ) {
      getDocs(
        query(
          collection(db, "posts"),
          where("userId", "==", postItem?.userId),
          where("postId", "in", likedPosts)
        )
      )
        .then((snapshot) => {
          let postDocs: any = [];
          snapshot?.docs?.forEach((doc) => {
            postDocs.push(doc?.data().postId);
          });
          setLikedPostId(postDocs);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleDislike = async () => {
    deleteLikePost?.map(async (items: any) => {
      if (items.postId === postItem?.postId) {
        await deleteDoc(doc(db, "likes", items?.likedId));
      }
    });
  };

  const handleBookmark = async (post_id: string, user_id: string) => {
    await addDoc(collection(db, "bookmarks"), {
      postId: post_id,
      userId: user_id,
    });
  };

  const showBookmarkedPosts = () => {
    if (
      bookmarkPost?.length !== 0 &&
      location.pathname !== "/comment" &&
      location.pathname !== "/profile"
    ) {
      getDocs(
        query(
          collection(db, "posts"),
          where("userId", "==", postItem?.userId),
          where("postId", "in", bookmarkPost)
        )
      )
        .then((snapshot) => {
          let postDocs: any = [];
          snapshot?.docs?.forEach((doc) => {
            postDocs.push(doc.data().postId);
          });
          setBookmarkPostId(postDocs);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleRemoveBookmark = async () => {
    removeBookmarkPosts?.map(async (items: any) => {
      if (items?.postId === postItem?.postId) {
        await deleteDoc(doc(db, "bookmarks", items.bookmarkedId));
      }
    });
  };

  useEffect(() => {
    showLikedPosts();
    showBookmarkedPosts();
  }, [currUser, compare, deleteLikePost, removeBookmarkPosts]);

  return (
    <div className="posts-container">
      <div className="post-main">
        <div className="post-head">
          <div className="post-user">
            <div>
              {postItem?.profile === "" ? (
                <div className="text-conatainer">
                  <p className="text-profile">{postItem?.username.charAt(0)}</p>
                </div>
              ) : (
                <img
                  className="image-container"
                  src={postItem?.profile}
                  alt="profile"
                />
              )}
            </div>
            <div className="post-section">
              <p className="post-username">{postItem?.username}</p>
              <p className="post-date">{postItem?.date}</p>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                {currUser?.userId === postItem?.userId ||
                currUser?.userId === compare ? (
                  <MoreOutlined
                    onClick={() => setOpenPop(!openPop)}
                    style={{ fontSize: "20px", color: "#000" }}
                  />
                ) : null}
              </div>
              <div>
                <p className="edited-text">{postItem?.edited}</p>
              </div>
            </div>
            <div>
              {openPop && (
                <div className="updateDelete">
                  {currUser?.userId === compare ? null : (
                    <p className="update-button" onClick={() => updatePost()}>
                      Update the post
                    </p>
                  )}
                  <p className="delete-button" onClick={showModal}>
                    Delete
                  </p>
                  <DeletePostModal
                    isDeleteOpenModal={isDeleteModalOpen}
                    setDeleteIsModalOpen={setDeleteIsModalOpen}
                    postId={postItem?.id}
                    setOpenPop={setOpenPop}
                    postCommentDeleltId={postCommentDeleltId}
                  />

                  <UpdatePostModal
                    isModalOpen={isModalOpen}
                    handleCancel={handleCancel}
                    post={postItem}
                    setOpenPop={setOpenPop}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="post-text">{postItem?.post}</p>

        {location.pathname !== "/comment" ? (
          <div className="post-feature-buttons">
            <Link
              to="/comment"
              className="link-style"
              state={{
                postItem: postItem,
              }}
            >
              <Tooltip title="Comment">
                <CommentOutlined
                  style={{ fontSize: "20px", marginLeft: "20px" }}
                />
              </Tooltip>
            </Link>

            {location.pathname !== "/profile" ? (
              <div>
                {likedPostId?.includes(postItem?.postId) ? (
                  <Tooltip title="Dislike">
                    <HeartFilled
                      onClick={() => handleDislike()}
                      style={{
                        fontSize: "20px",
                        cursor: "pointer",
                        color: "#1677ff",
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Like">
                    <HeartOutlined
                      onClick={() => handleLike(postItem?.id, postItem?.userId)}
                      style={{ fontSize: "20px", cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
              </div>
            ) : null}

            {location.pathname !== "/profile" ? (
              <div>
                {bookmarkPostId?.includes(postItem?.postId) ? (
                  <Tooltip title="Remove Bookmark">
                    <ReadFilled
                      onClick={() => handleRemoveBookmark()}
                      style={{
                        fontSize: "20px",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Bookmark">
                    <ReadOutlined
                      onClick={() =>
                        handleBookmark(postItem?.id, postItem?.userId)
                      }
                      style={{
                        fontSize: "20px",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SinglePost;
