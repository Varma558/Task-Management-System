const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const MongooseTask = mongoose.model("Task", taskSchema);

// Local JSON file storage fallback
const DATA_DIR = path.join(__dirname, "../data");
const DATA_FILE = path.join(DATA_DIR, "tasks.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

function readTasks() {
  ensureFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function writeTasks(tasks) {
  ensureFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

class LocalQuery {
  constructor(tasks) {
    this._tasks = tasks;
  }

  sort(sortCriteria = {}) {
    const sorted = [...this._tasks].sort((a, b) => {
      for (const [key, direction] of Object.entries(sortCriteria)) {
        const valA = new Date(a[key]).getTime() || a[key];
        const valB = new Date(b[key]).getTime() || b[key];
        if (valA < valB) return direction === -1 || direction === "desc" ? 1 : -1;
        if (valA > valB) return direction === -1 || direction === "desc" ? -1 : 1;
      }
      return 0;
    });
    return new LocalQuery(sorted);
  }

  exec() {
    return Promise.resolve(this._tasks);
  }

  then(resolve, reject) {
    return Promise.resolve(this._tasks).then(resolve, reject);
  }

  catch(reject) {
    return Promise.resolve(this._tasks).catch(reject);
  }
}

const Task = {
  find: function (filter = {}) {
    if (mongoose.connection.readyState === 1) {
      return MongooseTask.find(filter);
    }
    const tasks = readTasks();
    return new LocalQuery(tasks);
  },

  create: async function (data) {
    if (mongoose.connection.readyState === 1) {
      return await MongooseTask.create(data);
    }
    const tasks = readTasks();
    const id = crypto.randomBytes(12).toString("hex");
    const now = new Date().toISOString();
    const newTask = {
      _id: id,
      title: String(data.title || "").trim(),
      description: String(data.description || "").trim(),
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : now,
      completed: Boolean(data.completed || false),
      createdAt: now,
      updatedAt: now,
    };
    tasks.push(newTask);
    writeTasks(tasks);
    return newTask;
  },

  findByIdAndUpdate: async function (id, update, options = {}) {
    if (mongoose.connection.readyState === 1) {
      return await MongooseTask.findByIdAndUpdate(id, update, options);
    }
    const tasks = readTasks();
    const index = tasks.findIndex((t) => String(t._id) === String(id));
    if (index === -1) return null;

    const current = tasks[index];
    const updatedTask = {
      ...current,
      ...(update.title !== undefined && { title: String(update.title).trim() }),
      ...(update.description !== undefined && { description: String(update.description).trim() }),
      ...(update.dueDate !== undefined && { dueDate: new Date(update.dueDate).toISOString() }),
      ...(update.completed !== undefined && { completed: Boolean(update.completed) }),
      updatedAt: new Date().toISOString(),
    };

    tasks[index] = updatedTask;
    writeTasks(tasks);
    return updatedTask;
  },

  findByIdAndDelete: async function (id) {
    if (mongoose.connection.readyState === 1) {
      return await MongooseTask.findByIdAndDelete(id);
    }
    const tasks = readTasks();
    const index = tasks.findIndex((t) => String(t._id) === String(id));
    if (index === -1) return null;

    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    writeTasks(tasks);
    return deletedTask;
  },

  findById: async function (id) {
    if (mongoose.connection.readyState === 1) {
      return await MongooseTask.findById(id);
    }
    const tasks = readTasks();
    return tasks.find((t) => String(t._id) === String(id)) || null;
  },
};

module.exports = Task;