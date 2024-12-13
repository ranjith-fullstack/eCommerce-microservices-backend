const Favorite = require('../models/favoritesModel');

// Add a product to favorites

exports.addFavorite = async (req, res) => {
  const { userId, product } = req.body;

  if (!product || !product._id) {
    return res.status(400).json({ message: 'Product _id is required' });
  }

  try {
    // Check if the product is already in favorites
    const existingFavorite = await Favorite.findOne({ userId, 'product._id': product._id });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Product is already in favorites' });
    }

    const favorite = new Favorite({ userId, product });
    await favorite.save();

    res.status(200).json({ message: 'Product added to favorites', favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add favorite', error });
  }
};

// Remove a product from favorites
exports.removeFavorite = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const favorite = await Favorite.findOneAndDelete({ userId, 'product._id': productId });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Product removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove favorite', error });
  }
};


// Get all favorites for a user
exports.getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const favorites = await Favorite.find({ userId });
    res.status(200).json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch favorites', error });
  }
};
