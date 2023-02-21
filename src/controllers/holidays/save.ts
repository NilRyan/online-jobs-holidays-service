import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Holiday } from 'orm/entities/holidays/Holiday';
import { CustomError } from 'utils/response/custom-error/CustomError';

import { isHoliday } from './utils/holidays';

export const saveHoliday = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.jwtPayload;
    const { code } = req.body;
    const holidayRepository = getRepository(Holiday);
    const existingHolidaySaved = await holidayRepository.findOne({
      where: {
        user_id: id,
        holiday_code: code,
      },
    });
    if (existingHolidaySaved) {
      return next(new CustomError(400, 'Raw', `Holiday already saved!`, null));
    }
    const codeArray = code.split('_');
    const countryCode = codeArray[0];
    const date = new Date(codeArray[1]);
    const dateIsHoliday = isHoliday(countryCode, date);

    if (dateIsHoliday.length === 0) {
      return next(new CustomError(404, 'Raw', `Date is not a holiday`, null));
    }
    const holiday = new Holiday();
    holiday.holiday_code = code;
    holiday.user_id = id.toString();
    holiday.start = dateIsHoliday[0].start.toISOString();
    holiday.date = dateIsHoliday[0].date;
    holiday.end = dateIsHoliday[0].end.toISOString();

    const holidaySaved = await holidayRepository.save(holiday);
    res.customSuccess(200, `Holiday saved`, holidaySaved);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't save holiday.`, null, err);
    return next(customError);
  }
};

export const unsaveHoliday = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.jwtPayload;
    const { code } = req.body;
    const holidayRepository = getRepository(Holiday);
    const existingHolidaySaved = await holidayRepository.findOne({
      where: {
        user_id: id,
        holiday_code: code,
      },
    });
    if (!existingHolidaySaved) {
      return next(new CustomError(403, 'Raw', `Unable to delete saved holiday.`, null));
    }
    if (existingHolidaySaved) {
      await holidayRepository.remove(existingHolidaySaved);
    }
    res.customSuccess(200, `Holiday removed`, existingHolidaySaved);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};

export const viewSaved = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.jwtPayload;
    console.log(id);
    const holidayRepository = getRepository(Holiday);
    const holidaysSaved = await holidayRepository.find({
      where: {
        user_id: id,
      },
    });
    res.customSuccess(200, `List of holidays saved`, holidaysSaved);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
