const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags and associated products 
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagData);
  }
   catch (err) {
    res.status(500).json(err);
   }
});


// GET a specific tag and its assocaited product data 
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Category.findByPk(req.params.id, {
      incldue: [{ model: Product }],
    })

    if (!tagData) {
      res.status(404).json({ message: "No tags found with that ID"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// CREATE a new tag 
router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  })
  .catch((err) => {
    res.json(err);
  })
});

// UPDATE a tag by a specific ID
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name,
  },
  {
    where: {
      id: req.params.id,
    }
  }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

// DELETE a tag by a specific ID 
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedTag) => {
    res.json(deletedTag)
  })
  .catch((err) => res.json(err));
});

module.exports = router;
