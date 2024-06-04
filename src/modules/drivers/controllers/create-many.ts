import { Request, Response } from 'express';
import { createManyDrivers } from '../services';

export const createMany = async (req: Request, res: Response) => {
  const drivers = req.body;

  try {
    const newDrivers = await createManyDrivers(drivers);

    return res.status(200).json({
      message: 'drivers successfully created',
      data: newDrivers,
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: (error as Error).message },
    });
  }
};
