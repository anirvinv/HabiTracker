"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export default function CheckinForm({ fetchURL, checkinData }) {
  const router = useRouter();
  let notes = useRef(null);
  let inputDate = useRef(null);

  let [disabled, setDisabled] = useState(false);

  function alreadyCheckedIn() {
    let inputString = getInputDate().toLocaleString();
    if (checkinData == null) return false;
    for (let i = 0; i < checkinData.length; i++) {
      if (
        new Date(checkinData[i].checkinDate).toLocaleString() === inputString
      ) {
        return true;
      }
    }
    return false;
  }
  function getInputDate() {
    if (inputDate.current.value == "") {
      return null;
    }
    // return inputDate.current.value.split("-");
    const arr = inputDate.current.value.split("-");
    return new Date(`${arr[1]}/${arr[2]}/${arr[0]}`);
  }

  function checkin() {
    // console.log(getFormattedDate());
    // setTimeout(() => {
    //   checkinButton.current.setAttribute("disabled", false);
    // }, 200);
    // setDisabled(true);
    // if (alreadyCheckedIn()) {
    //   alert("Already checked in today");
    //   return;
    // }
    if (getInputDate() == null) {
      alert("Please choose a date");
      return;
    }
    if (alreadyCheckedIn()) {
      alert("Already checked in at this date");
      return;
    }

    fetch(fetchURL, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkinDate: getInputDate(),
        notes: notes.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        router.refresh(); // have to speed this up with state instead of refetching everytime
      });
  }

  function getTodayString() {
    let year = `${new Date().getFullYear()}`;
    let month = `${new Date().getMonth() + 1}`;
    let day = `${new Date().getDate()}`;
    if (day.length < 2) {
      day = "0" + day;
    }
    if (month.length < 2) {
      month = "0" + month;
    }
    const res = `${year}-${month}-${day}`;
    console.log(res);
    return res;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center mt-4">
        <button
          disabled={disabled}
          onClick={checkin}
          className="flex justify-center items-center bg-white p-3 rounded-full w-fit h-fit
                  hover:bg-slate-800 hover:text-white transition-all ease-linear duration-100 hover:cursor-pointer"
        >
          <AiFillCheckCircle size={35} />
          <p className="mx-3">Check In</p>
        </button>
        <input
          ref={inputDate}
          className="mx-3 rounded p-1 h-fit"
          type="date"
          defaultValue={getTodayString()}
        />
        <textarea
          ref={notes}
          className="outline-none block h-fit w-fit mx-3 px-3 py-1.5 text-base font-normaltext-gray-700 
  bg-white bg-clip-padding border border-solid border-gray-300 rounded 
  transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
  focus:border-gray-600 focus:outline-none"
          type="text"
          placeholder="(Optional) Notes"
        />
      </div>
    </div>
  );
}
