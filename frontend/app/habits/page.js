import Link from "next/link";
import uniqid from "uniqid";
import YearlyView from "./YearlyView";

export default async function Page() {
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
    <div className="flex flex-col items-center">
      {habits.map((habit) => {
        return (
          <div key={uniqid()} className="flex flex-wrap">
            <div className="w-fit">
              <Link href={`/habits/${habit._id}`}>
                <div className="p-4 w-fit rounded bg-white mr-6 mt-6">
                  <p className="text-lg">{habit.name}</p>
                  <p className="text-sm py-2 text-gray-800/80">
                    Weekly schedule
                  </p>
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
                    Started on {new Date(habit.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </div>
            <YearlyView checkinIDs={habit.checkin_ids} habit={habit} />
          </div>
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
