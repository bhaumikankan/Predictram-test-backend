const router = require("express").Router();
const { postModel } = require("../models/");
const formatRes = require("../utils/formatResponse");

router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const query = {};
    if (!!filter.title) {
      query.title = filter.title;
    }
    if (!!filter.description) {
      query.description = filter.description;
    }
    if (!!filter.body) {
      query.body = filter.body;
    }
    const allPost = await postModel.find(query);
    formatRes(res, true, 200, "post fetched successfully", allPost);
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, body } = req.body;
    const newPost = await postModel.create({ title, description, body });
    res.status(200).send({
      success: true,
      message: "post created successfully",
      data: newPost,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.put("/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    const newPost = await postModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      success: true,
      message: "post updated successfully",
      data: newPost,
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const id = req.params.postId;
    await postModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "post deleted successfully",
    });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});
module.exports = router;
