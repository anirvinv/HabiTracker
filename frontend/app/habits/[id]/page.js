import uniqid from "uniqid";
import CheckinForm from "./CheckinForm";
import DeleteButton from "./DeleteHabit";
import Checkin from "./Checkin";

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
    <div className="w-fit h-fit">
      <div className="flex items-center p-2 my-2 w-fit bg-white rounded shadow">
        <p className="text-3xl">{habit.name}</p>
        <DeleteButton habit_id={params.id} />
      </div>
      <div className="p-2 my-2 w-fit bg-white rounded shadow">
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
      {getCheckinForm()}
      <p className="text-xl mt-3">Checkins</p>
      <div className="mt-3 flex flex-wrap">
        {checkinData.map((checkin) => {
          return <Checkin key={uniqid()} checkin={checkin} />;
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
