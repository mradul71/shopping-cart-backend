import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  _id: { type: String, required: true},
  name: {
    type: String, required: true
  },
  category: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: String, required: true }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;