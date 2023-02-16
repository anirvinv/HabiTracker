import uniqid from "uniqid";
import CheckinForm from "./CheckinForm";
import UndoButton from "./UndoCheckinButton";
import DeleteButton from "./DeleteHabit";

export default async function habitID({ params }) {
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  const data = await fetch(process.env.API_URL + "/habit/" + params.id, {
    cache: "no-cache",
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  async function getCheckinData(id) {
    const data = await fetch(process.env.API_URL + "/checkin/" + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data.json();
  }

  if (!data.ok || data == null) {
    return "Page not found";
  }
  const habit = await data.json();

  if (habit == null) {
    return "Page not found";
  }
  let Promises = new Array(habit.checkin_ids.length);
  for (let i = 0; i < habit.checkin_ids.length; i++) {
    Promises[i] = getCheckinData(habit.checkin_ids[i]);
  }

  // parallel fetching happens here
  let checkinData = await Promise.all(Promises);

  function getCurrentStreak() {
    // need to implement this according to chosen schedule

    if (checkinData.length == 0) return 0;
    if (checkinData.length == 1) return 1;
    let streak = 1;
    for (let i = checkinData.length - 1; i >= 1; i--) {
      let currDate = new Date(checkinData[i].checkinDate);
      let prevDate = new Date(checkinData[i - 1].checkinDate);

      prevDate.setDate(prevDate.getDate() + 1);
      if (prevDate.toLocaleDateString() !== currDate.toLocaleDateString()) {
        break;
      }
      streak++;
    }
    return streak;
  }
  function getCheckinForm() {
    if (checkinData.length == 0) {
      return (
        <CheckinForm
          checkinData={null}
          fetchURL={process.env.API_URL + `/habit/${params.id}`}
        />
      );
    }
    return (
      <CheckinForm
        checkinData={checkinData}
        fetchURL={process.env.API_URL + `/habit/${params.id}`}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center p-2 my-2 w-fit bg-white rounded shadow-sm">
        <p className="text-3xl">{habit.name}</p>
        <DeleteButton habit_id={params.id} />
      </div>
      <div className="p-2 my-2 w-fit">
        <p className="text-xl ">Description</p>
        <p className="text-md">{habit.description}</p>
      </div>

      <p className="text-xl mt-3">Weekly Schedule</p>
      <div className="flex flex-wrap">
        {days.map((day, i) => {
          return (
            <div
              key={uniqid()}
              className={
                "p-5 w-20 text-lg mr-4 mt-3 transition-all ease-linear duration-300 rounded " +
                (habit.weeklySchedule[i] ? "bg-green-300" : "bg-white")
              }
            >
              {day}
            </div>
          );
        })}
      </div>
      <p className="text-xl mt-5 mb-3">
        Current Streak: {getCurrentStreak() > 1 ? "🔥" : ""}
        {getCurrentStreak()}
      </p>
      {getCheckinForm()}
      <p className="text-xl mt-3">Checkins</p>
      <div className="mt-3 flex flex-wrap">
        {checkinData.map((checkin) => {
          return (
            <div
              key={uniqid()}
              className="p-4 rounded bg-white mr-3 w-56 max-h-56"
            >
              <p className="text-xs font-semibold text-gray-700/40 ">
                Checkin Date:{" "}
                {new Date(checkin.checkinDate).toLocaleDateString()}
              </p>
              <p>Notes:</p>
              <div
                className={
                  "overflow-auto w-full h-1/2" +
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
              {/* TO DO: the user can undo checkin ONLY if the checkin date is today  */}
              <UndoButton checkin_id={checkin._id} />
            </div>
          );
        })}
        {checkinData.length == 0 ? (
          <p className="mb-3 text-lg text-gray-600">
            You haven't checked in yet!
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
