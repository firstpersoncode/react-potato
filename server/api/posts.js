import fakeDB from '../fake-db';

const OK = 200;
const NOT_FOUND = 200;
export default (router) => {
  router.route('/').get((req, res) => {
    setTimeout(() => {
      res.status(OK).json(fakeDB);
    }, 300);
  });

  router.route('/:slug').get((req, res) => {
    const index = fakeDB.findIndex((el) => el.slug === req.params.slug);
    if (index < 0) {
      res.status(NOT_FOUND).json({
        error: 'Post does not exist in db',
      });
    }

    setTimeout(() => {
      res.status(OK).json(fakeDB[index]);
    }, 300);
  });
};
