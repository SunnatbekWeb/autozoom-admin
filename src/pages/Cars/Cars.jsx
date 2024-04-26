import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table, Form, Upload } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useForm } from "antd/es/form/Form";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Cars = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [modalType, setModalType] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const [form] = useForm();
  const imageUrl =
    "https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/";

  const getCategories = () => {
    setLoading(true);
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/cars")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Add brand function
  const handleOk = () => {
    if (modalType === "add") {
      form.validateFields().then((values) => {
        const formData = new FormData();
        formData.append("brand_id", values.brand_id);
        formData.append("model_id", values?.model_id);
        formData.append("city_id", values?.city_id);
        formData.append("color", values?.color);
        formData.append("year", values?.year);
        formData.append("seconds", values?.seconds);
        formData.append("category_id", values?.category_id);
        formData.append("max_speed", values?.max_speed);
        formData.append("max_people", values?.max_people);
        formData.append("transmission", values?.transmission);
        formData.append("motor", values?.motor);
        formData.append("drive_side", values?.drive_side);
        formData.append("petrol", values?.petrol);
        if (values?.images && values?.images?.length > 0) {
          values.images.forEach((image) => {
            if (image && image?.originFileObj) {
              formData.append("images", image?.originFileObj, image.name);
            }
          });
        }
        setLoadings(true);
        axios
          .post(
            "https://autoapi.dezinfeksiyatashkent.uz/api/categories/",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(() => {
            setLoadings(false);
            setModalOpen(false);
            toast.success("Brand created successfully!");
            getCategories();
            form.resetFields();
          })
          .catch((error) => {
            setLoadings(false);
            setModalOpen(false);
            toast.error(error.message);
            form.resetFields();
          });
      });
    } else if (modalType === "edit") {
      form.validateFields().then((values) => {
        const formData = new FormData();
        formData.append("brand_id", values.brand_id);
        formData.append("model_id", values?.model_id);
        formData.append("city_id", values?.city_id);
        formData.append("color", values?.color);
        formData.append("year", values?.year);
        formData.append("seconds", values?.seconds);
        formData.append("category_id", values?.category_id);
        formData.append("max_speed", values?.max_speed);
        formData.append("max_people", values?.max_people);
        formData.append("transmission", values?.transmission);
        formData.append("motor", values?.motor);
        formData.append("drive_side", values?.drive_side);
        formData.append("petrol", values?.petrol);

        setLoadings(true);
        axios
          .put(
            `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${selectedCategories.id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          )
          .then(() => {
            getCategories();
            setLoadings(false);
            setModalOpen(false);
            toast.success("Brands updated successfully!");
          })
          .catch((err) => {
            setLoadings(false);
            setModalOpen(false);
            toast.error(err.message);
          });
      });
    }
  };

  const handleEdit = (item) => {
    const images = `${imageUrl}${item.image_src}`;
    setSelectedCategories({
      id: item?.id,
      model_id: model_id,
      brend_id: brend_id,
      city_id: city_id,
    });

    form.setFieldsValue(item);
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
            `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
            config
          )
          .then(() => {
            getCategories();
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

  // Table columns
  const columns = [
    {
      title: "brend",
      dataIndex: "brand_id",
      key: "brand_id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "model",
      dataIndex: "model_id",
      key: "model_id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "city",
      dataIndex: "city_id",
      key: "city_id",
      render: (text) => <p>{text}</p>,
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
            Add Categories
          </Button>
        </div>
      ),
      dataIndex: "action",
      key: "action",
    },
  ];
  // Table data
  const data = categories.map((item, index) => ({
    loading: true,
    key: index,
    model_id: item.model_id,
    brand_id: item.brand_id,
    city_id: item.city_id,
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
              setModalOpen(true), setModalType("edit"), handleEdit(item);
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
    <div>
      <Input
        addonBefore={<SearchOutlined />}
        style={{ width: "40%", marginBottom: "40px" }}
        placeholder="large size"
      />
      <Table columns={columns} loading={loading} dataSource={data} />
      <ToastContainer />
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loadings}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="model_id"
            name="model_id"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="brend_id"
            name="brend_id"
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
export default Cars;
