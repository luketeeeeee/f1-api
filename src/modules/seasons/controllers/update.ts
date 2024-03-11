import { Request, Response } from 'express';

export const update = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: 'interval server error',
    });
  }
};
