import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();
const posts = () => db.collection("posts");

const validId = (id) => ObjectId.isValid(id);

// Get all posts (newest first)
router.get("/", async (req, res) => {
  try {
    const results = await posts().find({}).sort({ createdAt: -1 }).toArray();
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch posts" });
  }
});

// Get one post
router.get("/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).send({ error: "Invalid id" });
    const post = await posts().findOne({ _id: new ObjectId(req.params.id) });
    if (!post) return res.status(404).send({ error: "Post not found" });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch post" });
  }
});

// Create a post
router.post("/", async (req, res) => {
  try {
    const { title, author, body } = req.body;
    if (!title || !author || !body)
      return res.status(400).send({ error: "title, author and body are required" });
    const doc = { title, author, body, createdAt: new Date() };
    const result = await posts().insertOne(doc);
    res.status(201).send({ ...doc, _id: result.insertedId });
  } catch (err) {
    res.status(500).send({ error: "Failed to create post" });
  }
});

// Update a post
router.patch("/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).send({ error: "Invalid id" });
    const { title, author, body } = req.body;
    const updates = { $set: { title, author, body, updatedAt: new Date() } };
    const result = await posts().updateOne({ _id: new ObjectId(req.params.id) }, updates);
    if (result.matchedCount === 0) return res.status(404).send({ error: "Post not found" });
    res.status(200).send({ message: "Post updated" });
  } catch (err) {
    res.status(500).send({ error: "Failed to update post" });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).send({ error: "Invalid id" });
    const result = await posts().deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).send({ error: "Post not found" });
    res.status(200).send({ message: "Post deleted" });
  } catch (err) {
    res.status(500).send({ error: "Failed to delete post" });
  }
});

export default router;
