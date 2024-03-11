import express from 'express';
import { SeasonController } from './controllers';

const router = express.Router();

router.route('/').get(SeasonController.findAll);
router.route('/:year').get(SeasonController.findByYear);
router.route('/').post(SeasonController.create);
// router.route('/:year').put(SeasonController.update);
// router.route('/:year').delete(SeasonController.delete);

export default router;
