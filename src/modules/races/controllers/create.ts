import { Request, Response } from 'express';
import { createRace } from '../services';
import { updateSeason } from '../../seasons/services';

export const create = async (req: Request, res: Response) => {
  try {
    const { seasonYear, name, race_datetime, circuit, ...body } = req.body;

    const newRace = await createRace({ name, race_datetime, circuit, ...body });

    await updateSeason(seasonYear, {}, newRace.id);

    return res.status(200).json({
      message: 'race created successfully',
      data: newRace,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
