import Holidays from 'date-holidays';
import { Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const view = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { year, country } = req.body;
    // Import is weird as library does not have good TypeScript support
    const countryHolidays = new Holidays(country);

    res.customSuccess(200, `List of holidays for ${year} and country ${country}`, countryHolidays.getHolidays(year));
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
