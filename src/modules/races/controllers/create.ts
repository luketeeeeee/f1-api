import { Request, Response } from 'express';
import { createRace } from '../services';
import { updateSeason } from '../../seasons/services';
import { relatedObjects } from '../../types';

export const create = async (req: Request, res: Response) => {
  const { seasonYear, name, race_datetime, circuit, ...body } = req.body;

  try {
    const newRace = await createRace({ name, race_datetime, circuit, ...body });

    await updateSeason(seasonYear, {}, relatedObjects.race, newRace.id);

    return res.status(200).json({
      message: 'race created successfully',
      data: newRace,
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: (error as Error).message },
    });
  }
};
