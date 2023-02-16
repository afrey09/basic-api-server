'use strict';

const express = require('express');
const { clothesModel } = require('../models');

const router = express.Router();

router.get('/clothes', async (req, res, next) => {
  const clothes = await clothesModel.findAll();
  res.status(200).json(clothes);
});

router.post('/clothes', async (req, res, next) => {
  try {
    const newClothes = await clothesModel.create(req.body);
    res.status(200).send(newClothes);
  } catch (err) {
    next(err);
  }
});

router.get('/clothes/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const clothes = await clothesModel.findById(id);
    res.status(200).send(clothes);
  } catch (err) {
    next(err);
  }
});

router.delete('/clothes/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await clothesModel.delete(id);
    res.status(200).send('Deleted');
  } catch (err) {
    next(err);
  }

});

router.put('/clothes/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await clothesModel.update(id, req.body);
    res.status(200).send('Updated');
  } catch (err) {
    next(err);
  }
});



module.exports = router;