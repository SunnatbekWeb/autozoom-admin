import React, { useEffect, useState, useMemo } from "react";
import { Table } from "antd";
import styles from "./Cities.module.css";

const apiUrl = "https://autoapi.dezinfeksiyatashkent.uz/api/cities";

const InternalTable = ({ rawData }) => {
  if (!Array.isArray(rawData)) {
    rawData = [rawData];
  }

  const hasData = useMemo(() => rawData.some((item) => item), [rawData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Images",
      dataIndex: "img",
      key: "img",
      render: () => <input className={styles["download-input"]} type="file" />,
    },
    {
      title: "Delete",
      key: "delete",
      render: () => <button className={styles["delete-btn"]}>Delete</button>,
    },
    {
      title: "Updated",
      key: "updated",
      render: () => <button className={styles["update-btn"]}>Update</button>,
    },
    {
      title: "Updated",
      key: "updated",
      render: () => <button className={styles["update-btn"]}>Update</button>,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={rawData}
      pagination={false}
      scroll={{ y: 400 }}
    />
  );
};

const Cities = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePostData = async () => {
    try {
      const dataToSend = {
        name: "John Doe",
        title: "Example Title",
        img: "https://example.com/image.jpg",
      };
      await postData(dataToSend);
      fetchData();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const postData = async (data) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Response:", result);
    } catch (error) {
      console.error("Error posting data:", error);
      throw error;
    }
  };

  return (
    <div>
      <InternalTable rawData={data} />
    </div>
  );
};

export default Cities;
