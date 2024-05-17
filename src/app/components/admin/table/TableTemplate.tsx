/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { UserTableProps } from "./TableInterface";
import { Icon } from "@iconify/react/dist/iconify.js";
import Pagination from "@/components/Pagination";

const UserTableTemplate: React.FC<UserTableProps> = ({
  allUsers,
  deleteSelected,
  openEditPopup,
  setModal,
  confirmDeleteUser,
  cancelDeleteUser,
  isDeleteConfirmationVisible,
  handleToggleUserStatus,
}) => {
  const [currentTab, setCurrentTab] = useState("ALL");
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  const handleFilterChange = (value: string) => {
    setCurrentTab(value);
  };

  // Filter users based on the current tab
  const filteredUsers: any =
    currentTab === "ALL"
      ? allUsers
      : allUsers?.filter((user) => user.userRole === currentTab);
  // Dropdown options
  const filterOptions = ["ALL", "Employee", "Management"];

  const softDeleteUser = (userId: string) => {
    setDeleteAlertVisible(false); // Hide delete alert
    // Perform soft delete operation here
    console.log("Soft delete user with ID:", userId);
    deleteSelected(userId);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div>
        <div>
          <h2 className="lg:py-8 md:py-8 sm:py-8 py-8 text-2xl font-medium">
            Users
          </h2>
        </div>
        <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-10">
          <div className="flex justify-between items-center mt-5 mb-12">
            <div>
              {/* Dropdown menu start*/}
              <form className="max-w-52">
                <select
                  id="countries"
                  className="border border-gray-300 text-gray-800 text-md rounded-md block w-full lg:p-3 py-2 px-2 md:p-2 sm:p-2 dark:placeholder-gray-800 bg-slate-50 focus:none"
                  value={currentTab}
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  {filterOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </form>
            </div>
            <div>
              <button
                className="block text-white bg-green-500 hover:bg-green-400 rounded-md lg:text-lg lg:px-8 lg:py-2 md:py-3 md:px-8 sm:py-2 sm:px-6 text-center"
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
              <table className="table-auto w-full text-left ">
                <thead className="text-lg font-semibold uppercase text-gray-800 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap font-semibold">S NO.</th>
                    <th className="p-2 whitespace-nowrap font-semibold">NAME</th>
                    <th className="p-2 whitespace-nowrap font-semibold">EMAIL</th>
                    <th className="p-2 whitespace-nowrap font-semibold">ACCOUNT TYPE</th>
                    <th className="p-2 whitespace-nowrap font-semibold">DEPARTMENT</th>
                    <th className="p-2 whitespace-nowrap font-semibold">ACTIONS</th>
                    <th className="p-2 whitespace-nowrap font-semibold">ACTIVE</th>
                  </tr>
                </thead>
                <tbody className="text-md divide-y divide-gray-100">
                  {currentItems.map((user: any, index: any) => (
                    <tr key={user.id} className="text-lg text-gray-600">
                      <td className="p-2 whitespace-nowrap">{index + 1} </td>
                      <td className="p-2 whitespace-nowrap">{user.name}</td>
                      <td className="p-2 whitespace-nowrap">{user.email}</td>
                      <td className="p-2 whitespace-nowrap">{user.userRole}</td>
                      <td className="p-2 whitespace-nowrap">
                        {user.department}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {/* {/ <div class="text-md text-left"> /} */}
                        <div className="flex">
                          <button
                            className="btn-1 mr-3 shadow-xl"
                            onClick={() => openEditPopup(user)}
                          >

                            <Icon
                              icon="flowbite:edit-outline"
                              width="1.2em"
                              height="1.2em"
                              style={{ color: "#ffffff" }}
                            />

                          </button>
                          <button
                            className="btn-2 btn-1 shadow-xl"
                            onClick={() => deleteSelected(user.id)}
                          >

                            <Icon
                              icon="mi:delete"
                              width="1.2em"
                              height="1.2em"
                              style={{ color: "#ffffff" }}
                            />

                          </button>
                        </div>
                      </td>
                      <td className="px-2 py-1">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={user.isActive}
                            onChange={(e) => handleToggleUserStatus(user.id, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className={`relative w-11 h-6 ${user.isActive ? 'bg-green-500' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`} />
                        </label>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Delete alert */}
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
            {/*pagination*/}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                  <span className="font-medium">{Math.min(indexOfLastItem, filteredUsers.length)}</span> of{" "}
                  <span className="font-medium">{filteredUsers.length}</span> results
                </p>
              </div>
              <div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
                  paginate={paginate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTableTemplate;
