import { Request, Response } from 'express';
import { findSeasonByYear } from '../services';

export const findByYear = async (req: Request, res: Response) => {
  try {
    const { year } = req.params;

    const season = await findSeasonByYear(year);

    if (!season) {
      return res.status(404).json({
        message: `${year} season not found`,
      });
    }

    return res.status(200).json({
      data: season,
      message: `${year} season finded`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
