import { Router } from "express";
const router = Router();
import Document, {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/Document";

// GET /api/documents - list all
router.get("/", async (req, res, next) => {
  try {
    const docs = await find().sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

// GET /api/documents/:id
router.get("/:id", async (req, res, next) => {
  try {
    const doc = await findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// POST /api/documents
router.post("/", async (req, res, next) => {
  try {
    const doc = new Document(req.body);
    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});

// PUT /api/documents/:id
router.put("/:id", async (req, res, next) => {
  try {
    const doc = await findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/documents/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const doc = await findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
