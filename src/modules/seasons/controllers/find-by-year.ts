import { Request, Response } from 'express';
import { findSeasonByYear } from '../services';
import { findRacesByYear } from '../../races/services/find-races-by-year';

export const findByYear = async (req: Request, res: Response) => {
  try {
    const { param_year } = req.params;

    const season = await findSeasonByYear(param_year);

    if (!season) {
      return res.status(404).json({
        message: `${param_year} season not found`,
      });
    }

    const seasonRaces = await findRacesByYear(param_year);

    return res.status(200).json({
      data: { season, seasonRaces },
      message: `${param_year} season finded`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
