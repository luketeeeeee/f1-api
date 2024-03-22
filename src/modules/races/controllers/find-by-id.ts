import { Request, Response } from 'express';
import { findRaceById } from '../services';

export const findById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const race = await findRaceById(id);

    if (!race) {
      return res.status(404).json({
        message: 'race not found',
      });
    }

    return res.status(200).json({
      data: race,
      message: 'successfully found race',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
