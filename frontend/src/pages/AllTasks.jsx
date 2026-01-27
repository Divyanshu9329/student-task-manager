import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function timeAgo(date) {
  if (!date) return "Unknown time"; // fallback for missing date

  const now = new Date();
  const past = new Date(date);
  const secondsDiff = Math.floor((now - past) / 1000);
  const minutes = Math.floor(secondsDiff / 60);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function AllTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const tasksData = await response.json();
      setTasks(tasksData);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <style>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Ovo&display=swap");
          * { font-family: "Poppins", sans-serif; }
          h1 { font-family: "Ovo", serif; }
        `}
      </style>

      <section
        className="
          min-h-screen px-4 py-24
          bg-linear-to-br from-indigo-100 via-purple-100 to-cyan-100
          transition-colors duration-300
        "
      >
        {/* Back Home Button */}
        <div className="max-w-3xl mx-auto mb-8 flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="
              px-4 py-1.5 rounded-full text-xs
              bg-black/10
              text-neutral-800
              backdrop-blur border border-black/10
              hover:bg-black/20 transition
            "
          >
            ← Back Home
          </button>
        </div>

        <div className="max-w-3xl mx-auto">
          <h1
            className="
              text-4xl md:text-5xl font-semibold mb-12
              text-neutral-900 text-center
            "
          >
            All Tasks
          </h1>

          <div className="space-y-5 max-w-xl mx-auto">
            {/* Show message if no tasks */}
            {tasks.length === 0 && (
              <div
                className="
                  py-12 text-center rounded-2xl
                  bg-white/70
                  border border-dashed border-black/20
                "
              >
                <p className="text-neutral-600 text-lg">✨ No tasks yet</p>
                <p className="text-sm text-neutral-500 mt-2">
                  Add some tasks on the Home page to get started!
                </p>
              </div>
            )}

            {/* Render task list */}
            {tasks.map((task) => (
              <div
                key={task.id}
                className="
                  group px-6 py-5 rounded-2xl
                  bg-white
                  border border-black/10
                  shadow-lg
                  transition-all duration-200 hover:scale-[1.02]
                "
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-neutral-900 font-medium text-lg">
                      {task.title}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {timeAgo(task.created_at)}
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      await fetch(`http://localhost:5000/tasks/${task.id}`, {
                        method: "DELETE",
                      });
                      setTasks((prevTasks) =>
                        prevTasks.filter((t) => t.id !== task.id)
                      );
                    }}
                    className="
                      opacity-0 group-hover:opacity-100
                      text-red-500 hover:text-red-600 transition
                    "
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
