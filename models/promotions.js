const mongoose = require("mongoose");
const Scchema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const promotionSchema = new Scchema(
  {
    name: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    price: {
      type: Currency,
      required: true,
      min: 0
    },

    description: {
      type: String,
      required: true
    },

    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Promtions = mongoose.model("promotion", promotionSchema);

module.exports = Promtions;
