import { useEffect, useState } from "react";
import API from "../api/api";

function ActivityLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const res = await API.get("/activity-logs");
    setLogs(res.data.data);
  };

  return (
    <div>
      <h2>Activity Logs</h2>

      <table border="1">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Entity</th>
            <th>Old Value</th>
            <th>New Value</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.user?.name}</td>
              <td>{log.action}</td>
              <td>{log.entity_type}</td>
              <td>{JSON.stringify(log.old_values)}</td>
              <td>
                {Object.entries(log.new_values || {})
                  .filter(
                    ([key]) => key !== "created_at" && key !== "updated_at",
                  )
                  .map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}</strong>: {String(value)}
                    </div>
                  ))}
              </td>
              <td>{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityLogs;
