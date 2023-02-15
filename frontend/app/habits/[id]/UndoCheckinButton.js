"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
      className="text-xs shadow shadow-gray-300 transition-all hover:bg-gray-800 mt-3 p-2 hover:text-white rounded-full"
    >
      Undo Checkin
    </button>
  );
}
