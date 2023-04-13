const router = require("express").Router();
const policyController = require("../controllers/policyDetails_controller");

router.post("/addpolicy", policyController.policyDetails);
router.get("/list", policyController.fetchAllPolicy);
router.get("/singlepolicy/:uuid", policyController.getPolicyDetail);
router.put("/update/:uuid", policyController.updatePolicyDetail);
router.delete("/remove/:uuid", policyController.removePolicyDetail);
module.exports = router;
