import React, { useState } from "react";
import { Input, Button, Form, Select, Upload, Space, message, Radio } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { TextArea } = Input;

function VideoUploadPage() {
  const fileList = [];

  const uploadProps = {
    name: "file",
    multiple: true,
    action: "https://run.mocky.io/v3/3c5a2214-4ddf-4663-9d4f-888d6ecf6656",
    defaultFileList: [...fileList],
    listType: "picture",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [VideoTitle, setVideoTitle] = useState("");
  const [VideoDesc, setVideoDesc] = useState("");
  const [Private, setPrivate] = useState(0);
  const [Category, setCategory] = useState("Film");

  const PrivateOptions = [
    { value: 0, label: "Public" },
    { value: 1, label: "Private" },
  ];

  const CategoryOptions = [
    { value: 0, label: "Animals" },
    { value: 1, label: "Film" },
    { value: 2, label: "Music" },
    { value: 3, label: "Sports" },
  ];

  const onTitleChange = (param) => {
    setVideoTitle(param.currentTarget.value);
  };

  const onDescChange = (param) => {
    setVideoDesc(param.currentTarget.value);
  };

  const onPrivateChange = (param) => {
    console.log(param.target.value);
    setPrivate(param.target.value);
  };

  const onCategoryChange = (param) => {
    setCategory(param);
  };

  return (
    <div style={{ maxWidth: "700px", width: "80%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1>Upload Video</h1>
      </div>

      <Form onSubmit>
        {/* DROP ZONE =================================================== */}
        <Dragger {...uploadProps}>
          <br />
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <br />
        </Dragger>
        <br />
        <br />

        {/* VIDEO TITLE =================================================== */}
        <h3>Title</h3>
        <Input onChange={onTitleChange} value={VideoTitle} />
        <br />
        <br />

        {/* VIDEO DESCRIPTIONS ============================================ */}
        <h3>Description</h3>
        <TextArea rows={5} onChange={onDescChange} value={VideoDesc} />
        <br />
        <br />

        {/* SELECT OPTIONS ================================================ */}
        <h3>Settings</h3>
        {/* <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Space>
            <Select defaultValue={Private} onChange={onPrivateChange} style={{ width: 120 }}>
              {PrivateOptions.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>

            <Select defaultValue={Category} onChange={onCategoryChange} style={{ width: 120 }}>
              {CategoryOptions.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Space>

          <Button type="primary" onClick>
            Submit
          </Button>
        </div> */}

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Space>
            <Radio.Group
              options={PrivateOptions}
              onChange={onPrivateChange}
              value={Private}
              optionType="button"
              buttonStyle="solid"
            ></Radio.Group>

            <Select placeholder="Category" onChange={onCategoryChange} style={{ width: 120 }}>
              {CategoryOptions.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          </Space>

          <Button type="primary" onClick>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default VideoUploadPage;
