const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll().then((categoryData) => {
    console.log(categoryData);
    res.json(categoryData);
  });
  // be sure to include its associated Products
  Product.findAll().then((productData) => {
    console.log(productData);
    res.json(productData);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id).then((categoryData) => {
    console.log(categoryData);
    res.json(categoryData);
  })
  // be sure to include its associated Products
  Product.findByPk(req.params.id).then((productData) => {
    console.log(productData);
    res.json(productData);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
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

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
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
