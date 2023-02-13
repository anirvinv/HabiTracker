"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

export default function CheckinForm({ fetchURL, lastCheckinDate }) {
	const router = useRouter();
	let notes = useRef(null);
	function alreadyCheckedIn() {
		if (lastCheckinDate == null) {
			return false;
		}
		return (
			new Date(lastCheckinDate).toLocaleDateString() ==
			new Date().toLocaleDateString()
		);
	}

	function checkin() {
		if (alreadyCheckedIn()) {
			alert("Already checked in today");
			return;
		}
		fetch(fetchURL, {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				notes: notes.current.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(JSON.stringify(data));
				router.refresh();
			});
	}

	return (
		<div className="flex flex-wrap">
			<div
				onClick={checkin}
				className="flex justify-center items-center bg-white p-3 rounded-full w-fit h-fit
                    hover:bg-slate-800 hover:text-white transition-all ease-linear duration-100 hover:cursor-pointer"
			>
				<AiFillCheckCircle size={35} />
				<p className="mx-3">Check In</p>
			</div>
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
	);
}
