"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

interface TaskHistory {
  UserId: number;
  taskId: number;
  TaskId: number;
  status: "Recently Added" | "In Progress" | "Completed" | "Hold";
  startTime: string | null;
  holdTime: string | null;
  resumeTime: string | null;
  endTime: string | null;
  comments: string | null;
  description: string | null;
  totalSpentTime: number | null;
}

const TaskHistoryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId'); // Fetch the taskId from the query parameters
  const projectName = searchParams.get('projectName'); 
  const [taskHistory, setTaskHistory] = useState<TaskHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (taskId) {
      // Fetch the task history for the project
      axios.get(`http://192.168.1.5:8080/api/task/${taskId}/history`)
        .then(response => {
          setTaskHistory(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching task history:', error);
          setError('Failed to fetch task history. Please try again later.');
          setLoading(false);
        });
    }
  }, [taskId]);

  const formatDateTime = (dateTime: string | null) => {
    if (!dateTime) return "N/A";
    return new Date(dateTime).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Task History of Project  {projectName || 'Unknown'}</h1>
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Back
      </button>
      <div className="bg-white shadow-md rounded-lg p-6 text-left">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : taskHistory.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Start Time</th>
                <th className="py-2 px-4 border-b">Hold Time</th>
                <th className="py-2 px-4 border-b">Resume Time</th>
                <th className="py-2 px-4 border-b">End Time</th>
                <th className="py-2 px-4 border-b">Total Spent Time (hours)</th>
                <th className="py-2 px-4 border-b">Comments</th>
                <th className="py-2 px-4 border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              {taskHistory.map((task, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{task.status}</td>
                  <td className="py-2 px-4 border-b">{formatDateTime(task.startTime)}</td>
                  <td className="py-2 px-4 border-b">{formatDateTime(task.holdTime)}</td>
                  <td className="py-2 px-4 border-b">{formatDateTime(task.resumeTime)}</td>
                  <td className="py-2 px-4 border-b">{formatDateTime(task.endTime)}</td>
                  <td className="py-2 px-4 border-b">{task.totalSpentTime ?? 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{task.comments ?? 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{task.description ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No task history available for this project.</p>
        )}
      </div>
    </div>
  );
};

export default TaskHistoryPage;
