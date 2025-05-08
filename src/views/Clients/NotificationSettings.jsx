import { useState } from "react";
const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    caseUpdates: true,
  });

  const handleChange = (type) => {
    setSettings((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>

      <div className="space-y-4">
        {[
          { label: "Email Notifications", key: "email" },
          { label: "SMS Notifications", key: "sms" },
          { label: "Case Update Alerts", key: "caseUpdates" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <span>{item.label}</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings[item.key]}
                onChange={() => handleChange(item.key)}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition duration-300 relative">
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;
