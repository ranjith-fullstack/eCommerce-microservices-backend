const Product = require('../models/productModel');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getFilteredProducts = async (req, res) => {
  const { category, priceRange, searchTerm } = req.query;
  let query = {};

  if (category && category !== 'all') {
    query.category = category;
  }

  if (priceRange && priceRange !== 'all') {
    switch (priceRange) {
      case 'under-50':
        query.price = { $lt: 50 };
        break;
      case '50-100':
        query.price = { $gte: 50, $lte: 100 };
        break;
      case 'over-100':
        query.price = { $gt: 100 };
        break;
      default:
        break;
    }
  }

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } }
    ];
  }

  try {
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
