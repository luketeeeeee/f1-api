import express from 'express';
import { RaceController } from './controllers';

const router = express.Router();

// router.route('/').get(RaceController.findAll)
router.route('/:id').get(RaceController.findById);
router.route('/').post(RaceController.create);
router.route('/:id').put(RaceController.update);
router.route('/:id').delete(RaceController.remove);

export default router;
