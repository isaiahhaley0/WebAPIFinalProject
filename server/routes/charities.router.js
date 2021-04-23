import express from 'express'

import charCtl from "../controllers/charities.controller"

const router = express.Router()

router.route("/roundup")
    .put(charCtl.newPayment)

export default router