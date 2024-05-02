import { Request, Response } from 'express';
import { findSeasonByYear } from '../services';
import { findRacesByYear } from '../../races/services';
import { findDriversByYear } from '../../drivers/services';

export const findByYear = async (req: Request, res: Response) => {
  const { param_year } = req.params;

  try {
    const season = await findSeasonByYear(param_year);

    if (!season) {
      return res.status(404).json({
        message: `${param_year} season not found`,
      });
    }

    const seasonRaces = await findRacesByYear(param_year);
    const seasonDrivers = await findDriversByYear(param_year);

    return res.status(200).json({
      data: {
        season,
        races: seasonRaces.sort((race1, race2) => {
          return race1.race_number - race2.race_number;
        }),
        drivers: seasonDrivers,
      },
      message: `${param_year} season finded`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
