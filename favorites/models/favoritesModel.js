const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      _id: { type: String, required: true }, // Use `_id` instead of `id`
      name: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Favorite', FavoriteSchema);
