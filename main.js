const computeAge = () => {
  const currentDate = new Date();
  const selectedDate = new Date(document.getElementById("birthdate-input").value);

  const birthDetails = {
    date: selectedDate.getDate(),
    month: selectedDate.getMonth() + 1,
    year: selectedDate.getFullYear(),
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  if (isFutureBirthDate(birthDetails, currentYear, currentMonth, currentDay)) {
    alert("Not Born Yet");
    showResult("-", "-", "-");
    return;
  }

  const { ageYears, ageMonths, ageDays } = calculateAgeDifference(
    birthDetails,
    currentYear,
    currentMonth,
    currentDay
  );

  showResult(ageDays, ageMonths, ageYears);
};

const isFutureBirthDate = (birthDetails, currentYear, currentMonth, currentDay) => {
  return (
    birthDetails.year > currentYear ||
    (birthDetails.year === currentYear &&
      (birthDetails.month > currentMonth ||
        (birthDetails.month === currentMonth &&
          birthDetails.date > currentDay)))
  );
};

const calculateAgeDifference = (birthDetails, currentYear, currentMonth, currentDay) => {
  let ageYears = currentYear - birthDetails.year;
  let ageMonths, ageDays;

  if (currentMonth < birthDetails.month) {
    ageYears--;
    ageMonths = 12 - (birthDetails.month - currentMonth);
  } else {
    ageMonths = currentMonth - birthDetails.month;
  }

  if (currentDay < birthDetails.date) {
    ageMonths--;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInPreviousMonth = getNumberOfDaysInMonth(previousMonth, currentYear);
    ageDays = daysInPreviousMonth - (birthDetails.date - currentDay);
  } else {
    ageDays = currentDay - birthDetails.date;
  }
  return { ageYears, ageMonths, ageDays };
};

const getNumberOfDaysInMonth = (month, year) => {
  const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInEachMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return daysInEachMonth[month - 1];
};

const showResult = (days, months, years) => {
  document.getElementById("age-years").textContent = years;
  document.getElementById("age-months").textContent = months;
  document.getElementById("age-days").textContent = days;
};

document.getElementById("calculate-age-button").addEventListener("click", computeAge);
