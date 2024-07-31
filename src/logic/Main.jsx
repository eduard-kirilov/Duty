import "./styles.css";
import "antd/dist/antd.css";
import React, { useState, useMemo, useCallback } from "react";
import Moment from "moment";
import { extendMoment } from "moment-range";
import { devsInfo, iamInitialId } from "./devsInfo";
import { DayCard } from "./DayCard";
import { Space, Button } from "antd";
import { getDejArray } from "./getDejArray";
import { SelectPerson } from "./SelectPerson";
import { RangePickerLoc } from "./RangePickerLoc";
const moment = extendMoment(Moment);

const today = moment();
const todayPlusMonth = today.clone().add(1, "months");
const todayPlus3Months = today.clone().add(3, "months");

export const Main = () => {
  const [filteredId, setFilteredId] = useState(null);
  const [iamId, setIamId] = useState(iamInitialId);

  const [dateFrom, setDateFrom] = useState(today);
  const [dateTo, setDateTo] = useState(todayPlusMonth);

  const [lastCopiedDate, setLastCopiedDate] = useState(null);

  const handleNextMonth = useCallback(() => {
    setDateFrom(today);
    setDateTo(todayPlusMonth);
  }, []);

  const handleNextThreeMonths = useCallback(() => {
    setDateFrom(today);
    setDateTo(todayPlus3Months);
  }, []);

  const [clearCopyMarks, setClearCopyMarks] = useState(false);
  const handleClearCopyMarks = useCallback(() => {
    setClearCopyMarks((prev) => !prev);
    setLastCopiedDate(null);
  }, []);

  const handleSelectFiltered = useCallback((v) => setFilteredId(v), []);
  const handleSelectIam = useCallback((v) => setIamId(v), []);

  const list = useMemo(
    () => getDejArray(dateFrom, dateTo, filteredId, iamId),
    [dateFrom, dateTo, filteredId, iamId]
  );

  return (
    <Space direction="vertical" size={30} wrap>
      <Space direction="vertical" size={10} wrap>
        <Space size={10} wrap>
          <SelectPerson label="Я" value={iamId} onChange={handleSelectIam} />
        </Space>
        <Space size={10} wrap>
          <RangePickerLoc
            value={[dateFrom, dateTo]}
            onChange={([from, to]) => {
              setDateFrom(from);
              setDateTo(to);
            }}
          />
          <SelectPerson label="Фильтр по" onChange={handleSelectFiltered} />
        </Space>
        <Space size={10} wrap>
          <Button onClick={handleNextMonth}>Ближайший месяц</Button>
          <Button onClick={handleNextThreeMonths}>Ближайшие 3 месяца</Button>
          <Button onClick={handleClearCopyMarks}>
            Очистить отметки о копировании
          </Button>
        </Space>
      </Space>
      <Space size={10} wrap className="dayCardsContainer">
        {list.map((p) => (
          <DayCard
            {...p}
            clearCopyMarks={clearCopyMarks}
            onClick={() => setLastCopiedDate(p.dateMoment)}
            lastCopiedDate={lastCopiedDate}
          />
        ))}
      </Space>
    </Space>
  );
};
