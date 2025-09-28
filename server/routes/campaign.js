const express = require('express')
const mongoose = require('mongoose')
const Campaign = require('../models/campaign')
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    let results = await Campaign.find({deleteFlag:false});
    console.log(results)
    res.send(results).status(200);
  } catch (error) {
    console.log(error);
  }
});
router.get("/past", async (req, res) => {
  try {
    let today = Date.now()
    let results = await Campaign.find({deleteFlag:false});
    let filteredList = results.filter(item => {
      let date = new Date(item.endDateandTime)
      return date < today
    })
    console.log(filteredList)
    res.status(200).send(filteredList);
  } catch (error) {
    console.log(error);
  }
});
router.get("/present", async (req, res) => {
  try {
    let today = Date.now()
    let results = await Campaign.find({deleteFlag:false});
    let filteredList = results.filter(item => {
      let startDate = new Date(item.startDateandTime)
      let endDate = new Date(item.endDateandTime)
      return ((startDate <= today) && (today <= endDate))
    })
    console.log(filteredList)
    res.status(200).send(filteredList);
  } catch (error) {
    console.log(error);
  }
});
router.get("/future", async (req, res) => {
  try {
    let today = Date.now()
    let results = await Campaign.find({deleteFlag:false});
    let filteredList = results.filter(item => {
      let startDate = new Date(item.startDateandTime)
      return ((today <= startDate))
    })
    console.log(filteredList)
    res.status(200).send(filteredList);
  } catch (error) {
    console.log(error);
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let query = { _id: new mongoose.Types.ObjectId(req.params.id) };
  let result = await Campaign.findOne(query);

  if (!result) res.status(404).send("Not found");
  else res.status(200).send(result);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      name: req.body.name,
      startDateandTime: req.body.startDateandTime,
      endDateandTime: req.body.endDateandTime,
      url: req.body.url,
      description: req.body.description,
      deleteFlag: false,
      visitcount: 0,
      interestcount:0
    };
    let result = await Campaign.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

router.patch("/interestCount", async (req, res) => {
  try {
    let query = { url:req.body.url };
    let update = { $inc: { interestcount: 1 }}
    let result = await Campaign.updateOne(query, update);
    console.log(result)
    res.status(200).send(result);
  } catch (error) {
    console.log("req.body.url "+ req.body.url)
    console.log(error);
    res.status(500).send(error);
  }
});

router.patch("/visitCount", async (req, res) => {
  try {
    let query = { url:req.body.url };
    let update = { $inc: { visitcount: 1 }}
    let result = await Campaign.updateOne(query, update);
    console.log(result)
    res.status(200).send(result);
  } catch (error) {
    console.log("req.body.url "+ req.body.url)
    console.log(error);
    
    res.status(500).send(error);
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new mongoose.Types.ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        startDateandTime: req.body.startDateandTime,
        endDateandTime: req.body.endDateandTime,
        url: req.body.url,
        description: req.body.description
      },
    };

    let result = await Campaign.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new mongoose.Types.ObjectId(req.params.id) };
    const updates = {
      $set: {
        deleteFlag:true
      },
    };

    let result = await Campaign.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});



module.exports = router;