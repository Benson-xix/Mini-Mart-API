const Cart = require("../models/Cart");

const handleAddToCart = async (req, res) => {
  const { user, product, quantity } = req.body;

  if (!req.user) {
    res.status(403).json({ error: "not authorized" });
    return;
  }

  if (!product) {
    res.status(403).json({ error: "product is required" });
    return;
  }
  try {
    const productItem = await Cart.findOne({ product });
    if (productItem) {
      const newCartItem = await Cart.findOneAndUpdate(
        { product },
        { quantity: productItem.quantity + 1 }
      );
      console.log(newCartItem);
      return res.json(newCartItem);
    }
    // //check if product already exits
    // const _cart = Cart.find().where({
    //     $and: [
    //         { product: product },
    //         { user: req.user._id}
    //     ]
    // })

    // if(_cart) {
    //     const updatedItem = await Cart.findByIdAndUpdate(_cart._id, {..._cart, quantity: +_cart.quantity + 1})
    //     res.status(200).json(updatedItem)
    //     return
    // }

    const cartitem = {
      product,
      user: req.user._id,
      quantity,
    };

    const cart = await Cart.create(cartitem);
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleDeleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.findOneAndDelete({ _id: id });
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await Cart.find({ user: id }).populate("product");
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetAllCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.find();
    res.status(200).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleDecrementItem = async (req, res) => {
  try{
    const cartItem = await Cart.findOneAndUpdate({ user: req.user._id, product: req.params.id })

    if(!cartItem) {
      res.status(404).json({ error: 'CartInput not found'})
    }
await Cart.findByIdAndUpdate(cartItem._id, {quantity: cartItem.quantity - 1}) 
res.status(200).json(cartItem)

  } 
  catch (err) {
res.status(500).json({ error: err.message})
  }
}

module.exports = {
  handleAddToCart,
  handleDeleteCartItem,
  handleGetCartItem,
  handleGetAllCartItem,
  handleDecrementItem
};
