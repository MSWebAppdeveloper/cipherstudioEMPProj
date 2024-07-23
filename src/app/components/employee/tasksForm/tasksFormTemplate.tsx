import React from "react";
import { Icon } from "@iconify/react";
import { TasksFormInterface } from "./tasksFormInterface";
import { UseModal } from "@/components/common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const TaskFormTemplate: React.FC<TasksFormInterface> = ({
  dataChange,
  handleOnSubmit,
  formdata,
  isModal,
  handleClose,
  loading,
}) => {
  return (
    <>
      <UseModal isOpen={isModal} closeModal={handleClose}>
        <div
          className={`relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 overflow-y-auto`}
        >
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold  rounded m-2 sm:w-auto md:w-auto" // Adjust button size for small and medium screens
            >
              <Icon
                icon="material-symbols-light:cancel-outline"
                width="2em"
                height="2em"
                className="hover:from-fuchsia-100 cursor-pointer"
                onClick={handleClose}
              />
            </button>
          </div>
          <div className="w-auto">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-gray-900">
                {formdata.id ? "Edit Task" : "Add Task"}
              </h1>
            </div>
            <div className="mt-5">
              <form onSubmit={handleOnSubmit}>
                {/* Task Type Field */}
                <div className="mb-4">
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-medium text-textColor"
                  >
                    Project Name:
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    required
                    name="projectName"
                    onChange={dataChange}
                    value={formdata.projectName}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Project Name"
                  />
                </div>

                {/* Task Title Field */}
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Type here..."
                    value={formdata.title}
                    onChange={dataChange}
                    required
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Task Description Field */}
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Type here..."
                    value={formdata.description}
                    onChange={dataChange}
                    required
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Task Estimated Time */}
                <div className="mb-4">
                  <label
                    htmlFor="estimatedTime"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Estimated Time
                  </label>
                  <input
                    type="text"
                    id="estimatedTime"
                    name="estimatedTime"
                    placeholder="Type here..."
                    value={formdata.estimatedTime}
                    onChange={dataChange}
                    required
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>



                {/* Task Status Field */}
                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    required
                    name="status"
                    onChange={dataChange}
                    value={formdata.status}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                {formdata.status === 'Completed' && (
                  <div className="mb-4">
                    <label
                      htmlFor="timeTaken"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Taken Time
                    </label>
                    <input
                      type="text"
                      id="timeTaken"
                      name="timeTaken"
                      placeholder="Type here..."
                      value={formdata.timeTaken}
                      onChange={dataChange}

                      className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500${isModal && " sm:w-full"
                    }`}
                  disabled={loading}
                >
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="spinner mr-2"
                      spin
                    /> // Add spin prop
                  ) : (
                    <>{formdata.id ? "Update task" : "Submit Task"}</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </UseModal>
    </>
  );
};

export default TaskFormTemplate;
