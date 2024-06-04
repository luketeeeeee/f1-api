import { Request, Response } from 'express';
import { createSeason, findSeasonByYear } from '../services';
import { isSeasonYearValid } from '../../../utils/isSeasonYearValid';

export const create = async (req: Request, res: Response) => {
  const { year, drivers_champion, constructors_champion } = req.body;

  try {
    if (!isSeasonYearValid(year)) {
      return res.status(422).json({
        message: "year can't be minor than 1950 or greater than the current year",
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
      message: { error: (error as Error).message },
    });
  }
};
