import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Item', ItemSchema);
