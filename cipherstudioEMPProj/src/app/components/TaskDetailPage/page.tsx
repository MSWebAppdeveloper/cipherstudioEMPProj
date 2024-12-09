"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { FormattedTime } from '../../../components/FormattedTime';

interface Task {
  id: number;
  UserId: number;
  userName: string;
  assignedTo: string[];
  createdBy: string | null;
  projectName: string;
  title: string;
  description: string;
  status: string;
  estimatedTime: string;
  startTime: any;
  holdTime: string | null;
  resumeTime: string | null;
  takenTime: string;
  comments: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  file: {
    type: string;
    data: number[];
  } | null;
}

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

const TaskDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId'); // Fetch the taskId from the query parameters
  const projectName = searchParams.get('projectName'); // Fetch the projectName from the query parameters
  const [task, setTask] = useState<Task | null>(null);
  const [taskHistory, setTaskHistory] = useState<TaskHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (taskId) {
      axios.get(`http://192.168.1.5:8080/api/task/${taskId}/details`)
        .then(response => {
          setTask(response.data);
          setTaskHistory(response.data.TaskHistory);
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

  const convertBufferToBase64 = (buffer: number[]) => {
    const binary = new Uint8Array(buffer).reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return window.btoa(binary);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-6">Task Details and History</h1>
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Back
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 text-left">
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="loader"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition duration-200"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Task Information</h2>
              <div className="mb-4">
                <strong>Title:</strong> {task?.title}
              </div>
              <div className="mb-4">
                <strong>Description:</strong> {task?.description}
              </div>
              <div className="mb-4">
                <strong>Assigned To:</strong> {task?.assignedTo.join(", ")}
              </div>
              <div className="mb-4">
                <strong>Project Name:</strong> {task?.projectName}
              </div>
              <div className="mb-4">
                <strong>Status:</strong> {task?.status}
              </div>
              <div className="mb-4">
                <strong>Start Time:</strong> {formatDateTime(task?.startTime)}
              </div>
              <div className="mb-4">
                <strong>Estimated Time:</strong> {task?.estimatedTime} hours
              </div>
              <div className="mb-4">
                <strong>Total Taken Time:</strong> {task ? FormattedTime(parseFloat(task.takenTime)) : 'N/A'}
              </div>
              <div className="mb-4">
                <strong>Comments:</strong> {task?.comments}
              </div>
              {task?.file && (
                <div className="mb-4">
                  <strong>File:</strong>
                  <img
                    src={`data:image/png;base64,${convertBufferToBase64(task.file.data)}`}
                    alt="Task related file"
                    className="mt-2 max-w-sm border"
                  />
                </div>
              )}
            </div>

            {taskHistory.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Task History</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 border-b bg-gray-100">Status</th>
                        <th className="py-3 px-4 border-b bg-gray-100">Start Time</th>
                        <th className="py-3 px-4 border-b bg-gray-100">Hold Time</th>
                        <th className="py-3 px-4 border-b bg-gray-100">Resume Time</th>
                        <th className="py-3 px-4 border-b bg-gray-100">End Time</th>
                        <th className="py-3 px-4 border-b bg-gray-100">Total Spent Time (hours)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taskHistory.map((task, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition duration-200">
                          <td className="py-2 px-4 border-b">{task.status}</td>
                          <td className="py-2 px-4 border-b">{formatDateTime(task.startTime)}</td>
                          <td className="py-2 px-4 border-b">{formatDateTime(task.holdTime)}</td>
                          <td className="py-2 px-4 border-b">{formatDateTime(task.resumeTime)}</td>
                          <td className="py-2 px-4 border-b">{formatDateTime(task.endTime)}</td>
                          <td className="py-2 px-4 border-b">{task.totalSpentTime ?? 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>No task history available for this project.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailPage;
