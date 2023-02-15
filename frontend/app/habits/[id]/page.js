import uniqid from "uniqid";
import CheckinForm from "./CheckinForm";
import UndoButton from "./UndoCheckinButton";

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

  if (!data.ok) {
    return "Page not found";
  }
  const res = await data.json();

  let Promises = new Array(res.checkin_ids.length);
  for (let i = 0; i < res.checkin_ids.length; i++) {
    Promises[i] = getCheckinData(res.checkin_ids[i]);
  }

  // parallel fetching happens here
  let checkinData = await Promise.all(Promises);

  function getCurrentStreak() {
    // need to implement this according to chosen schedule

    if (checkinData.length == 0) return 0;
    if (checkinData.length == 1) return 1;
    let streak = 1;
    for (let i = checkinData.length - 1; i >= 1; i--) {
      let currDate = new Date(checkinData[i].createdAt);
      let prevDate = new Date(checkinData[i - 1].createdAt);

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
          lastCheckinDate={null}
          fetchURL={process.env.API_URL + `/habit/${params.id}`}
        />
      );
    }
    return (
      <CheckinForm
        lastCheckinDate={checkinData[checkinData.length - 1].createdAt}
        fetchURL={process.env.API_URL + `/habit/${params.id}`}
      />
    );
  }

  return (
    <div>
      <p className="text-3xl">{res.name}</p>
      <p className="text-xl mt-3">Checkins</p>

      <div className="mt-3 flex flex-wrap">
        {checkinData.map((checkin) => {
          return (
            <div key={uniqid()} className="p-4 rounded bg-white mr-3">
              <p className="text-xs font-semibold text-gray-700/40">
                Checkin Date: {new Date(checkin.createdAt).toLocaleDateString()}
              </p>
              <p>Notes:</p>
              <p>{checkin.notes}</p>
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
      <p className="text-xl mt-3">Weekly Schedule</p>
      <div className="flex flex-wrap">
        {days.map((day, i) => {
          return (
            <div
              key={uniqid()}
              className={
                "p-5 w-20 text-lg mr-4 mt-3 transition-all ease-linear duration-300 rounded " +
                (res.weeklySchedule[i] ? "bg-green-300" : "bg-white")
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
    </div>
  );
}
