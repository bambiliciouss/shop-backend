const express = require("express");

const router = express.Router();
const upload = require("../utils/multer");

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  updateProfile,
  getUserProfile,
  updatePassword,
  getUserDetails,
  updateUser,
  deleteUser,
  allUsers,
} = require("../controllers/authController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { getProducts } = require("../controllers/productController");

// router.route('/register').post(registerUser);
router.post("/register", upload.single("avatar"), registerUser);

router.put(
  "/me/update",
  isAuthenticatedUser,
  upload.single("avatar"),
  updateProfile
);

router.get("/me", isAuthenticatedUser, getUserProfile);

router.put("/password/update", isAuthenticatedUser, updatePassword);
// router.get('/products', isAuthenticatedUser,  getProducts)
router.route("/products").get(getProducts);

// router.route('/login').post(loginUser);

router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.post("/password/forgot", forgotPassword);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails);

router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser);

router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);

// router.route('/password/reset/:token').put(resetPassword);
// router.route('/logout').get(logout);

module.exports = router;

//NOT YET WORKING

// const express = require("express");

// const router = express.Router();

// const getProducts = require("../models/product");

// const upload = require("../utils/multer");

// const {
//   registerUser,

//   loginUser,

//   logout,

//   forgotPassword,

//   resetPassword,

//   getUserProfile,

//   allUsers,

//   updateProfile,

//   updatePassword,

//   getUserDetails,

//   updateUser,

//   deleteUser,

// } = require("../controllers/authController");

// const {
//   isAuthenticatedUser,

//   authorizeRoles,
// } = require("../middlewares/auth");

// router
//   .route("/admin/user/:id")

//   .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)

//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)

//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// router
//   .route("/admin/users")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);
// //   router.get('/products', getProducts);

// router.put("/me/update", isAuthenticatedUser, updateProfile);

// router.put("/password/update", isAuthenticatedUser, updatePassword);

// router.get("/me", isAuthenticatedUser, getUserProfile);

// router.post("/register", upload.single("avatar"), registerUser);

// router.post("/login", loginUser);

// router.route("/password/forgot").post(forgotPassword);

// router.route("/password/reset/:token").put(resetPassword);

// router.route("/logout").get(logout);

// module.exports = router;
