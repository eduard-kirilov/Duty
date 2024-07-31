import React from "react";
import { Select } from "antd";
import { Label } from "./Label";

import { devsOptions } from "./devsInfo";

export const SelectPerson = ({ label, ...props }) => {
  return (
    <Label label={label}>
      <Select
        showSearch
        placeholder="Выберите сотрудника"
        optionFilterProp="children"
        className="select"
        allowClear
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={devsOptions}
        {...props}
      />
    </Label>
  );
};
