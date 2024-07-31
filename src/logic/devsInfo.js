import Moment from "moment";
import { extendMoment } from "moment-range";
import { groundZeroDate, persons, initialTelegram } from "../inputData";
import "moment/locale/ru";
const moment = extendMoment(Moment);

export const groundZeroMoment = moment(groundZeroDate);

export const devsInfo = persons.map((v, id) => ({ ...v, id: id + 1 }));

export const iamInitialId = devsInfo.find(
  (v) => v.telegram === initialTelegram
).id;

export const devsCount = devsInfo.length;

export const devsOptions = devsInfo.map((v) => ({
  value: v.id,
  label: v.name,
}));
