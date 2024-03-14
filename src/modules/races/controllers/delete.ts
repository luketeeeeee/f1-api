import { Request, Response } from 'express';

export const remove = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: 'internal server error',
    });
  }
};
