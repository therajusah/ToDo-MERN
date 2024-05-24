const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../modals/list");


// Create Task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body } = req.body;
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save();
            existingUser.list.push(list);
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

        const updatedTask = await Task.findByIdAndUpdate(id, { title, body }, { new: true });

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

module.exports = router;
