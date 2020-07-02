const express = require("express");
const router = express.Router();
const Item = require("../models/item");

//getting all items
router.get("/", async (req, res) => {
	try {
		const items = await Item.find();
		res.status(200).json(items);
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

//creating one item
router.post("/", async (req, res) => {
	const item = new Item({
		name: req.body.name,
	});
	try {
		const newitem = await item.save();
		res.status(201).json(newitem);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

async function getItem(req, res, next) {
	let item = null;
	try {
		item = await Item.findById(req.params.id);
		if (item == null) res.status(404).json({ message: "item not found!" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
	res.item = item;
	next();
}

//getting one item
router.get("/:id", getItem, (req, res) => {
	res.status(200).json(res.item);
});

//updating one
router.patch("/:id", getItem, async (req, res) => {
	if (req.body.name != null) {
		res.item.name = req.body.name;
	}
	try {
		const updatedItem = await res.item.save();
		res.json(updatedItem);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//deleting one
router.delete("/:id", getItem, async (req, res) => {
	try {
		await res.item.remove();
		res.json({ message: "deleted item" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
