const express = require('express');
const router = express.Router();
const DangerZone = require('../Models/DangerZone'); // Import the DangerZone model
const UserModel=require("../Models/UserModel")
// GET all danger zones
router.get('/dangerzones', async (req, res) => {
  try {
    const dangerZones = await DangerZone.find();
    res.json(dangerZones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/dangeruser", async (req, res) => {
  const { username } = req.body;

  try {
    // Find the user by username and update the isdangerAlert field
    const updatedUser = await UserModel.findOneAndUpdate(
      { "name": username },
      { $set: { "isDangerAlert": "yes" } }, // Set isDangerAlert to "yes"
      { new: true } // To return the updated user data
    );

    if (updatedUser) {
      res.json({ "data": updatedUser }).status(200);
    } else {
      res.status(404).json({ "error": "User not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});
// GET a specific danger zone
router.get('/dangerzones/:id', async (req, res) => {
  try {
    const dangerZone = await DangerZone.findById(req.params.id);
    if (dangerZone) {
      res.json(dangerZone);
    } else {
      res.status(404).json({ message: 'Danger zone not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new danger zone
router.post('/dangerzones', async (req, res) => {
    console.log("came da.");
    console.log(req.body);
  const dangerZone = new DangerZone({
    lat: parseFloat(req.body.lat), // Convert to number
    lon: parseFloat(req.body.lon), // Convert to number
    name: req.body.name,
    picture:req.body.picture
  });
console.log(dangerZone);
  try {
    const newDangerZone = await dangerZone.save();
    console.log("created..");
    res.status(201).json(newDangerZone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a danger zone
router.patch('/dangerzones/:id', async (req, res) => {
  try {
    const dangerZone = await DangerZone.findById(req.params.id);
    if (dangerZone) {
      dangerZone.lat = req.body.lat || dangerZone.lat;
      dangerZone.lon = req.body.lon || dangerZone.lon;
      dangerZone.name = req.body.name || dangerZone.name;

      const updatedDangerZone = await dangerZone.save();
      res.json(updatedDangerZone);
    } else {
      res.status(404).json({ message: 'Danger zone not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a danger zone
router.delete('/dangerzones/:id', async (req, res) => {
  try {
    const dangerZone = await DangerZone.findById(req.params.id);
    if (dangerZone) {
      await dangerZone.remove();
      res.json({ message: 'Danger zone deleted' });
    } else {
      res.status(404).json({ message: 'Danger zone not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
