exports.parseQuery = async (req, res, next) => {
    if (!req.query) next();

    const { q, _limit, _page, _sort } = req.query;
    const limit = _limit ? Number(_limit) : 25;
    const page = _page ? Number(_page) + 1 : 1;
    const sort = _sort ? _sort.split(':') : ['name'];
    if (sort[1] === 'desc') {
      sort[0] = `-${sort[0]}`;
    }

    req.body = {...req.body, queryParams: {q, limit, page, sort: sort[0]}};
    next();
};