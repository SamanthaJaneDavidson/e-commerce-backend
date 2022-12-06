const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories and assocaited products 
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  }
   catch (err) {
    res.status(500).json(err);
   }
  });


// GET specific category and associated products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      incldue: [{ model: Product }],
    })

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that ID"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  });


// CREATE a new category 
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  })
});


// UPDATE a category by a specific ID 
router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name,
  },
  {
    where: {
      id: req.params.id,
    }
  }
  )
  .then((updatedCategroy) => {
    res.json(updatedCategroy);
  })
  .catch((err) => res.json(err));
});


// DELETE a category by a specific ID 
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((deletedCategory) => {
    res.json(deletedCategory)
  })
  .catch((err) => res.json(err));
});

module.exports = router;
