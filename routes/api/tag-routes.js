const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const tagData = await Tag.findAll({
    include: [{ model: Product }],
  });
  res.json(tagData);
  // find all tags
  // be sure to include its associated Product data
});

// router.get("/:id", async (req, res) => {
//   const tagData = await Tag.findByPK({
//     include: [{ model: Product }],
//   });
//   res.json(tagData);
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [{ model: Product }]
  }).then((tagData) => {
    res.json(tagData);
  })
});

router.post("/", async (req, res) => {
  const tagData = await Tag.create(req.body);
  res.json(tagData);
  // create a new tag
});

router.put("/:id", async (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  // update a tag's name by its `id` value
});

router.delete("/:id", async (req, res) => {
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(tagData);
  // delete on tag by its `id` value
});

//Another way to delete

// router.delete("/:id", (req, res) => {
//   Tag.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((deletedTag) => {
//       res.json(deletedTag);
//     })
//     .catch((err) => res.json(err));
// });

module.exports = router;
