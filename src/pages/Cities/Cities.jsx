import { message, Table, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Cities.module.css";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedCity, setSelectedCity] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="buttons">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="dashed" onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const getData = () => {
    setLoading(true);
    axios
      .get("https://autoapi.dezinfeksiyatashkent.uz/api/cities")
      .then((response) => {
        setCities(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error getting cities.", error);
        message.error("Error getting cities.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = (record) => {
    setSelectedCity(record);
    setVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Do you want to delete this city?",
      onOk() {
        axios
          .delete(
            `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${record.id}`
          )
          .then(() => {
            message.success("City deleted successfully");
            getData();
          })
          .catch((error) => {
            console.error("Error deleting city.", error);
            message.error("Error deleting city.");
          });
      },
    });
  };

  const handleAdd = () => {
    setSelectedCity(null);
    setVisible(true);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      const name = formData.append(values.name);
      const text = formData.append(values.tittle);
      const images = formData.append(values.images);
      const url = selectedCity
        ? `https://autoapi.dezinfeksiyatashkent.uz/api/cities/${selectedCity.id}`
        : "https://autoapi.dezinfeksiyatashkent.uz/api/cities";
      const method = selectedCity ? "PUT" : "POST";

      axios({
        url,
        method,
        data: formData,
      })
        .then(() => {
          message.success(
            selectedCity
              ? "City updated successfully"
              : "City added successfully"
          );
          setVisible(false);
          form.resetFields();
          getData();
        })
        .catch((error) => {
          console.error("Error adding/updating city.", error);
          message.error("Error adding/updating city.");
        });
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <div className={style["add-container"]}>
      <Button
        type="primary"
        className={style["add-btn"]}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add City
      </Button>
      <div style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={cities}
          loading={loading}
          rowKey="id"
        />
      </div>
      <Modal
        title={selectedCity ? "Edit City" : "Add City"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="text"
            label="Text"
            rules={[{ required: true, message: "Please enter the text" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="images"
            label="images"
            rules={[{ required: true, message: "Please enter the text" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Cities;
