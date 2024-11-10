const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "Blogy",
      description: "a very basic blog xaxaxax",
    };

    let perPage = 10;
    let page = req.query.page || 1;
    //  10 * 1 - 10
    //  10 * 2 - 10 = 10
    //  10 * 3 - 10 = 20
    debugger;
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Post.countDocuments();
    console.log(count);
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/", async (req, res) => {
//   const locals = {
//     title: "Blogy",
//     description: "a very basic blog xaxaxax",
//   };

//   try {
//     const data = await Post.find();
//     res.render("index", { locals, data });
//   } catch (error) {
//     console.log(error);
//   }
// });

// function insertPostInitData() {
//   Post.insertMany([
//     {
//       title: "Building a Blog",
//       body: "this is the body",
//     },
//     {
//       title: "Building a Blog",
//       body: "this is the body",
//     },
//   ]);
// }

// insertPostInitData();

router.get("/post/:id", async (req, res) => {
  try {
    let id = req.params.id;

    const data = await Post.findById({ _id: id });

    const locals = {
      title: data.title,
      description: "a very basic blog xaxaxax",
    };

    res.render("post", { locals, data });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.post("/search", async (req, res) => {
  try {
    const locals = {
      title: "search",
      description: "a very basic blog xaxaxax",
    };
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { body: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      data,
      locals,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
