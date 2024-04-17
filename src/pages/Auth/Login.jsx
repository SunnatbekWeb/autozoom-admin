import React from "react";
// import useAuth from "../../service/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Button, message, Form, Input } from "antd";

const Login = () => {
  const navigate = useNavigate();

//   const sendData = (phone_number, password) => {
//     useAuth
//       .login({ phone_number, password })
//       .then((res) => {
//         navigate("/");
//         localStorage.setItem(
//           "accessToken",
//           res.data.data.tokens.accessToken.token
//         );
//         message.success("You are now signed in!");
//       })
//       .catch((err) => {
//         message.error(`Failed to login! ${err.response.data.message}`);
//       });
//   };

  const onFinish = (values) => {
    // sendData(values.username, values.password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="shadow-lg px-10 py-5 hover:shadow-xl duration-300">
        <Form
          name="basic"
          style={{ width: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Phone number"
            name="username"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
