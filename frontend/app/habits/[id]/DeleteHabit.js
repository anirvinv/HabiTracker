"use client";

import Modal from "@/app/(utils)/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ habit_id }) {
  const router = useRouter();
  let [showPopup, setShowPopup] = useState(false);

  function deleteHabit() {
    fetch(process.env.API_URL + "/habit/" + habit_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.refresh();
        router.replace("/");
      });
  }
  return (
    <>
      <div
        onClick={() => {
          setShowPopup(true);
        }}
        className="p-1 bg-red-500 text-white rounded ml-2 hover:cursor-pointer 
        transition-all duration-100 ease-linear hover:bg-red-700"
      >
        delete
      </div>
      <div className={!showPopup ? "hidden" : ""}>
        <Modal>
          <div className=" absolute p-4 rounded bg-white">
            <div className="flex flex-col h-full items-center justify-center">
              <p className="mb-3">Are you sure you want to delete?</p>
              <div className="flex items-center justify-center">
                <div
                  onClick={deleteHabit}
                  className="p-2 bg-red-500 rounded shadow text-white cursor-pointer hover:bg-red-600 transition-all ease-linear duration-75 mr-4"
                >
                  Delete
                </div>
                <div
                  onClick={() => {
                    setShowPopup(false);
                  }}
                  className="p-2 bg-gray-300 rounded shadow text-white cursor-pointer hover:bg-gray-400 transition-all ease-linear duration-75"
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
