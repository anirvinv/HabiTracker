# HabiTracker

Track your habits and checkin everyday to maintain the streak.

## Features:
1. Set your own schedule for specific habits
   1. Eg. workout Monday, Tuesday, Thursday
2. Daily checkin
3. Write notes/description of habits
4. Keep track of streaks
   1. streaks are calculated according to schedule for a particular habit
5. Yearly view of habit checkins

## To Do:
\#4: Calculate streaks based on habit schedule
Figure out router stuff ==> refetch data when navigating from Create habit to Home page.
I think router.push() does it?

Add "notebook" view of calendars.
eg. <Habit> | <checkin1> <checkin2> .... -- almost done i think

--- be able to swap between year, month, and week in the habit view

Add all streaks and highlights in the streaks tab. So anytime there is a streak even of length 2, show it in that tab for each habit


__ISSUES__:
If the checkin button is clicked multiple times very quickly, the browser doesnt have enough time to check that the user already signed in.
^^ Solution: make a checkins state and also for 


Overlying problem:
fetching is happening way too often, slowing down performance. Use state to store client side information instead of refetching data and reloading the website. 

