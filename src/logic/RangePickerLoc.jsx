import React from "react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { groundZeroMoment } from "./devsInfo";
import { Label } from "./Label";

export const RangePickerLoc = ({ label, dateFrom, ...props }) => {
  return (
    <Label label="Период отображения" width={220}>
      <RangePicker
        disabledDate={(d) => d.isBefore(groundZeroMoment)}
        format="DD.MM.YYYY"
        {...props}
      />
    </Label>
  );
};
