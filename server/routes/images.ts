import express from 'express';

import { searchImages } from '../controllers/images';

const router = express.Router();

router.post('/', searchImages);

export default router;