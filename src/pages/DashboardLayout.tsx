import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-5 text-xl font-bold border-b border-gray-700 mt-20">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
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
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
