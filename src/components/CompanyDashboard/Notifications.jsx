// export default function Notifications() {
//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">
//         Notifications
//       </h2>
//       <p>Interview activity and invitations will appear here.</p>
//     </div>
//   );
// }
import React from "react";

const notifications = [
  {
    id: 1,
    type: "INTERVIEW_COMPLETED",
    message: "Rahul completed Frontend Interview",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "CANDIDATE_ATTEMPT",
    message: "Neha started Backend Interview",
    time: "Today, 2:30 PM",
  },
  {
    id: 3,
    type: "INVITATION_SENT",
    message: "Invitation sent to Amit for UI Developer role",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "INVITATION_ACCEPTED",
    message: "Sneha accepted interview invitation",
    time: "Yesterday",
  },
];

const activityTimeline = [
  {
    id: 1,
    event: "Interview completed by Rahul (Frontend)",
    time: "10 minutes ago",
  },
  {
    id: 2,
    event: "Invitation accepted by Sneha",
    time: "1 hour ago",
  },
  {
    id: 3,
    event: "Candidate Neha attempted Backend Interview",
    time: "Today, 2:30 PM",
  },
  {
    id: 4,
    event: "Backend Interview created",
    time: "Yesterday",
  },
];

export default function Notifications() {
  return (
    <div className="p-6 space-y-8">

      {/* Notifications Panel */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">🔔 Notifications</h2>

        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.message}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">📜 Activity Timeline</h2>

        <div className="border-l-2 border-blue-500 pl-6 space-y-6">
          {activityTimeline.map((activity) => (
            <div key={activity.id} className="relative">
              <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-500 rounded-full"></div>
              <p className="font-medium">{activity.event}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

