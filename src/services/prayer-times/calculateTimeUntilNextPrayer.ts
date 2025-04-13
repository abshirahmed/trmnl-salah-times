export const calculateTimeUntilNextPrayer = (
  currentTime: number,
  nextPrayerTime: number,
  isTomorrow: boolean,
): number => {
  const currentHours = Math.floor(currentTime / 100);
  const currentMinutes = currentTime % 100;
  const nextHours = Math.floor(nextPrayerTime / 100);
  const nextMinutes = nextPrayerTime % 100;

  let minutesUntil;

  if (isTomorrow) {
    // Next prayer is tomorrow (Fajr)
    minutesUntil =
      24 * 60 -
      (currentHours * 60 + currentMinutes) +
      (nextHours * 60 + nextMinutes);
  } else {
    // Next prayer is today
    minutesUntil =
      nextHours * 60 + nextMinutes - (currentHours * 60 + currentMinutes);
  }

  return minutesUntil;
};
