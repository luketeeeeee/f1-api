import { Request, Response } from 'express';
import { createSeason, findSeasonByYear } from '../services';

export const create = async (req: Request, res: Response) => {
  try {
    const { year, drivers_champion, constructors_champion } = req.body;

    const currentYear = new Date().getFullYear();

    if (year > currentYear || year < 1950) {
      return res.status(422).json({
        message: "year can't be less than 1950 or greater than 2024",
      });
    }

    const existingSeason = await findSeasonByYear(year);

    if (existingSeason) {
      return res.status(409).json({
        message: `season ${year} already exists`,
      });
    }

    const newSeason = await createSeason({
      year,
      drivers_champion,
      constructors_champion,
    });

    return res.status(201).json({
      message: 'season created successfully',
      data: newSeason,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
