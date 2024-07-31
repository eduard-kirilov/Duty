import Moment from "moment";
import { extendMoment } from "moment-range";
import { devsCount, devsInfo, groundZeroMoment } from "./devsInfo";
import { uncommonFreeDays, uncommonWorkDays } from "./calendarChanges";
import "moment/locale/ru";
const moment = extendMoment(Moment);

moment.updateLocale("ru");

const isDateFree = (date) =>
  !uncommonWorkDays.includes(date.format("YYYY-MM-DD")) &&
  (date.day() === 0 ||
    date.day() === 6 ||
    uncommonFreeDays.includes(date.format("YYYY-MM-DD")));

const formatName = ({ name = "", id = "" }, iamId) =>
  id === iamId ? "я" : name;

// Возвращает индексы трех сотрудников от devsInfo для ближайших трех дней от заданной даты
const findDevsIndexes = (date) => {
  const s =
    date.diff(groundZeroMoment, "day") -
    Array.from(moment.range(groundZeroMoment, date).by("day")).filter(
      isDateFree
    ).length;
  return [s % devsCount, (s + 1) % devsCount, (s + 2) % devsCount];
};

// Формирует текст для копирования в буфер обмена
const makeLine = (name, telegram, nextName, nextNextName, dayNumber) => {
  const todayLine = `▶️ Сегодня ${
    name === "я" ? `дежурю я` : `дежурит ${name}`
  } ${name === "я" ? "" : telegram}`;
  const nextLine =
    dayNumber === 5 ? `В понедельник ${nextName}` : `Завтра ${nextName}`;
  const nextNextLine =
    dayNumber === 4
      ? `В понедельник ${nextNextName}`
      : dayNumber === 5
      ? `Во вторник ${nextNextName}`
      : `Послезавтра ${nextNextName}`;

  return `\n${todayLine}\n\n${nextLine}\n${nextNextLine}\n`;
};

// Возвращает массив который рендерится в плитки
export const getDejArray = (start, end, filteredId = null, iamId = null) => {
  if (!start || !end) return [];
  let changedStart = start;
  switch (start.day()) {
    case 0:
      changedStart = start.clone().add(1, "day");
      break;
    case 6:
      changedStart = start.clone().add(2, "day");
      break;
    default:
      changedStart = start.clone().subtract(start.day() - 1, "days");
      break;
  }

  return Array.from(moment.range(changedStart, end).by("day"))
    .map((mDate) => {
      const date = mDate.format("D MMMM (dd)");
      const key = mDate.format("YYYY-MM-DD");
      const baseReturnObj = {
        dateMoment: mDate.clone(),
        date,
        key,
      };
      if (isDateFree(mDate)) return baseReturnObj;

      const [i, iNext, iNextNext] = findDevsIndexes(mDate);
      const name = formatName(devsInfo[i], iamId);
      const nextName = formatName(devsInfo[iNext], iamId);
      const nextNextName = formatName(devsInfo[iNextNext], iamId);
      return {
        ...baseReturnObj,
        id: devsInfo[i].id,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        text: makeLine(
          name,
          devsInfo[i].telegram,
          nextName,
          nextNextName,
          mDate.day()
        ),
      };
    })
    .filter((v) => (filteredId ? v.id === filteredId : true));
};

export const equalMoment = (one, two) =>
  Boolean(one && two && one.format("YYYY-MM-DD") === two.format("YYYY-MM-DD"));
