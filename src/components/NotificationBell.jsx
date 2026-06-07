import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiBell, FiCheckCircle, FiTrash2 } from "react-icons/fi";
import { markAsRead, clearNotifications } from "../redux/notificationSlice";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notifications);
  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 hover:-translate-y-1 transition-all"
      >
        <FiBell />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-80 max-h-[420px] overflow-y-auto rounded-[24px] bg-[#07111f] border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.45)] p-4 z-[200]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-black text-lg">Notifications</h3>

            {notifications.length > 0 && (
              <button
                onClick={() => dispatch(clearNotifications())}
                className="text-red-400 hover:text-red-300"
              >
                <FiTrash2 />
              </button>
            )}
          </div>

          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-4 ${
                    item.read
                      ? "bg-white/5 border-white/10"
                      : "bg-cyan-500/10 border-cyan-400/30"
                  }`}
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.message}
                      </p>
                    </div>

                    {!item.read && (
                      <button
                        onClick={() => dispatch(markAsRead(item.id))}
                        className="text-cyan-300"
                      >
                        <FiCheckCircle />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm text-center py-8">
              No notifications yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;