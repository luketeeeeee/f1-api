import express from 'express';
import { SeasonController } from './controllers';

const router = express.Router();

router.route('/').get(SeasonController.findAll);
router.route('/:param_year').get(SeasonController.findByYear);
router.route('/').post(SeasonController.create);
router.route('/many').post(SeasonController.createMany);
router.route('/:param_year').put(SeasonController.update);
router.route('/:param_year').delete(SeasonController.remove);

export default router;
