import User from "../models/User.js";
import Task from "../models/Task.js";
import Event from "../models/Event.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({ role: "volunteer" })
      .sort({ points: -1 })
      .limit(100)
      .select("name points volunteeringHours badges");

    res.status(200).json({ success: true, leaderboard });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("registeredEvents")
      .select("-password");

    const tasks = await Task.find({ assignedTo: req.user.id });
    const upcomingEvents = await Event.find({
      registeredVolunteers: req.user.id,
      status: "upcoming",
    });

    res.status(200).json({
      success: true,
      user,
      tasks,
      upcomingEvents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "completed";
    task.completedDate = new Date();
    await task.save();

    const user = await User.findById(req.user.id);
    user.points += task.pointsReward;
    user.volunteeringHours += task.hoursReward;
    user.tasksCompleted += 1;

    // Check for badges
    if (user.tasksCompleted === 1 && !user.badges.includes("First Step")) {
      user.badges.push("First Step");
    }
    if (user.tasksCompleted === 5 && !user.badges.includes("Helper")) {
      user.badges.push("Helper");
    }
    if (user.volunteeringHours >= 50 && !user.badges.includes("Champion")) {
      user.badges.push("Champion");
    }
    if (user.volunteeringHours >= 100 && !user.badges.includes("Legend")) {
      user.badges.push("Legend");
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Task completed successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.registeredVolunteers.includes(req.user.id)) {
      return res.status(400).json({ message: "Already registered for this event" });
    }

    event.registeredVolunteers.push(req.user.id);
    await event.save();

    const user = await User.findById(req.user.id);
    user.registeredEvents.push(eventId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Registered for event successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
