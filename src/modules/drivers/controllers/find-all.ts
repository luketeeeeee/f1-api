import { Request, Response } from 'express';
import { findAllDrivers } from '../services';

export const findAll = async (req: Request, res: Response) => {
  try {
    const allDrivers = await findAllDrivers();

    return res.status(200).json({
      message: 'all drivers found',
      data: allDrivers,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
