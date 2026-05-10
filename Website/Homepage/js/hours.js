/**
 * Markiert die Zeile mit dem aktuellen Wochentag in einer
 * `.hours-list` als `.today`. Erwartet `data-day` mit JavaScript-
 * Konvention (0 = Sonntag, 1 = Montag, …, 6 = Samstag).
 */
export function initHoursToday() {
  const today = new Date().getDay();
  document.querySelectorAll('.hours-list .hours-row').forEach((row) => {
    if (Number(row.dataset.day) === today) row.classList.add('today');
  });
}
