import React from "react";
import { Table } from "antd";
import styles from "./Cities.module.css";

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
    dataIndex: "delete",
    key: "delete",
    render: () => <button className={styles["delete-btn"]}>Delete</button>,
  },

  {
    title: "Updated",
    dataIndex: "updated",
    key: "updated",
    render: () => <button className={styles["update-btn"]}>Update</button>,
  },
];
const data = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
];

const Cities = () => {
  return (
    <div>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              {record.description}
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        dataSource={data}
      />
    </div>
  );
};

export default Cities;
