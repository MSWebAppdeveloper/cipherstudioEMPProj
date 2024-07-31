import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const TaskHistoryPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [taskHistory, setTaskHistory] = useState([]);

  useEffect(() => {
    if (projectId) {
      // Fetch the task history for the project
      axios.get(`http://192.168.1.2:8082/api/projects/${projectId}/history`)
        .then(response => {
          console.log(response.data)
          setTaskHistory(response.data);
        })
        .catch(error => {
          console.error('Error fetching task history:', error);
        });
    }
  }, [projectId]);

  return (
    <div>
      <h1>Task History for Project {projectId}</h1>
      <div>
        {taskHistory.length > 0 ? (
          <ul>
            {taskHistory.map((task, index) => (
              <li key={index}>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Date/Time:</strong> {task.dateTime}</p>
                <p><strong>User ID:</strong> {task.UserId}</p>
                <p><strong>Total Spent Hours:</strong> {task.totalSpentHours}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No task history available for this project.</p>
        )}
      </div>
    </div>
  );
};

export default TaskHistoryPage;