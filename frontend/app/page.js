import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import uniqid from "uniqid";
import HabitList from "./HabitList";

export default async function Home() {
  const habits = await getHabitData();

  async function getHabitData() {
    console.log(process.env.API_URL);
    const res = await fetch(process.env.API_URL + "/habit/all", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    return res.json();
  }

  return (
    <div>
      <div className="flex items-center">
        <p className="text-3xl w-fit rounded">Habits</p>
        <Link href="/createHabit">
          <div
            className="ml-4 p-2 rounded-full bg-white w-fit transition-all duration-150 hover:cursor-pointer
				 hover:bg-gray-800 hover:text-white"
          >
            <AiOutlinePlus size={35} />
          </div>
        </Link>
      </div>
      <HabitList habits={habits} />
    </div>
  );
}
