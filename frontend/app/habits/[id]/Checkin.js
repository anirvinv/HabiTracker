"use client";
import { useState } from "react";
import UndoButton from "./UndoCheckinButton";

export default function Checkin({ checkin }) {
  let [show, setShow] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-white mr-3 w-56 max-h-56 relative">
      <div className="flex items-center">
        <p className="h-fit text-lg font-semibold w-full text-white p-1 bg-green-400 rounded-lg shadow text-center">
          {new Date(checkin.checkinDate).toLocaleDateString()}
        </p>
        <UndoButton checkin_id={checkin._id} />
      </div>
      <button
        onClick={() => {
          setShow(!show);
        }}
        className="text-sm p-2 shadow m-auto rounded transition-all duration-75 hover:bg-gray-500 hover:text-white mt-2"
      >
        Show Notes
      </button>
      <Notes checkin={checkin} show={show} />
      {/* TO DO: the user can undo checkin ONLY if the checkin date is today  */}
    </div>
  );
}

function Notes({ checkin, show }) {
  return (
    <div
      className={
        !show ? "hidden" : "absolute bg-inherit w-full z-10 shadow rounded"
      }
    >
      <div
        className={
          "overflow-auto w-full h-20" +
          (checkin.notes == "" ? " flex items-center h-1/3" : "")
        }
      >
        <p
          className={
            checkin.notes == ""
              ? "h-fit w-full text-center text-gray-700/60"
              : ""
          }
        >
          {checkin.notes}
          {checkin.notes == "" ? "No notes" : ""}
        </p>
      </div>
    </div>
  );
}
