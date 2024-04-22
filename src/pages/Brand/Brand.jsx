import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Table, Form, Upload } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import style from "./Brand.module.css";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Loader from "./../../components/Ui/Loader/Loader";

const Brand = () => {
  const [bradns, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [form] = useForm();
  const imageUrl =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  useEffect(() => {
    getBrands();
    setLoading(false);
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
        setLoading(true);
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
            setModalOpen(false);
            setLoading(false);
            toast.success("Brand created successfully!");
            getBrands();
            form.resetFields();
          })
          .catch((error) => {
            setLoading(false);
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
        setLoading(true);
        axios
          .delete(
            `https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`,
            config
          )
          .then(() => {
            getBrands();
            setLoading(false);
            toast.success("Brand deleted successfully!");
          })
          .catch((error) => {
            setLoading(false);
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
            type="primary"
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
      <>
        <span style={{ marginRight: "20px" }}>
          <Button
            type="primary"
            onClick={() => {
              setModalOpen(true), setModalType("edit");
            }}
          >
            <FaEdit style={{ fontSize: "20px" }} />
          </Button>
        </span>
        <span>
          <Button type="primary" danger onClick={() => deleteBrand(item.id)}>
            <MdDeleteForever style={{ fontSize: "20px" }} />
          </Button>
        </span>
      </>
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
      {loading && <Loader />}
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
