import React, { useState } from "react";
import { useUserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Layout, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const { login }: any = useUserAuth();
  const navigate = useNavigate();
  const { Title } = Typography;

  const onFinish = async (values: any) => {
    setError("");
    await login(values.email, values.password);
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {error ? (
        <p className="no-comments-text">Error Please try Again!</p>
      ) : null}
      <div className="form-div" style={{ height: "100vh" }}>
        <div className="form-box">
          <div className="form-title">
            <Title level={3} type="secondary">
              Login
            </Title>
          </div>
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
                Log in
              </Button>

              <Link to="/signup" className="style-link">
                Sign Up
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
