const express = require("express");
const router = express.Router();

const {
  list,
  create,
  readBySlug,
  edit,
  deletePost,
  diamond,
} = require("../controllers/posts");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/all", list);
router.get("/:slug/:id", readBySlug);

router.post("/new-post/:userId", (isAuth, requireSignin, create));

router.put("/:userId/:id/edit", (isAuth, requireSignin, edit));
router.put("/diamond/:userId/:id", (requireSignin, diamond));

router.delete("/:id/:userId", (isAuth, requireSignin, deletePost));

router.param("userId", userById);

module.exports = router;
