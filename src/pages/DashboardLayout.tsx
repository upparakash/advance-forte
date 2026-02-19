import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        
        {/* ✅ USER INFO */}
        {user && (
          <div className="px-5 py-4 border-b border-gray-700">
            <p className="text-sm text-gray-400">Welcome</p>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-blue-400 uppercase">
              {user.role}
            </p>
          </div>
        )}

        {/* NAV LINKS */}
        <nav className="p-4 space-y-2 flex-1">
  <NavLink
    to="/dashboard"
    end
    className={({ isActive }) =>
      `block px-4 py-2 rounded ${
        isActive ? "bg-blue-600" : "hover:bg-gray-700"
      }`
    }
  >
    Dashboard
  </NavLink>

  <NavLink
    to="/dashboard/users"
    className={({ isActive }) =>
      `block px-4 py-2 rounded ${
        isActive ? "bg-blue-600" : "hover:bg-gray-700"
      }`
    }
  >
    Users
  </NavLink>

  <NavLink
    to="/dashboard/settings"
    className={({ isActive }) =>
      `block px-4 py-2 rounded ${
        isActive ? "bg-blue-600" : "hover:bg-gray-700"
      }`
    }
  >
    Settings
  </NavLink>

  {/* ✅ ADMIN ONLY */}
  {user?.role === "admin" && (
    <NavLink
      to="/dashboard/blogs"
      className={({ isActive }) =>
        `block px-4 py-2 rounded ${
          isActive ? "bg-blue-600" : "hover:bg-gray-700"
        }`
      }
    >
      Add Blogs
    </NavLink>
  )}
</nav>


        {/* ✅ LOGOUT BUTTON */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
