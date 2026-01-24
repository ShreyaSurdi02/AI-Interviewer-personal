import { NavLink } from "react-router-dom";

const linkClass =
  "block px-4 py-2 rounded hover:bg-blue-100 transition";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <h2 className="text-2xl font-bold text-center py-6 text-blue-600">
        Company Panel
      </h2>

      <nav className="space-y-2 px-4">
        <NavLink to="/company/dashboard" className={linkClass}>
          Overview
        </NavLink>

        <NavLink to="/company/dashboard/interviews" className={linkClass}>
          Interview Management
        </NavLink>

        <NavLink to="/company/dashboard/create-interview" className={linkClass}>
          Create Interview
        </NavLink>

        <NavLink to="/company/dashboard/candidates" className={linkClass}>
          Candidates
        </NavLink>

        <NavLink to="/company/dashboard/analytics" className={linkClass}>
          Analytics
        </NavLink>

        <NavLink to="/company/dashboard/notifications" className={linkClass}>
          Notifications
        </NavLink>

        <NavLink to="/company/dashboard/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
