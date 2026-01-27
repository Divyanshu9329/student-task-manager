import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function timeAgo(date) {
  if (!date) return "Unknown time"; // just in case no date provided

  const createdDate = new Date(date);
  if (isNaN(createdDate)) return "Unknown time"; // if date is invalid

  const now = new Date();
  const diffMs = now - createdDate; // difference in ms
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
  if (diffMinutes > 0) return `${diffMinutes} min${diffMinutes > 1 ? "s" : ""} ago`;
  return "Just now";
}

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  }

  async function addTask() {
    if (!task.trim()) return; // don’t add empty tasks

    try {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: task }),
      });
      setTask("");
      fetchTasks(); // refresh the list
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {/* Import fonts */}
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Ovo&display=swap");
          * { font-family: "Poppins", sans-serif; }
          h1 { font-family: "Ovo", serif; }
        `}
      </style>

      <section
        className="min-h-screen px-4 py-24
          bg-linear-to-br from-indigo-100 via-purple-100 to-cyan-100
          transition-colors duration-300"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          {/* Header */}
          <h1 className="text-4xl md:text-6xl leading-tight text-neutral-900">
            Organize your tasks.
            <br />
            <span className="text-indigo-600">Stay stress-free.</span>
          </h1>

          <p className="mt-6 text-neutral-700 max-w-xl">
            A minimal student task manager to track homework and assignments
            without distractions.
          </p>

          {/* Task input box */}
          <div
            className="
              mt-14 w-full max-w-xl
              bg-white/80
              backdrop-blur-xl rounded-2xl p-6 md:p-8
              border border-black/10
              shadow-xl
            "
          >
            <input
              type="text"
              placeholder=" Add a new task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
              className="
                w-full bg-transparent outline-none
                text-neutral-900
                placeholder-neutral-500
                mb-6
              "
            />

            <button
              onClick={addTask}
              className="
                w-full py-3 rounded-xl font-medium
                bg-indigo-600 hover:bg-indigo-500
                text-white transition
              "
            >
              Add Task
            </button>
          </div>

          {/* Recent tasks */}
          <div className="mt-12 w-full max-w-xl text-left">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm uppercase tracking-widest text-neutral-600">
                Recent Tasks
              </h2>

              <button
                onClick={() => navigate("/all")}
                className="text-xs font-medium text-indigo-600 hover:underline"
              >
                View All →
              </button>
            </div>

            <div className="space-y-3">
              {tasks.length === 0 ? (
                <div
                  className="
                    py-10 text-center rounded-xl
                    bg-white/70
                    border border-dashed border-black/20
                  "
                >
                  <p className="text-neutral-600"> You're all caught up</p>
                  <p className="text-sm text-neutral-500">
                    Add your first task to get started
                  </p>
                </div>
              ) : (
                tasks.slice(0, 3).map((t) => (
                  <div
                    key={t.id}
                    className="
                      group px-5 py-4 rounded-xl
                      bg-white
                      border border-black/10
                      shadow-sm transition-all duration-200
                      hover:scale-[1.02]
                    "
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-neutral-900 font-medium">{t.title}</p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {timeAgo(t.created_at)}
                        </p>
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            await fetch(`http://localhost:5000/tasks/${t.id}`, {
                              method: "DELETE",
                            });
                            fetchTasks();
                          } catch (err) {
                            console.error("Failed to delete task:", err);
                          }
                        }}
                        className="
                          opacity-0 group-hover:opacity-100
                          transition text-red-500 hover:text-red-600
                        "
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
