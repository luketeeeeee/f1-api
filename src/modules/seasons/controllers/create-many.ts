import { Request, Response } from 'express';
import { createManySeasons } from '../services';

export const createMany = async (req: Request, res: Response) => {
  const seasons = req.body;

  try {
    const newSeasons = await createManySeasons(seasons);
    return res.status(200).json({
      message: 'seasons successfully created',
      data: newSeasons,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
