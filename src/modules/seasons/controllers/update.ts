import { Request, Response } from 'express';
import { findSeasonByYear, updateSeason } from '../services';

export const update = async (req: Request, res: Response) => {
  const { param_year } = req.params;
  const { year, drivers_champion, constructors_champion } = req.body;

  try {
    const existingSeason = await findSeasonByYear(param_year);

    if (!existingSeason) {
      return res.status(404).json({
        message: 'season not found',
      });
    }

    const updatedSeason = await updateSeason(param_year, {
      year,
      drivers_champion,
      constructors_champion,
    });

    return res.status(200).json({
      message: 'season successfully updated',
      data: updatedSeason,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'interval server error',
    });
  }
};
