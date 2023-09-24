import { Button, Form, Input, Modal } from "antd";
import React from "react";

const ProfileUpdateModal: React.FC<any> = ({
  isModalOpen,
  handleCancel,
  onFinish,
  currUser,
}) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
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
          name={["username", "username"]}
          label="Username"
          initialValue={currUser?.username}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["profile", "profile"]}
          label="Image Link"
          initialValue={currUser?.profile}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={["bio", "bio"]}
          label="Bio"
          initialValue={currUser?.bio}
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
  );
};

export default ProfileUpdateModal;
