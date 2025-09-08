import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Plus, Check, X, Sparkles, Zap, LogOut, UserCircle } from "lucide-react";
import { useAuth } from "./context/AuthContext.jsx"; // Import useAuth
import { useNavigate } from "react-router-dom";   // Import useNavigat

// const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [imgError, setImgError] = useState(false);

  const { user, logout, apiClient, isAuthenticated, loading: authLoading } = useAuth(); // Get user, logout, apiClient
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchTodos();
    } else if (!authLoading && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    setImgError(false);
  }, [user?.picture]);

  const fetchTodos = async () => {
    try {
      const res = await apiClient.get("/todos");
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Token might be invalid or expired, log out user
        handleLogoutAndRedirect();
      }
    };
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await apiClient.post("/todos", { title: newTodo }); // Use apiClient
      setTodos([res.data, ...todos]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo", error);
    }
  };

  const toggleCompleted = async (id, completed) => {
    try {
      const res = await apiClient.put(`/todos/${id}`, { completed: !completed }); // Use apiClient
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (error) {
      console.error("Error toggling todo", error);
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.title);
  };

  const updateTodo = async () => {
    try {
      const res = await apiClient.put(`/todos/${editingId}`, { title: editText }); // Use apiClient
      setTodos(todos.map(todo => todo._id === editingId ? res.data : todo));
      setEditingId(null);
      setEditText("");
    } catch (err) {
      console.error("Error updating todo", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await apiClient.delete(`/todos/${id}`); // Use apiClient
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  const handleLogoutAndRedirect = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  // User object from JWT payload (via AuthContext)
  // It should have name, picture from the JWT you created in authRoutes.js
  if (authLoading) { // Use authLoading from context
    return <div className="min-h-screen flex items-center justify-center">Loading application...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* App Header: User Info & Logout */}
      <header className="max-w-lg mx-auto py-4 mb-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3">
          {user?.picture && !imgError ? (
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="w-10 h-10 rounded-full border-2 border-white/70 object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <UserCircle className="w-10 h-10 text-white" />
          )}
          <span className="text-white font-semibold text-lg">{user?.name || "User"}</span>
        </div>
        <button
          onClick={handleLogoutAndRedirect}
          className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 font-medium flex items-center gap-2 group"
        >
          <LogOut size={18} className="group-hover:text-pink-300 transition-colors" />
          Logout
        </button>
      </header>


      <div className="max-w-lg mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 mt-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg transform rotate-12 animate-bounce">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
              TaskFlow
            </h1>
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg transform -rotate-12 animate-bounce animation-delay-1000">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <p className="text-blue-100 text-lg font-medium opacity-90">
            Transform your productivity ✨
          </p>
        </div>

        {/* Stats Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{totalCount}</div>
              <div className="text-blue-200 text-sm font-medium">Total Tasks</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">{completedCount}</div>
              <div className="text-blue-200 text-sm font-medium">Completed</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">{totalCount - completedCount}</div>
              <div className="text-blue-200 text-sm font-medium">Remaining</div>
            </div>
          </div>
          {totalCount > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-blue-200 mb-2">
                <span>Progress</span>
                <span>{Math.round((completedCount / totalCount) * 100)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Add Todo Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20 shadow-2xl">
          <form onSubmit={addTodo} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg font-medium"
                placeholder="What needs to be done today? ✨"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-4 rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-3 group"
            >
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              Add Task
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="text-center py-12 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10">
              <div className="text-6xl mb-4">🌟</div>
              <p className="text-blue-200 text-xl font-medium mb-2">No tasks yet!</p>
              <p className="text-blue-300 opacity-75">Add your first task above to get started</p>
            </div>
          ) : (
            todos.map((todo, index) => (
              <div
                key={todo._id}
                className={`group bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/15 transform animate-fadeIn`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-4 cursor-pointer flex-grow">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleCompleted(todo._id, todo.completed)}
                        className="sr-only"
                      />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${todo.completed
                        ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 border-emerald-400 shadow-lg shadow-emerald-400/50'
                        : 'border-white/40 hover:border-cyan-400 hover:bg-white/10'
                        }`}>
                        {todo.completed && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                    <span className={`text-lg font-medium transition-all duration-300 ${todo.completed
                      ? "line-through text-blue-300 opacity-60"
                      : "text-white group-hover:text-cyan-100"
                      }`}>
                      {todo.title}
                    </span>
                  </label>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => startEdit(todo)}
                      className="p-2 text-blue-300 hover:text-cyan-400 hover:bg-white/10 rounded-lg transition-all duration-200 transform hover:scale-110"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="p-2 text-pink-300 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all duration-200 transform hover:scale-110"
                      aria-label="Delete todo"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        {editingId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 transform animate-scaleIn">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Task</h2>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-4 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-lg font-medium"
                    placeholder="Update your task..."
                    autoFocus
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-medium border border-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateTodo}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-bold shadow-xl transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out forwards;
          }
          
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}
      </style>
    </div>
  );
}
export default App;