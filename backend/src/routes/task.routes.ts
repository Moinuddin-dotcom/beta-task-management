import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTaskController,
  getTaskByIdController,
  reorderTaskController,
  updateTaskController,
} from "../controllers/task.controller";

const router: Router = Router();

router.post("/", createTaskController);
router.get("/", getAllTaskController);
router.patch("/reorder", reorderTaskController);
router.get("/:id", getTaskByIdController);
router.patch("/:id", updateTaskController);
router.delete("/:id", deleteTaskController);

export default router;
