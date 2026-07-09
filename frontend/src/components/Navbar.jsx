import { Link } from "react-router-dom";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">ThinkBoard</h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-base-content/70">Welcome, {user.name}</span>
                <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <button onClick={logout} className="btn btn-ghost btn-sm gap-2">
                  <LogOutIcon className="size-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link to={"/login"} className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;