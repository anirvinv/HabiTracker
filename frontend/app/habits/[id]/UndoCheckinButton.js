"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";

export default function UndoButton({ checkin_id }) {
  const router = useRouter();

  let [disabled, setDisabled] = useState(false);

  function deleteCheckin() {
    setDisabled(true);
    fetch(process.env.API_URL + "/checkin/" + checkin_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.refresh();
      });
  }

  return (
    <button
      disabled={disabled}
      onClick={deleteCheckin}
      className="transition-all text-red-500 hover:text-red-600 ml-2"
    >
      <IoTrashBinSharp size={30} />
    </button>
  );
}
