import { Request, Response } from 'express';
import { deleteSeason, findSeasonByYear } from '../services';

export const remove = async (req: Request, res: Response) => {
  try {
    const { param_year } = req.params;

    const seasonToDelete = findSeasonByYear(param_year);

    if (!seasonToDelete) {
      return res.status(404).json({
        message: 'season not found',
      });
    }

    await deleteSeason(param_year);

    return res.status(200).json({
      message: `successfully deleted season ${param_year}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
