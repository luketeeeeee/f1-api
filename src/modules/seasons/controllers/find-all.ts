import { Request, Response } from 'express';
import { findAllSeasons } from '../services';

export const findAll = async (req: Request, res: Response) => {
  try {
    const allSeasons = findAllSeasons();

    return res.status(200).json({
      message: 'all seasons finded',
      data: allSeasons,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
