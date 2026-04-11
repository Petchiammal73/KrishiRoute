// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Profile() {
//   const [user, setUser] = useState<any>({});
//   const [history, setHistory] = useState<any[]>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//     const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");

//     setUser(storedUser);
//     setHistory(storedHistory);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const username = user.email
//     ? user.email.split("@")[0]
//     : "Farmer";

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">

//       <div className="max-w-5xl mx-auto space-y-6">

//         {/* 🔥 HERO SECTION */}
//         <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center gap-6">
          
//           {/* Avatar */}
//           <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl font-bold">
//             {username[0].toUpperCase()}
//           </div>

//           {/* Info */}
//           <div>
//             <h1 className="text-2xl font-bold">
//               {username}
//             </h1>
//             <p className="text-gray-500">{user.email}</p>
//           </div>
//         </div>

//         {/* 📊 STATS */}
//         <div className="grid md:grid-cols-3 gap-4">

//           <div className="bg-white p-5 rounded-xl shadow text-center">
//             <h3 className="text-gray-500">Total Calculations</h3>
//             <p className="text-2xl font-bold text-green-600">
//               {history.length}
//             </p>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow text-center">
//             <h3 className="text-gray-500">Last Crop</h3>
//             <p className="text-lg font-semibold">
//               {history[0]?.crop?.toUpperCase() || "—"}
//             </p>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow text-center">
//             <h3 className="text-gray-500">Best Profit</h3>
//             <p className="text-lg font-semibold text-green-600">
//               ₹{Math.max(...history.map(h => h.profit), 0)}
//             </p>
//           </div>
//         </div>

//         {/* 🕒 RECENT ACTIVITY */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold">Recent Activity</h2>
//             <button
//               onClick={() => navigate("/history")}
//               className="text-green-600 font-semibold hover:underline"
//             >
//               View All →
//             </button>
//           </div>

//           {history.length === 0 ? (
//             <p className="text-gray-500">No activity yet</p>
//           ) : (
//             <div className="space-y-3">
//               {history.slice(0, 3).map((h, i) => (
//                 <div
//                   key={i}
//                   className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
//                 >
//                   <div>
//                     <p className="font-semibold">
//                       {h.crop.toUpperCase()} → {h.bestMarket}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(h.timestamp).toLocaleString()}
//                     </p>
//                   </div>

//                   <p className="text-green-600 font-bold">
//                     ₹{h.profit}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 🚪 LOGOUT */}
//         <div className="text-center">
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<any>({});
  const [history, setHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");

    setUser(storedUser);
    setHistory(storedHistory);
  }, []);

  const username = user.email
    ? user.email.split("@")[0]
    : "Farmer";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 md:p-6">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* 🔥 HERO */}
        <div className="bg-white rounded-2xl shadow-lg p-5 md:p-6 flex flex-col sm:flex-row items-center gap-4">

          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
            {username[0].toUpperCase()}
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-xl md:text-2xl font-bold">
              {username}
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              {user.email}
            </p>
          </div>
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          <div className="bg-white p-4 md:p-5 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Total Calculations</p>
            <p className="text-xl md:text-2xl font-bold text-green-600">
              {history.length}
            </p>
          </div>

          <div className="bg-white p-4 md:p-5 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Last Crop</p>
            <p className="font-semibold">
              {history[0]?.crop?.toUpperCase() || "—"}
            </p>
          </div>

          <div className="bg-white p-4 md:p-5 rounded-xl shadow text-center">
            <p className="text-gray-500 text-sm">Best Profit</p>
            <p className="font-semibold text-green-600">
              ₹{Math.max(...history.map(h => h.profit), 0)}
            </p>
          </div>
        </div>

        {/* 🕒 ACTIVITY */}
        <div className="bg-white p-5 md:p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold">
              Recent Activity
            </h2>

            <button
              onClick={() => navigate("/history")}
              className="text-green-600 text-sm font-semibold"
            >
              View All →
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No activity yet</p>
          ) : (
            <div className="space-y-3">
              {history.slice(0, 3).map((h, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-sm md:text-base">
                      {h.crop.toUpperCase()} → {h.bestMarket}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(h.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <p className="text-green-600 font-bold text-sm md:text-base">
                    ₹{h.profit}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🚪 LOGOUT */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}