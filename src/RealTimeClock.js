/*:
 * @plugindesc Introduces a real time clock with events automatically fired at
 * specific times.
 * @author Brendan
 *
 * @param MinuteTriggerEvent
 * @desc The name of the common event to fire when the clock ticks up a minute.
 * @default realtime_event_minute
 *
 * @param HourTriggerEvent
 * @desc The name of the common event to fire when the clock ticks up an hour.
 * @default realtime_event_hour
 *
 * @param DayTriggerEvent
 * @desc The name of the common event to fire when the clock ticks up a day.
 * @default realtime_event_day
 *
 * @param HourTickover
 * @desc At which minute is the new hour triggered? (Accepts range 0-59).
 * @default 0
 *
 * @param DayTickover
 * @desc At which hour is the new day triggered? (Accepts range 0-23).
 * @default 0
 *
 * @help
 * The Real Time Clock plugin adds the client time into your RPG Maker MV
 * project and provides a couple of handy event triggers. There are three
 * events that are triggered from the clock: one for when the minutes tick
 * over, one for the hours, and one for the days.
 *
 * The point at which the hours and days tick over can be changed by adjusting
 * the plugins parameters. For example, setting the HourTickover parameter to
 * 20 will trigger the hour event when the clock reaches 20 past the hour. Also
 * setting the DayTickover parameter to 6 will trigger the day event when the
 * clock reaches 6:20.
 *
 * Note: All times are in the 24 hour clock ranging from 0:00 - 23:59.
 *
 * The events follow a heirarchy and only one will trigger at once. On the
 * break point of a new day, all three events should technically fire but only
 * the day event will be triggered. The heirarchy is as follows:
 *
 * Day > Hour > Minute
 */

(function() {
  let date;
  let minuteEvent;
  let hourEvent;
  let dayEvent;
  let parameters;

  init();

  function init() {
    date = new Date();
    parameters = PluginManager.parameters('RealTimeClock');

    updateClockOnSecond();
  }

  function updateClockOnSecond() {
    const seconds = new Date().getSeconds();

    if (seconds === 0) {
      updateClockOnMinute();
    } else {
      setTimeout(updateClockOnSecond, 1000);
    }
  }

  function updateClockOnMinute() {
    date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    console.log(`${hours}:${minutes}`);

    fireTimedEvents(minutes, hours);

    setTimeout(updateClockOnMinute, 60000);
  }

  function fireTimedEvents(minutes, hours) {
    fireMinuteEvent();

    if (minutes === 0) {
      fireHourEvent();
    }

    if (hours === 0 && minutes === 0) {
      fireDayEvent();
    }
  }

  function fireMinuteEvent() {
    const event = getMinuteEvent();
    fireEvent(event);
  }

  function fireHourEvent() {
    const event = getHourEvent();
    fireEvent(event);
  }

  function fireDayEvent() {
    const event = getDayEvent();
    fireEvent(event);
  }

  function getMinuteEvent() {
    if (!minuteEvent) {
      minuteEvent = findCommonEvent(parameters['MinuteTriggerEvent']);
    }

    return minuteEvent;
  }

  function getHourEvent() {
    if (!hourEvent) {
      hourEvent = findCommonEvent(parameters['HourTriggerEvent']);
    }

    return hourEvent;
  }

  function getDayEvent() {
    if (!dayEvent) {
      dayEvent = findCommonEvent(parameters['DayTriggerEvent']);
    }

    return dayEvent;
  }

  function fireEvent(event) {
    if (event) {
      $gameTemp.reserveCommonEvent(event.id);
    }
  }

  function findCommonEvent(key) {
    if (!$dataCommonEvents) {
      return;
    }

    if (typeof(key) != 'string' ) {
      return;
    }

    for (let i = 0; i < $dataCommonEvents.length; i++) {
      if ($dataCommonEvents[i] && $dataCommonEvents[i].name === key) {
        return $dataCommonEvents[i];
      }
    }

    return;
  }
})();
