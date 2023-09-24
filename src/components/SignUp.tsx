import React, { useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Layout, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const SignUp: React.FC = () => {
  const [error, setError] = useState<any>("");
  const navigate = useNavigate();
  const { Title } = Typography;
  const { signup }: any = useUserAuth();
  const db = getFirestore();

  const onFinish = async (values: any) => {
    try {
      setError("");
      const signedUpUser = await signup(values.email, values.password);
      await addDoc(collection(db, "users"), {
        username: values.username,
        userId: signedUpUser.user.uid,
        bio: "Add Bio",
        profile: "",
      });
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Error", errorInfo);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <div className="form-div" style={{ height: "100vh" }}>
        <div className="sign-box" style={{ paddingBottom: "70px" }}>
          <div className="form-title">
            <Title level={3} type="secondary">
              Sign Up
            </Title>
          </div>
          {error ? (
            <p
              style={{
                textAlign: "center",
                color: "red",
                margin: "0px 0px 10px 0px",
                fontSize: "15px",
                fontWeight: "500",
              }}
            >
              {error}
            </p>
          ) : null}

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign Up
              </Button>

              <Link to="/login" className="style-link">
                Log In
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
