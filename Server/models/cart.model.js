const { Schema, model } = require("mongoose");
var User=require("./user.model")

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: User,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Cart", cartSchema);
