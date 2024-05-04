import { Request, Response } from 'express';
import { findAllSeasons } from '../services';

export const findAll = async (req: Request, res: Response) => {
  try {
    const allSeasons = await findAllSeasons();

    return res.status(200).json({
      message: 'all seasons found',
      data: allSeasons.sort((season1, season2) => {
        return Number(season1.year) - Number(season2.year);
      }),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
