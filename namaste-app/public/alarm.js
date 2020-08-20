// Change the periodInMinutes property to set time interval

/*global chrome*/
var alarm = chrome.alarms.create("yoga_alarm", {
  delayInMinutes: 1,
  periodInMinutes: 120,
});

chrome.alarms.onAlarm.addListener(function (alarm) {
  var notification = chrome.notifications.create(
    "take-a-yoga-break-notification",
    {
      type: "basic",
      iconUrl: "logo192.png", // Replace with your own image

      // Customize either the notification title or message
      title: "Take a yoga break!",
      message: "Refresh your mind and body with a quick stretch!",
    },

    function () {}
  );
});
