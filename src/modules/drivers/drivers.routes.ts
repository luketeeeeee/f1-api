import express from 'express';
import { DriverController } from './controllers';

const router = express.Router();

router.route('/').get(DriverController.findAll);
router.route('/:id').get(DriverController.findById);
router.route('/').post(DriverController.create);
// router.route('/many').post(DriverController.createMany);
// router.route('/:id').put(DriverController.update);
router.route('/:id').delete(DriverController.remove);

export default router;
