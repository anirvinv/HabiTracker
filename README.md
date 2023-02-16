# HabiTracker

Track your habits and checkin everyday to maintain the streak.

## Features:
1. Set your own schedule for specific habits
   1. Eg. workout Monday, Tuesday, Thursday
2. Daily checkin
3. Write notes/description of habits
4. Keep track of streaks
   1. streaks are calculated according to schedule for a particular habit
5. Yearly view of habit checkins, similar to github activity log

## To Do:
\#4: Calculate streaks based on habit schedule

Add all streaks and highlights in the streaks tab. So anytime there is a streak even of length 2, show it in that tab for each habit

Implement: Stopped habits feature where user cant checkin, but can see the checkin history

__ISSUES__:
If the checkin button is clicked multiple times very quickly, the browser doesnt have enough time to check that the user already signed in.
^^ Solution: make a checkins state and also for 

Caching API calls for SSR is not working as intended.

![alt text](frontend/public/s1.jpg)
![alt text](frontend/public/s2.jpg)
![alt text](frontend/public/s3.jpg)