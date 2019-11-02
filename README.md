# Real Time Clock

The Real Time Clock plugin adds the client time into your RPG Maker MV project and provides a couple of handy event triggers. There are three events that are triggered from the clock: one for when the minutes tick over, one for the hours, and one for the days.

The point at which the hours and days tick over can be changed by adjusting the plugins parameters. For example, setting the HourTickover parameter to 20 will trigger the hour event when the clock reaches 20 past the hour. Also setting the DayTickover parameter to 6 will trigger the day event when the clock reaches 6:20.

*Note: All times are in the 24 hour clock ranging from 0:00 - 23:59.*

The events follow a heirarchy and only one will trigger at once. On the break point of a new day, all three events should technically fire but only the day event will be triggered. The heirarchy is as follows:

*Day > Hour > Minute*

---

## Parameters

- MinuteTriggerEvent
  - The name of the common event to fire when the clock ticks up a minute.
  - default: realtime_event_minute
- HourTriggerEvent
  - The name of the common event to fire when the clock ticks up an hour.
  - default: realtime_event_hour
- DayTriggerEvent
  - The name of the common event to fire when the clock ticks up a day.
  - default: realtime_event_day
- HourTickover
  - At which minute is the new hour triggered? (Accepts range 0-59).
  - default: 0
- DayTickover
  - At which hour is the new day triggered? (Accepts range 0-23).
  - default: 0

---

## Installation

Simply copy the RealTimeClock.js file into your plugins folder.

---

## Version History

### v1.0.0

- Initial version released.
- Trigger events every minute, every hour, and every day.
- Able to change the names of the common events that are triggered.

---

Made with ✨
