const cache = require('memory-cache');

const cacheMiddleware = async (req, res, next) => {
  const cacheKey = req.url;
  const cachedResponse = cache.get(cacheKey);
  if (cachedResponse) return res.json(cachedResponse);
  next();
};

module.exports = cacheMiddleware;