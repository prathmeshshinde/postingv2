import { Modal } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const DeletePostModal: React.FC<any> = ({
  isDeleteOpenModal,
  setDeleteIsModalOpen,
  postId,
  setOpenPop,
  postCommentDeleltId,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOk = async () => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      if (location.pathname === "/comment") {
        navigate("/");
      }
      setDeleteIsModalOpen(false);

      setOpenPop(false);
    } catch (err) {}

    try {
      await deleteDoc(
        doc(db, "posts", postCommentDeleltId.id, "comments", postId)
      );
      setDeleteIsModalOpen(false);

      setOpenPop(false);
    } catch (err) {}
  };

  const handleCancel = () => {
    setDeleteIsModalOpen(false);
  };

  return (
    <Modal
      title="Delete this Post"
      open={isDeleteOpenModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"Delete"}
    >
      <p>Are You Sure You Want to Delete This Post</p>
    </Modal>
  );
};

export default DeletePostModal;
