import { Request, Response } from 'express';
import { findDriverById } from '../services';

export const findById = (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingDriver = findDriverById(id);

    if (!existingDriver) {
      return res.status(404).json({
        message: 'driver not found',
      });
    }

    return res.status(200).json({
      data: existingDriver,
      message: 'driver founded',
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: (error as Error).message },
    });
  }
};
