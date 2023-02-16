'use strict';

const express = require('express');
const { foodModel } = require('../models');
const router = express.Router();

router.get('/food', async (req, res, next) => {
  const food = await foodModel.findAll();
  res.status(200).json(food);
});

router.post('/food', async (req, res, next) => {
  try {
    const newfood = await foodModel.create(req.body);
    res.status(200).send(newfood);
  } catch (err) {
    next(err);
  }
});

router.get('/food/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const food = await foodModel.findById(id);
    res.status(200).send(food);
  } catch (err) {
    next(err);
  }
});

router.delete('/food/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await foodModel.delete(id);
    res.status(200).send('Deleted');
  } catch (err) {
    next(err);
  }

});

router.put('/food/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await foodModel.update(id, req.body);
    res.status(200).send('Updated');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
