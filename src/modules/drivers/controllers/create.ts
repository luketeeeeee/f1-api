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

    competed_seasons.length > 0
      ? competed_seasons.forEach(async (season) => {
          if (isSeasonYearValid(season)) {
            await updateSeason(season, {}, relatedObjects.driver, newDriver.id);
          }
        })
      : console.log('just for the commit');

    return res.status(200).json({
      message: 'driver created successfully',
      data: newDriver,
    });
  } catch (error) {}
};
