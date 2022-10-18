const Product = require("../models/Product");
const path = require("path");
const { unlink } = require("fs/promises");
const Domain = "http://localhost:5000/uploads/";

const handleCreateProducts = async (req, res) => {
  const { name, description, price, quantity, category, image } = req.body;
  //const { image } = req.files;
  // const image = req?.files?.image

  //const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  // return res.send ({file: req.files})

  // check  if image was sent
  if (!image) {
    res.status(400).json({ error: "image is required" });
    return;
  }

  //check file is an image
  // const imageType = image.mimetype;

  //  if (!allowedTypes.includes(imageType)) {
  //   res.status(400).json({ error: `"${imageType}" file is not allowed` });
  ///  return;
  //}

  // const imageArr = image?.name?.split(".");
  // const ext = imageArr[imageArr.length - 1];
  // const imageName = imageArr[0] + `-${new Date(Date.now()).getTime()}.${ext}`;

  //move the image to the upload folder
  //image.mv("./public/uploads/" + imageName);

  //check if the feilds are empty
  if (!name || !description || !price || !category || !quantity) {
    res.status(400).json({
      error: "Name, description, price, category and quantity are required",
    });
    return;
  }
  try {
    const product = await Product.create({
      ...req.body,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const handleGetAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.messsage });
  }
};

const handleDeleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(id);
    //   const productFile = product.image.split('/').pop()
    //   const file = path.resolve("/uploads/" + productFile )

    //    unlink(file).then(() => {
    //     res.status(200).json(product)
    //   }). catch (err => {
    //   res.status(500).json({message: err.message})
    // })

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ messsage: err.message });
  }
};

const handleEditProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;
  const { id } = req.params;

  //check  if the product exsits
  const prooduct = await Product.findBy(id);

  if (!product) {
    res.status(404).json({ error: "product not found" });
    return;
  }

  // if(!name || !description || !price || !category || !quantity){
  //  res.status(400).json({
  //    error: "Name, description, price, category or quantity should be updated",
  //  });
  //    return;
  //  }
  try {
    const newProduct = await Product.findByIdAndUpdate(id, {
      ...product,
      ...req.body,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  handleCreateProducts,
  handleGetAllProducts,
  handleDeleteProduct,
  handleEditProduct,
};

//carbon
//odin
//cloudinary
