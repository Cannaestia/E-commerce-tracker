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

// I thought I had written the top one incorrectly because it did not 
// load in Insomnia however that was due to me having https and not just http.
// both of the ways these are written work to laod the data. 

// router.get ('/', (req, res) => {
//   Category.findAll({
//     include: [{ model: Product}],
//   }).then((categoryData) => {
//     res.status(200).json(categoryData);
//   });
// });

// router.get("/:id", async (req, res) => {
//   const categoryData = await Category.findByPK(req.params.id, {
//     include: [{ model: Product }],
//   });
//   res.json(categoryData);
//   // find one category by its `id` value
//   // be sure to include its associated Products
// });

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  }).then((categoryData) => {
    res.json(categoryData);
  })
});

router.post("/", async (req, res) => {
  const categoryData = await Category.create(req.body);
  res.json(categoryData);
  // create a new category
});

router.put("/:id", async (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  // update a category by its `id` value
});

// router.delete("/:id", async (req, res) => {
//   const categoryData = await Category.destroy({
//     where: {
//       id: req.params.id,
//     },
//   });
//   res.json(categoryData);
//   // delete a category by its `id` value
// });

//Another way to delete

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
