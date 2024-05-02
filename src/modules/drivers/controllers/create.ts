import { Request, Response } from 'express';
import { createDriver } from '../services';
import { updateSeason } from '../../seasons/services';
import { relatedObjects } from '../../types';
import { isSeasonYearValid } from '../../../utils/isSeasonYearValid';

export const create = async (req: Request, res: Response) => {
  const { name, nationality, is_competing_in_f1, is_alive, ...body } = req.body;
  const competed_seasons: string[] = body.competed_seasons;

  try {
    // colocar esse laço numa função validateSeasonsYearsArray
    for (let i = 0; i < competed_seasons.length; i++) {
      const validatedSeasonYear = await isSeasonYearValid(competed_seasons[i]);

      if (!validatedSeasonYear) {
        return res.status(422).json({
          message: `the ${competed_seasons[i]} season has not yet been created in the database or is not between 1950 and the current year`,
        });
      }
    }

    const newDriver = await createDriver({
      name,
      nationality,
      is_competing_in_f1,
      is_alive,
      ...body,
    });

    competed_seasons.forEach(async (season) => {
      console.log('teste');
      await updateSeason(season, {}, relatedObjects.driver, newDriver.id);
    });

    return res.status(200).json({
      message: 'driver created successfully',
      data: newDriver,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
