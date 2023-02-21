import Holidays from 'date-holidays';

const countryHolidays = new Holidays();

export const isHoliday = (countryCode, date) => {
  countryHolidays.init(countryCode);
  const holiday = countryHolidays.isHoliday(date);

  return holiday ? holiday : [];
};

export const getHolidays = (country, year) => {
  countryHolidays.init(country);
  const holidays = countryHolidays.getHolidays(year).map((holiday) => {
    return {
      ...holiday,
      code: country + '_' + holiday.date.substring(0, 10),
    };
  });
  return holidays;
};
