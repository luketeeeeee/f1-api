import { Request, Response } from 'express';
import { createManySeasons } from '../services';

export const createMany = async (req: Request, res: Response) => {
  try {
    const seasons = req.body;

    const newSeasons = await createManySeasons(seasons);

    return res.status(200).json({
      message: 'seasons successfully created',
      data: newSeasons,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
