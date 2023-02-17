async function getAllCheckins(checkinIDs) {
  // point is to filter by habit id LATER instead of grouping them into subarrays
  let promises = new Array(checkinIDs.length);
  for (let i = 0; i < checkinIDs.length; i++) {
    promises[i] = getCheckinData(checkinIDs[i]);
  }
  let data = await Promise.all(promises);
  return data;
}

async function getCheckinData(id) {
  const data = await fetch(process.env.API_URL + "/checkin/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  // returns a promise
  return data.json();
}
function getCheckinIDs(habits) {
  let checkins = [];
  for (let i = 0; i < habits.length; i++) {
    checkins.push(...habits[i].checkin_ids);
  }
  return checkins;
}

export default async function Streaks() {
  let res = await fetch(process.env.API_URL + "/habit/all");
  let habits = await res.json();
  const checkin_ids = getCheckinIDs(habits);
  const checkin_data = await getAllCheckins(checkin_ids);

  return (
    <div className="">
      {habits.map((habit) => {
        return (
          <div className="flex flex-wrap">
            <div className="mr-2">{habit.name}</div>
            {checkin_data
              .filter((checkin) => {
                return checkin.habit_id === habit._id;
              })
              .map((checkin) => {
                return (
                  <div className="mr-2">
                    {new Date(checkin.checkinDate).toLocaleDateString()}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
