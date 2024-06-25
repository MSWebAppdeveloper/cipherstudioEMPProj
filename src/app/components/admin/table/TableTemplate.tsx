import React, { useEffect, useState } from "react";
import { UserTableProps } from "./TableInterface";
import { Icon } from "@iconify/react/dist/iconify.js";
import Pagination from "@/components/Pagination";
import TableComponent from "@/components/TableComponent";

const UserTableTemplate: React.FC<UserTableProps> = ({
  allUsers,
  deleteSelected,
  openEditPopup,
  setModal,
  confirmDeleteUser,
  cancelDeleteUser,
  isDeleteConfirmationVisible,
  handleToggleUserStatus,
  currentPage,
  totalPages,
  paginate,
  totalCount,
  OnchangeData,
  formdata,
  handleSort,
  sortOrder,
  sortColumn,
}) => {
  const [currentTab, setCurrentTab] = useState("Active");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };

  const handleRoleChange = (value: string) => {
    setSelectedRole(value);
  };

  // Filter users based on the current tab and role
  const filteredUsers: any = allUsers?.filter((user) => {
    const isActiveMatch =
      currentTab === "Active" ? user.isActive : !user.isActive;
    const isRoleMatch =
      selectedRole === "ALL" || user.userRole === selectedRole;
    return isActiveMatch && isRoleMatch;
  });

  // Dropdown options
  const filterOptions = ["ALL", "Employee", "Management"];

  const softDeleteUser = (userId: string) => {
    setDeleteAlertVisible(false); // Hide delete alert
    // Perform soft delete operation here
    console.log("Soft delete user with ID:", userId);
    deleteSelected(userId);
  };

  const columns = [
    {
      key: "index",
      label: "S NO.",
      render: (item: any, index: number) => <span>{index + 1}</span>,
      sortable: false,
    },
    { key: "name", label: "NAME", sortable: true },
    { key: "email", label: "EMAIL", sortable: true },
    { key: "userRole", label: "ACCOUNT TYPE", sortable: true },
    { key: "department", label: "DEPARTMENT", sortable: true },
    {
      key: "actions",
      label: "ACTIONS",
      render: (user: { id: any }) => (
        <div className="flex">
          <button className="btn-1 mr-3" onClick={() => openEditPopup(user)}>
            <Icon
              icon="flowbite:edit-outline"
              width="1.2em"
              height="1.2em"
              style={{ color: "#3b82f6" }}
            />
          </button>
          <button
            className="btn-2 btn-1 "
            onClick={() => deleteSelected(user.id)}
          >
            <Icon
              icon="mi:delete"
              width="1.2em"
              height="1.2em"
              style={{ color: "#ef4444" }}
            />{" "}
          </button>
        </div>
      ),
      sortable: false,
    },
    {
      key: "active",
      label: "ACTIVE",
      render: (user: { isActive: boolean | undefined; id: string }) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={user.isActive}
            onChange={(e) => handleToggleUserStatus(user.id, e.target.checked)}
            className="sr-only peer"
          />
          <div
            className={`relative w-11 h-6 ${
              user.isActive ? "bg-green-500" : "bg-gray-200"
            } peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
          />
        </label>
      ),
      sortable: false,
    },
  ];
  return (
    <>
      <div>
        <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-10">
          <div className="flex justify-between items-end">
            <div>
              {/* Tab buttons */}
              <div className="flex space-x-4 items-end">
                <form className="max-w-52">
                  <p className="pb-2 font-medium">Filter by :</p>
                  <select
                    id="roleFilter"
                    className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                    value={selectedRole}
                    onChange={(e) => handleRoleChange(e.target.value)}
                  >
                    {filterOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </form>

                <button
                  className={`px-4 py-2 rounded ${
                    currentTab === "Active"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleTabChange("Active")}
                >
                  Active Users
                </button>
                <button
                  className={` rounded-md lg:px-5 lg:py-2 border border-gray-300 md:px-5 md:py-2 sm:px-3 sm:py-2  focus:outline-0 ${
                    currentTab === "Inactive"
                      ? "bg-blue-500 text-white"
                      : "bg-slate-50 text-gray-700"
                  }`}
                  onClick={() => handleTabChange("Inactive")}
                >
                  Inactive Users
                </button>
                {/* Dropdown menu start */}
              </div>
            </div>
            <div>
              <button
                className="rounded bg-blue-500 hover:bg-blue-400 lg:px-5 lg:py-2 md:px-5 md:py-2 sm:px-3 sm:py-2 text-white focus:outline-0"
                type="button"
                onClick={() => setModal((prev) => !prev)}
              >
                Add Users
              </button>
            </div>
          </div>
          {/*table*/}
          <div className="mt-10">
            <div className="overflow-x-auto">
              <TableComponent
                data={filteredUsers}
                columns={columns}
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                totalCount={totalCount}
                OnchangeData={OnchangeData}
                formdata={formdata}
                handleSort={handleSort}
                sortOrder={sortOrder}
                sortColumn={sortColumn}
              />
              {isDeleteAlertVisible && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      className="fixed inset-0 transition-opacity"
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span
                      className="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <div
                      className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="modal-headline"
                    >
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            {/* Heroicon name: outline/exclamation */}
                            <svg
                              className="h-6 w-6 text-red-600"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.85-1.24 2.85-2.77V8.77c0-1.53-1.31-2.77-2.85-2.77H5.062C3.522 6 2.212 7.24 2.212 8.77v10.46c0 1.53 1.31 2.77 2.85 2.77z"
                              />
                            </svg>
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                              className="text-lg leading-6 font-medium text-gray-900"
                              id="modal-headline"
                            >
                              Delete User
                            </h3>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Are you sure you want to delete this user?
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          onClick={() => softDeleteUser(selectedUserId)}
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteAlertVisible(false)}
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {isDeleteConfirmationVisible && (
                <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center">
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="relative bg-white rounded-lg p-8">
                    <p className="text-lg font-semibold mb-4">
                      Are you sure you want to delete this user?
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={confirmDeleteUser}
                      >
                        Yes
                      </button>
                      <button
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                        onClick={cancelDeleteUser}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTableTemplate;
