import React from "react";
import "antd/dist/antd.css";
import axios from "axios";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  AutoComplete,
} from "antd";

const { Option } = Select;

const AddCar = () => {
  const [form] = Form.useForm();

  function submitForm(values) {
    console.log(values);

    axios
      .post("url+parameters")
      .then((response) => {
        if (response.status === 200) {
          console.log("Car details are added");
        }
        //   console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div style={{ fontSize: "30px" }}>Add Car</div>
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 5,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={submitForm}
      >
        <Form.Item label="Number" name="number">
          <Input />
        </Form.Item>

        <Form.Item label="Make" name="make">
          <Input />
        </Form.Item>

        <Form.Item label="Model" name="model">
          <Input />
        </Form.Item>

        <Form.Item label="Color" name="color">
          <Input />
        </Form.Item>

        <Form.Item label="Capacity" name="capacity">
          <Input />
        </Form.Item>

        <Form.Item
          name="build"
          label="Build"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select build type!",
          //   },
          // ]}
        >
          <Select placeholder="select">
            <Option value="SUV">SUV</Option>
            <Option value="Hatchback">Hatchback</Option>
            <Option value="Sedan">Sedan</Option>
          </Select>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Add Car
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
