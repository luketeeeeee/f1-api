import { Request, Response } from 'express';
import { deleteDriver, findDriverById } from '../services';

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingDriver = await findDriverById(id);

    if (!existingDriver) {
      return res.status(404).json({
        message: 'driver not found',
      });
    }

    await deleteDriver(id);

    return res.status(200).json({
      message: `successfully deleted driver with id: ${id}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: (error as Error).message },
    });
  }
};
