import { Router } from 'express';
import fakeDB from '../fake-db';
const router = new Router();

router.get('/', (req, res) => {
  setTimeout(() => {
    res.status(200).json(fakeDB);
  }, 300);
});

router.get('/:slug', (req, res) => {
  const index = fakeDB.findIndex((el) => el.slug === req.params.slug);
  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db',
    });
  }

  setTimeout(() => {
    res.status(200).json(fakeDB[index]);
  }, 300);
});

module.exports = router;
