"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var router = require("express").Router();

var post = require("../models/post");

var user = require("../models/user"); //create post


router.post("/", function _callee(req, res) {
  var newPost, savedpost;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          newPost = new post(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(newPost.save());

        case 4:
          savedpost = _context.sent;
          res.status(200).json(savedpost);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //update

router.put("/:id", function _callee2(req, res) {
  var updatePost;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(post.findById(req.params.id));

        case 3:
          updatePost = _context2.sent;

          if (!(updatePost.userid === req.body.userid)) {
            _context2.next = 10;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(post.updateOne({
            $set: req.body
          }));

        case 7:
          res.status(200).json("updated");
          _context2.next = 11;
          break;

        case 10:
          res.status(403).json("You cant update others post");

        case 11:
          _context2.next = 16;
          break;

        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); //delete

router.post("/:id", function _callee3(req, res) {
  var deletingpost;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(post.findById(req.params.id));

        case 3:
          deletingpost = _context3.sent;
          console.log(deletingpost.userid);
          console.log(req.body);

          if (!(deletingpost.userid === req.body.userid)) {
            _context3.next = 12;
            break;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(post.findByIdAndDelete(req.params.id));

        case 9:
          res.status(200).json("deleted");
          _context3.next = 13;
          break;

        case 12:
          res.status(403).json("You cant delete others post");

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json(_context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); // like /dislike a post

router.put("/:id/like", function _callee4(req, res) {
  var newPost;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log("likes", req.body.userid, req.params.id);
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(post.findById(req.params.id));

        case 4:
          newPost = _context4.sent;
          console.log(newPost);

          if (newPost.likes.includes(req.body.userid)) {
            _context4.next = 13;
            break;
          }

          console.log("not", newPost.likes.includes(req.body.userid));
          _context4.next = 10;
          return regeneratorRuntime.awrap(post.findByIdAndUpdate(req.params.id, {
            $push: {
              likes: req.body.userid
            }
          }));

        case 10:
          res.status(201).json("liked");
          _context4.next = 16;
          break;

        case 13:
          _context4.next = 15;
          return regeneratorRuntime.awrap(post.findByIdAndUpdate(req.params.id, {
            $pull: {
              likes: req.body.userid
            }
          }));

        case 15:
          res.status(201).json("disliked");

        case 16:
          _context4.next = 21;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](1);
          res.status(500).json(_context4.t0);

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 18]]);
}); // get a post

router.get("/:id", function _callee5(req, res) {
  var newPost;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(post.findById(req.params.id));

        case 3:
          newPost = _context5.sent;
          res.status(200).json(newPost);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //get timeline post

router.get("/timeline/:userid", function _callee6(req, res) {
  var postArray, _allPost$concat, currentUser, userPost, friendPost, allPost, uniqueIds, uniqueEmployees;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          console.log(req.params.userid);
          postArray = [];
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(user.findById(req.params.userid));

        case 5:
          currentUser = _context6.sent;
          _context6.next = 8;
          return regeneratorRuntime.awrap(post.find({
            userid: currentUser._id
          }));

        case 8:
          userPost = _context6.sent;
          _context6.next = 11;
          return regeneratorRuntime.awrap(Promise.all(currentUser.following.map(function (friendid) {
            return post.find({
              userid: friendid
            });
          })));

        case 11:
          friendPost = _context6.sent;
          _context6.next = 14;
          return regeneratorRuntime.awrap(post.find({}).limit(100));

        case 14:
          allPost = _context6.sent;

          (_allPost$concat = allPost.concat.apply(allPost, _toConsumableArray(friendPost))).concat.apply(_allPost$concat, _toConsumableArray(allPost));

          uniqueIds = [];
          uniqueEmployees = allPost.filter(function (element) {
            var isDuplicate = uniqueIds.includes(element._id);

            if (!isDuplicate) {
              uniqueIds.push(element._id);
              return true;
            }

            return false;
          });
          console.log("hi");
          res.status(200).json(uniqueEmployees);
          _context6.next = 25;
          break;

        case 22:
          _context6.prev = 22;
          _context6.t0 = _context6["catch"](2);
          res.status(500).json(_context6.t0);

        case 25:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 22]]);
}); // get users all post

router.get("/profile/:username", function _callee7(req, res) {
  var postArray, ourUser, posts;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log("debug");
          console.log(req.params.username, ";ol");
          postArray = [];
          _context7.prev = 3;
          _context7.next = 6;
          return regeneratorRuntime.awrap(user.findOne({
            username: req.params.username
          }));

        case 6:
          ourUser = _context7.sent;
          _context7.next = 9;
          return regeneratorRuntime.awrap(post.find({
            userid: ourUser._id
          }));

        case 9:
          posts = _context7.sent;
          res.status(200).json(posts);
          _context7.next = 16;
          break;

        case 13:
          _context7.prev = 13;
          _context7.t0 = _context7["catch"](3);
          res.status(500).json(_context7.t0);

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[3, 13]]);
}); //update comment

router.post("/comment/:id", function _callee8(req, res) {
  var n;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          console.log("kol");
          _context8.next = 4;
          return regeneratorRuntime.awrap(post.findByIdAndUpdate(req.params.id, {
            $push: {
              comments: req.body
            }
          }));

        case 4:
          n = _context8.sent;
          res.status(201).json("success");
          _context8.next = 11;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json(_context8.t0);

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post("/deleteComment/:id", function _callee9(req, res) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;

          if (!(req.body.userid === req.body.postuserid || req.body.userid === req.body.commentuserid)) {
            _context9.next = 7;
            break;
          }

          _context9.next = 4;
          return regeneratorRuntime.awrap(post.findByIdAndUpdate(req.params.id, {
            $pull: {
              comments: {
                _id: req.body.commentid
              }
            }
          }));

        case 4:
          res.status(200).json("deleted ");
          _context9.next = 8;
          break;

        case 7:
          res.status(400).json("not allowed");

        case 8:
          _context9.next = 13;
          break;

        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json(_context9.t0);

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.get("/getComments/:id", function _callee10(req, res) {
  var result, _result$_doc, _comments, others;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(post.findById(req.params.id));

        case 3:
          result = _context10.sent;
          console.log(result);
          _result$_doc = result._doc, _comments = _result$_doc.comments, others = _objectWithoutProperties(_result$_doc, ["comments"]);
          res.status(200).json(_comments);
          _context10.next = 12;
          break;

        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          res.status(500).json(comments);

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;