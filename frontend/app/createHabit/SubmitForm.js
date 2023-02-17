"use client";

import { useRouter } from "next/navigation";
import uniqid from "uniqid";
import { useRef, useState } from "react";

export default function SubmitForm() {
  const router = useRouter();
  let habitName = useRef(null);
  let habitDesc = useRef(null);
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let [week, setWeek] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  let makeHabit = () => {
    if (habitName.current.value === "") {
      alert("Habit must have a name");
      return;
    }

    fetch(process.env.API_URL + "/habit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: habitName.current.value,
        description: habitDesc.current.value,
        weeklySchedule: week,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        router.refresh();
        router.replace("/");
      });
  };

  return (
    <div className="w-full h-full">
      <p className="text-2xl w-fit">Create Habit</p>
      <input
        ref={habitName}
        onClick={() => {}}
        type="text"
        className="outline-none block w-fit px-3 py-1.5 text-base font-normaltext-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
        placeholder="Habit Name"
      />
      <div className="mt-3">
        <p className="text-2xl">Pick Weekly Schedule</p>
        <div className="flex flex-wrap">
          {days.map((day, i) => {
            return (
              <div
                key={uniqid()}
                className={
                  "p-5 text-lg mr-4 mt-3 transition-all ease-linear duration-300 hover:cursor-pointer rounded w-20 " +
                  (week[i] ? "bg-green-300" : "bg-white")
                }
                onClick={() => {
                  let newWeek = [...week];
                  newWeek[i] = !newWeek[i];
                  setWeek(newWeek);
                }}
              >
                {day}
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-2xl w-fit">Description</p>
        <textarea
          ref={habitDesc}
          onClick={() => {}}
          className="outline-none block w-2/3 px-3 py-1.5 text-base font-normaltext-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded 
                transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-600 focus:outline-none"
          placeholder="Habit Name"
        />

        <button
          className="px-3 py-2 mt-4 text-lg bg-white rounded transition-all ease-linear 
                    duration-150 hover:bg-gray-700 hover:text-white"
          onClick={makeHabit}
        >
          Create
        </button>
      </div>
    </div>
  );
}
