import express from 'express'

import charCtl from "../controllers/charities.controller"

const router = express.Router()

router.route("/api/roundup")
    .put(charCtl.newPayment)

router.route("/api/charities")
    .get(charCtl.listCharities)

export default router