"use client";

import { useEffect, useState } from "react";
import uniqid from "uniqid";

export default function YearlyView({ checkinIDs }) {
  let [year, setYear] = useState(new Date().getFullYear());
  let [checkinDates, setCheckinDates] = useState(null);
  useEffect(() => {
    let fetchCount = checkinIDs.length;
    let dates = new Array(checkinIDs.length);
    if (checkinIDs.length == 0) {
      setCheckinDates(dates);
    }
    for (let i = 0; i < checkinIDs.length; i++) {
      fetch(process.env.API_URL + "/checkin/" + checkinIDs[i], {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          fetchCount--;
          dates[i] = new Date(data.createdAt).toLocaleDateString();
          if (fetchCount == 0) {
            setCheckinDates(dates);
            console.log(dates);
          }
        });
    }
  }, []);

  let fakeData = [
    new Date().toLocaleDateString(),
    new Date(2023, 0, 1).toLocaleDateString(),
  ];

  function getCalendarMonths() {
    let months = [];
    let lastDay = new Date(year + 1, 0, 1);
    let currMonth = 0;
    let days = [];
    for (
      let d = new Date(year, 0, 1);
      d <= lastDay;
      d.setDate(d.getDate() + 1)
    ) {
      if (d.getMonth() != currMonth) {
        months.push(days);
        currMonth = d.getMonth();
        days = [];
      }
      days.push(d.toLocaleDateString());
    }
    return months;
  }

  if (checkinDates == null) {
    return (
      <div className="flex flex-col justify-center">
        <div className="bg-white w-fit rounded-t-md p-1 shadow">
          <button className="text-sm text-gray-400/70 mx-1">{"<"}</button>
          {year}
          <button className="text-sm text-gray-400/70 mx-1">{">"}</button>
        </div>
        <div className="flex flex-wrap bg-white shadow p-5 rounded-b-md">
          {getCalendarMonths().map((month) => {
            return (
              <div
                key={uniqid()}
                className="grid grid-cols-7 gap-[1px] h-fit mr-3"
              >
                {month.map((day) => {
                  return (
                    <div
                      key={uniqid()}
                      className="w-2.5 h-2.5 bg-slate-300/50
                    rounded-full"
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="bg-white w-fit rounded-t-md p-1 shadow">
        <button
          className="text-sm text-gray-400/70 mx-1"
          onClick={() => {
            setYear(year + 1);
          }}
        >
          {"<"}
        </button>
        {year}
        <button
          className="text-sm text-gray-400/70 mx-1"
          onClick={() => {
            setYear(year - 1);
          }}
        >
          {">"}
        </button>
      </div>
      <div className="flex flex-wrap bg-white shadow p-5 rounded-b-md">
        {getCalendarMonths().map((month) => {
          return (
            <div
              key={uniqid()}
              className="grid grid-cols-7 gap-[1px] h-fit mr-3"
            >
              {month.map((day) => {
                if (checkinDates.includes(day)) {
                  return (
                    <div
                      key={uniqid()}
                      className="w-2.5 h-2.5 bg-emerald-500
                    rounded-full"
                    ></div>
                  );
                }
                return (
                  <div
                    key={uniqid()}
                    className="w-2.5 h-2.5 bg-slate-300/50
                    rounded-full"
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
