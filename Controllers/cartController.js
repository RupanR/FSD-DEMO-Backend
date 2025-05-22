import Cart from "../Models/cartModel.js";
import Product from "../Models/productModel.js";

//add to cart

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        totalPrice: 0,
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity: quantity });
    }
    cart.totalPrice += product.price * quantity;
    await cart.save();
    res.status(200).json({ message: "Item Added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// view cart

export const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) {
      return res
        .status(200)
        .json({ message: "Cart is empty", data: { items: [] } });
    }
    res.status(200).json({ message: "Cart retrieved", data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
