import express from 'express';
import { RaceController } from './controllers';

const router = express.Router();

// router.route('/').get(RaceController.findAll)
router.route('/').post(RaceController.create);
// router.route('/:parameter').put(RaceController.update)

export default router;
