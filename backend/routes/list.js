const express = require("express");
const router = express.Router();
const User = require("../modals/user");
const List = require("../modals/tasklist"); 

// Create Task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);

        if (existingUser) {
            const list = new List({ title, body, user: existingUser._id });
            await list.save();

            if (existingUser.list) {
                existingUser.list.push(list._id);
            } else {
                existingUser.list = [list._id];
            }

            await existingUser.save();
            return res.status(200).json({ list });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update Task by ID
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;

        const updatedTask = await List.findByIdAndUpdate(id, { title, body }, { new: true });

        if (updatedTask) {
            return res.status(200).json({ task: updatedTask });
        } else {
            return res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Delete Task API
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const { id } = req.body;

        const existingUser = await User.findByIdAndUpdate(
            id,
            { $pull: { list: req.params.id } }
        );

        if (existingUser) {
            // deleting the task in database by finding the id (provided in `req.params.id`)
            await List.findByIdAndDelete(req.params.id).then(() =>
                res.status(200).json({ message: "Task Deleted!" })
            );
        }
    } catch (error) {
        console.log(error);
    }
});

// Get All Task API
router.get('/getTasks/:id', async (req, res) => {
    /*
        To find all tasks (or lists) that belong to a specific user & 
        the sort method is used to arrange the task added recently at the top.
    */
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 });

    if (list.length !== 0) {
        res.status(200).json({ list });
    } else {
        res.status(200).json({ message: "Task Not Found!!" });
    }
});
module.exports = router;
