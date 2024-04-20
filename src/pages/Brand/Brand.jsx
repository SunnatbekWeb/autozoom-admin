// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Table, Form, Upload } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./Brand.module.css";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useForm } from "antd/es/form/Form";
import { ToastContainer, toast } from "react-toastify";

const Brand = () => {
  const [bradns, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [modalType, setModalType] = useState("");
  const [form] = useForm();
  const imageUrl =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = () => {
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
      .then((response) => {
        setBrands(response.data?.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Add brand function
  const handleOk = () => {
    if (modalType === "add") {
      form.validateFields().then((values) => {
        const formData = new FormData();
        formData.append("images", imageFile);
        formData.append("title", values.title);

        axios
          .post(
            "https://autoapi.dezinfeksiyatashkent.uz/api/brands/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            toast.success("Brand created successfully!");
            setModalOpen(false);
            getBrands();
            form.resetFields();
          })
          .catch((error) => {
            setModalOpen(false);
            toast.error(error.message);
            form.resetFields();
          });
      });
    }
  };

  const deleteBrand = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    Modal.confirm({
      title: "Do you want to delete this brand?",
      onOk() {
        axios
          .delete(
            `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`,
            config
          )
          .then(() => {
            toast.success("Brand deleted successfully!");
            getBrands();
          })
          .catch((error) => {
            toast.error(error.message);
          });
      },
    });
  };
  // Handle functions
  const handleCancel = () => {
    setModalOpen(false);
    form.resetFields();
  };
  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImageFile(info.file.originFileObj);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
    },
    {
      title: (
        <div
          className="brand-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p>Action</p>
          <Button
            onClick={() => {
              setModalOpen(true), setModalType("add");
            }}
          >
            Add brand
          </Button>
        </div>
      ),
      dataIndex: "action",
      key: "action",
    },
  ];

  const data = bradns.map((item, index) => ({
    key: index,
    name: item.title,
    images: (
      <img
        style={{ width: "100px" }}
        src={`${imageUrl}${item.image_src}`}
        alt="Brand Logo"
      />
    ),
    action: (
      <Select
        placeholder="Action"
        style={{
          width: 120,
        }}
        options={[
          {
            value: "edit",
            label: (
              <div
                onClick={() => setModalType("edit")}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "20px",
                }}
              >
                <FiEdit style={{ fontSize: "16px" }} />
                Edit
              </div>
            ),
          },
          {
            value: "delete",
            label: (
              <div
                onClick={() => deleteBrand(item?.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "20px",
                }}
              >
                <RiDeleteBinLine style={{ fontSize: "16px" }} />
                Delete
              </div>
            ),
          },
        ]}
      />
    ),
  }));

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className={style["brand_header"]}>
      <Input
        addonBefore={<SearchOutlined />}
        style={{ width: "40%", marginBottom: "40px" }}
        placeholder="large size"
      />
      <Table columns={columns} dataSource={data} />
      <ToastContainer />
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Brand Name"
            name="title"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Upload Image"
            name="images"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload
              customRequest={({ onSuccess }) => {
                onSuccess("ok");
              }}
              onChange={handleImageChange}
              listType="picture-card"
            >
              <div>
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Brand;
