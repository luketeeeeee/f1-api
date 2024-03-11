import { Request, Response } from 'express';
import { createSeason } from '../services';

export const create = async (req: Request, res: Response) => {
  try {
    const { year, drivers_champion, constructors_champion } = req.body;

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
