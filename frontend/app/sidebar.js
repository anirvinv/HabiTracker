"use client";

import Link from "next/link";
import { FaFire } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";
import { BiDumbbell } from "react-icons/bi";
import { useState, useRef } from "react";

const SideBarIcon = ({ icon, href, hoverText }) => {
	let hoverElement = useRef(null);
	let [show, setShow] = useState(false);

	return (
		<div className="w-full h-24 flex items-center justify-center">
			<div
				className={`icon-div w-fit h-fit ease-in-out transition-all duration-150 hover:bg-gray-900 rounded-full p-4 flex`}
				onMouseEnter={() => {
					setShow(true);
				}}
				onMouseLeave={() => {
					setShow(false);
				}}
			>
				<Link href={href}>{icon}</Link>

				<div
					ref={hoverElement}
					className={
						"fixed translate-x-3 transition-all duration-100 ease-linear bg-inherit p-4 rounded-md " +
						(show ? "translate-x-[5rem] opacity-100" : "opacity-0")
					}
				>
					{hoverText}
				</div>
			</div>
		</div>
	);
};

export default function Sidebar() {
	return (
		<div className="fixed top-0 left-0 h-screen w-24 flex flex-col text-white bg-gray-800 m-0 shadow-lg justify-between">
			<div>
				<SideBarIcon
					icon={<AiFillHome size={50} />}
					href="/"
					hoverText={"Home"}
				/>
				<SideBarIcon
					icon={<BiDumbbell size={50} />}
					href="/habits"
					hoverText={"My Habits"}
				/>
				<SideBarIcon
					icon={<FaFire size={50} />}
					href="/streaks"
					hoverText={"My streak"}
				/>
			</div>
			<div>
				<SideBarIcon
					icon={<BsFillGearFill size={50} />}
					href="/settings"
					hoverText={"Settings"}
				/>
			</div>
		</div>
	);
}
