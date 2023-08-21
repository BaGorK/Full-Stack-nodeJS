const cuid = require('cuid');
const { isEmail } = require('validator');

const db = require('../db');

const emailSchema = (opts) => {
  const { required } = opts;
  return {
    required: !!required,
    valdate: {
      type: String,
      valdator: isEmail,
      message: (props) => `${props.value} is not an email!`,
    },
  };
};

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: emailSchema({ required: true }),
  products: [
    {
      type: [String],
      ref: 'Product',
      index: true,
      required: true,
    },
  ],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED'],
  },
});

const get = async (_id) => {
  const order = await Order.findById(_id).populate('products').exec();
  return order;
};

module.exports = { Order, get };


/*

If we did not use populate() and exec(), the products field would be an array of product IDs –
what is actually stored in the database. By calling these methods, we tell mongoose to perform the
extra query to pull the relevant orders from the database for us and to replace the ID string with the
actual product object.

*/