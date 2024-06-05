import { Request, Response } from 'express';
import { findSeasonByYear } from '../services';

export const findByYear = async (req: Request, res: Response) => {
  const { param_year } = req.params;

  try {
    const season = await findSeasonByYear(param_year);

    if (!season) {
      return res.status(404).json({
        message: `${param_year} season not found`,
      });
    }

    return res.status(200).json({
      data: {
        season,
      },
      message: `${param_year} season found`,
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: (error as Error).message },
    });
  }
};
