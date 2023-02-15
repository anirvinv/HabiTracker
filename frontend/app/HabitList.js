"use client";
import Link from "next/link";
import uniqid from "uniqid";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function HabitList({ habits }) {
  // const router = useRouter();
  // useEffect(() => {
  //   habits.forEach((habit) => {
  //     router.prefetch(`/habit/${habit.id}`);
  //   });
  // }, []);

  return (
    <div className="flex flex-wrap">
      {habits.map((habit) => {
        return (
          <Link key={uniqid()} href={`/habits/${habit._id}`}>
            <div className="p-4 rounded bg-white mr-6 mt-6">
              <p className="text-lg">{habit.name}</p>
              <p className="text-sm py-2 text-gray-800/80">Weekly schedule</p>
              <div className="flex py-2">
                {habit.weeklySchedule.map((day, i) => {
                  return (
                    <div
                      key={uniqid()}
                      className={
                        "w-6 h-6 rounded mr-1 border-solid border-2 border-gray-300/40 " +
                        (day ? "bg-green-400" : " bg-white-400")
                      }
                    ></div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500/80">
                Started on {new Date(habit.createdAt).toDateString()}
              </p>
            </div>
          </Link>
        );
      })}
      {habits.length == 0 ? (
        <p className="mt-5 text-xl text-gray-600">
          No habits yet...get to work!
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
