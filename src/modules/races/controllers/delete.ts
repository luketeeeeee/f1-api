import { Request, Response } from 'express';
import { deleteRace, findRaceById } from '../services';

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const raceToDelete = await findRaceById(id);

    if (!raceToDelete) {
      return res.status(404).json({
        message: 'race not found',
      });
    }

    await deleteRace(id);

    return res.status(200).json({
      message: 'successfully deleted race',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
