import Holidays from 'date-holidays';
import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';
const countryHolidays = new Holidays();

export const viewAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { year, country } = req.body;
    countryHolidays.init(country);
    const holidays = countryHolidays.getHolidays(year).map((holiday) => {
      return {
        ...holiday,
        code: country + holiday.date.substring(0, 11),
      };
    });

    const page = req.query.page as unknown as number;
    const limit = req.query.limit as unknown as number;
    res.customSuccess(200, `List of holidays for ${year} and country ${country}`, paginate(page, limit, holidays));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};

export const viewById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const codeArray = req.params.code.split('_');
    const countryCode = codeArray[0];
    const date = new Date(codeArray[1]);

    countryHolidays.init(countryCode);
    const holiday = countryHolidays.isHoliday(date);
    res.customSuccess(200, `Holiday for ${date} and country ${countryCode}`, holiday ? holiday : []);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};

function paginate(page = 1, limit = 10, list = []) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return { holidays: list.slice(startIndex, endIndex), page, limit };
}
