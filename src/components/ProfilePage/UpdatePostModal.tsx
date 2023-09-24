import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";

const UpdatePostModal: React.FC<any> = ({
  isModalOpen,
  handleCancel,
  post,
  setOpenPop,
}) => {
  const [date, setDate] = useState("");
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = async (values: any) => {
    try {
      const updateProfile = doc(db, "posts", post.id);
      await updateDoc(updateProfile, {
        post: values.post.post,
        date: date,
        edited: "Edited",
      });
      handleCancel();

      setOpenPop(false);
    } catch (err) {}
  };

  useEffect(() => {
    var options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const current = new Date().toLocaleString("en-US", options);
    setDate(current);
  }, []);

  return (
    <div>
      <Modal
        title="Update Profile"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 400 }}
        >
          <Form.Item
            name={["post", "post"]}
            label="Post"
            initialValue={post.post}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{ ...layout.wrapperCol }}
            style={{ textAlign: "end" }}
          >
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              style={{ margin: "0px 0px 0px 10px" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdatePostModal;
