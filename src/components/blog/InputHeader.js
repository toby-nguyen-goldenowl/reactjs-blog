import React, { useState } from "react";
import { Input } from "antd";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";

const InputHeader = () => {
  const [value, setValue] = useState("");
  const data = useSelector((state) => state.blog.data);

  return (
    <>
      <Input
        placeholder="Search"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
      {data &&
        Object.keys(data)
          .filter((key) => {
            const blogItem = data[key];
            if (value === "") {
              return blogItem;
            }
            if (blogItem.title.toLowerCase().includes(value.toLowerCase())) {
              return blogItem;
            }
            return null;
          })
          .map((key) => console.log(data[key]))}
    </>
  );
};

export default InputHeader;
