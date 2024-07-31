import React, { useEffect, useState } from "react";
import { classList } from "./classList";
import { equalMoment } from "./getDejArray";
import "moment/locale/ru";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);

function copyToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export const DayCard = ({
  text,
  name,
  date,
  dateMoment,
  onClick,
  clearCopyMarks,
  lastCopiedDate,
}) => {
  const [copyAnimation, setCopyAnimation] = useState(false);
  const [copied, setCopied] = useState(false);
  const isPastDay = dateMoment.isBefore(moment());
  const isWeekend = !text;
  const isToday = equalMoment(dateMoment, moment());
  const isLastCopiedDate = equalMoment(dateMoment, lastCopiedDate);

  useEffect(() => setCopied(false), [clearCopyMarks]);

  useEffect(() => {
    if (!copied && copyAnimation) {
      setCopied(true);
    }
  }, [copyAnimation, copied]);

  return (
    <div
      className={classList([
        "card",
        copyAnimation && "copyAnimation",
        copied && "copied",
        isPastDay && "isPastDay",
        isWeekend && "isWeekend",
        isLastCopiedDate && "isLastCopiedDate",
      ])}
      role="button"
      onClick={
        !isWeekend
          ? () => {
              onClick?.();
              copyToClipboard(text);
              setCopyAnimation(true);
              setTimeout(() => setCopyAnimation(false), 1000);
            }
          : undefined
      }
    >
      {isToday && <div className="isToday" />}
      <div className="card-date">{date}</div>
      <div>{name}</div>
    </div>
  );
};
