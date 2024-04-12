import { Request, Response } from 'express';
import { createDriver } from '../services/create-driver';
import { updateSeason } from '../../seasons/services';
import { relatedObjects } from '../../types';
import { isSeasonYearValid } from '../../../utils/isSeasonYearValid';

export const create = async (req: Request, res: Response) => {
  try {
    const { name, nationality, is_competing_in_f1, is_alive, ...body } = req.body;
    const competed_seasons: string[] = body.competed_seasons;

    const newDriver = await createDriver({
      name,
      nationality,
      is_competing_in_f1,
      is_alive,
      ...body,
    });

    if (competed_seasons.length > 0) {
      competed_seasons.forEach(async (season) => {
        if (!isSeasonYearValid(season)) {
          return res.status(422).json({
            message:
              "competed seasons can't be minor than 1950 ou greater than the current year",
          });
        }

        await updateSeason(season, {}, relatedObjects.driver, newDriver.id);
      });

      return res.status(200).json({
        message: 'driver create successfully',
        data: newDriver,
      });
    }

    return res.status(200).json({
      message: 'driver created successfully',
      data: newDriver,
    });
  } catch (error) {}
};
