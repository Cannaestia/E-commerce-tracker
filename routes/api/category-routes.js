const router = require("express").Router();
const { restart } = require("nodemon");
const { models } = require("../../config/connection");
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.json(categoryData);
  // find all categories
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  const categoryData = await Category.findByPK(req.perams.id, {
    include: [{ model: Product }],
  });
  res.json(categoryData);
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  const categoryData = await Category.create(req.body);
  res.json(categoryData);
  // create a new category
});

router.put("/:id", async (req, res) => {
  const categoryData = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.perams.id,
      },
    },
  )
  .then((categoryData) =>{
    res.json(categoryData);
  })
  // update a category by its `id` value
});

router.delete("/:id", async (req, res) => {
  const categoryData = await Category.destroy({
    where: {
      id: req.perams.id,
    },
  });
  res.json(categoryData);
  // delete a category by its `id` value
});

module.exports = router;
