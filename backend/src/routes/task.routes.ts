import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTaskController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/task.controller";

const router: Router = Router();

router.post("/", createTaskController);
router.get("/", getAllTaskController);
router.get("/:id", getTaskByIdController);
router.patch("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;
