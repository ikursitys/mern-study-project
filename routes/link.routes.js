const { Router } = require("express");
const config = require("config");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const router = Router();
const shortid = require("shortid");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseURL = config.get("baseURL");
    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseURL + "/t/" + code;
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();
    res.status(201).json({ link });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please, try again" });
  }
});

// Delete a link

router.post("/delete", auth, async (req, res) => {
  try {
    const link = await Link.findOne(req.params.id);

    if (link) {
      await link.remove();
    }
    res.status(200).json({});
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please, try again" });
  }
});

//////

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please, try again" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong... Please, try again" });
  }
});

module.exports = router;
