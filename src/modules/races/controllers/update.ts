import { Request, Response } from 'express';
import { findRaceById, updateRace } from '../services';

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    race_datetime,
    quali_datetime,
    sprint_datetime,
    fp3_datetime,
    fp2_datetime,
    fp1_datetime,
    winner,
    circuit,
  } = req.body;

  try {
    const existingRace = await findRaceById(id);

    if (!existingRace) {
      return res.status(404).json({
        message: 'race not found',
      });
    }

    const updatedRace = await updateRace(id, {
      name,
      race_datetime,
      quali_datetime,
      sprint_datetime,
      fp3_datetime,
      fp2_datetime,
      fp1_datetime,
      winner,
      circuit,
    });

    return res.status(200).json({
      message: 'race successfully updated',
      data: updatedRace,
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: (error as Error).message },
    });
  }
};
