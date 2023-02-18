"use client";
import uniqid from "uniqid";

export default function Habit({ habit, checkin_data }) {
  function checkinsAreConsecutive(checkin1, checkin2) {
    let date1 = new Date(checkin1.checkinDate);
    let date2 = new Date(checkin2.checkinDate);

    let ws = habit.weeklySchedule;
    let idx1 = date1.getDay(),
      idx2 = date2.getDay();
    let idx = (idx1 + 1) % 7;
    console.log(`${idx1}, ${idx2}`);
    while (idx != idx2) {
      if (ws[idx]) return false;
      idx++;
      idx %= 7;
    }
    let res = Math.ceil((date2 - date1) / (1000 * 3600 * 24)) < 7;
    console.log(
      `${date1.toLocaleDateString()} ${date2.toLocaleDateString()} res: ${res}`
    );
    return res;
  }

  function getStreaks() {
    // only check for dates that are in the weekly schedule, the other checkins are extras
    let checkins = checkin_data.filter((checkin) => {
      return habit.weeklySchedule[new Date(checkin.checkinDate).getDay()];
    });
    checkins.sort(function (checkin1, checkin2) {
      return new Date(checkin1.checkinDate) - new Date(checkin2.checkinDate);
    });

    if (checkins.length == 0) return [];
    let streaks = [[new Date(checkins[0].checkinDate).toLocaleDateString()]];
    for (let i = 1; i < checkins.length; i++) {
      // if i checkin is next to i-1 checkin, then add to current streak, else create a new streak
      if (checkinsAreConsecutive(checkins[i - 1], checkins[i])) {
        streaks[streaks.length - 1].push(
          new Date(checkins[i].checkinDate).toLocaleDateString()
        );
      } else {
        streaks.push([new Date(checkins[i].checkinDate).toLocaleDateString()]);
      }
    }
    return streaks.filter((streak) => {
      return streak.length > 1;
    });
  }

  return (
    <div className="flex flex-wrap">
      {/* {JSON.stringify(checkin_data[0])} */}
      <div className="my-2">
        <div className="mr-2 p-2 bg-white w-fit rounded shadow">
          {habit.name}
        </div>
        {getStreaks().map((streak_arr) => {
          return (
            <div className="flex flex-wrap text-white bg-gradient-to-r from-teal-700 to-emerald-500 shadow mr-2 my-2 p-2 rounded">
              {streak_arr.map((streak) => {
                return <div className="mx-2">{streak}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
