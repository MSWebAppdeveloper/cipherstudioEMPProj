import React, { useState } from 'react'
import { OptionsProps } from './optionsInterface'
import { Icon } from '@iconify/react/dist/iconify.js'
import TableComponent from '@/components/TableComponent';

const OptionsTemplate: React.FC<OptionsProps> = ({
  setModal,
  deleteSelected,
  openEditPopup,
  confirmDeleteLeave,
  cancelDeleteLeave,
  isDeleteConfirmationVisible,
  leaveTypes,
  OnchangeData,
  formdata,
  currentPage,
  totalPages,
  totalRecords,
  paginate,
  totalCount,
  handleSort,
  sortOrder,
  sortColumn,
}) => {

  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState("");


  const softDeleteLeave = (leaveId: string) => {
    setDeleteAlertVisible(false); // Hide delete alert
    // Perform soft delete operation here
    console.log("Soft delete leave with ID:", leaveId);
    deleteSelected(leaveId);
  };
  const columns = [
    {
      key: "index",
      label: "S NO.",
      render: (item: any, index: number) => <span>{index + 1}</span>, sortable: false
    },
    { key: "leave_type_name", label: "Leave Type", sortable: true, },
    { key: "assign_year", label: "Assign Year", sortable: false },
    { key: "allowed_leaves", label: "Allowed Days" , sortable: false },
    { key: "leave_description", label: "Description", sortable: false  },
    {
      key: "actions",
      label: "ACTIONS",
      render: (user: { id: any; }) => (
        <div className="flex">
          <button className="btn-1 mr-3 shadow-xl" onClick={() => openEditPopup(user)}>
            <Icon icon="flowbite:edit-outline" width="1.2em" height="1.2em" style={{ color: "#ffffff" }} />
          </button>
          <button className="btn-2 btn-1 shadow-xl" onClick={() => deleteSelected(user.id)}>
            <Icon icon="mi:delete" width="1.2em" height="1.2em" style={{ color: "#ffffff" }} />
          </button>
        </div>
      ),
      sortable: false 
    },

  ];
  return (
    <>
      <div>
        <div className="p-5 box-shadow rounded-md mt-4 lg:px-8 lg:py-10">
          <div>

            <div className="flex justify-between items-center">

              <div className="flex items-center">
                <span className="mr-4 text-lg font-medium">Year:</span>
                <select
                  value={formdata.year}
                  name="year"
                  onChange={OnchangeData}
                  className="border border-gray-300 text-gray-800 text-md rounded-md block lg:p-2 p-2 md:p-2 sm:p-2 bg-slate-50"
                >
                  <option value="">Select year</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
              <div>
                <button
                  className="block text-white bg-green-500 hover:bg-green-400 rounded-md lg:text-lg lg:px-8 lg:py-2 md:py-3 md:px-8 sm:py-2 sm:px-6 text-center"
                  type="button"
                  onClick={() => setModal((prev) => !prev)}
                >
                  Add Leave Type
                </button>
              </div>
            </div>
          </div>

          {/*table*/}
          <div className="mt-10">
            <div className="overflow-x-auto">
              <TableComponent
                data={leaveTypes}
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
                            Delete leave
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this leave?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={() => softDeleteLeave(selectedLeaveId)}
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
                    Are you sure you want to delete this leave?
                  </p>
                  <div className="flex justify-end">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={confirmDeleteLeave}
                    >
                      Yes
                    </button>
                    <button
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                      onClick={cancelDeleteLeave}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/*pagination*/}
            {/* <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div>
              <label htmlFor="limit" className="mr-2">
                Items per page:
              </label>
              <input
                id="limit"
                type="number"
                min="1"
                value={formdata.limit}
                onChange={OnchangeData}
                className="border border-gray-300 rounded-md p-1 text-sm"
                name="limit"
              />
            </div>
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {currentPage === 1
                    ? 1
                    : (currentPage - 1) * formdata.limit + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {currentPage === totalPages
                    ? (currentPage - 1) * formdata.limit +
                    filteredUsers.length
                    : currentPage * formdata.limit}
                </span>{" "}
                of <span className="font-medium">{totalCount}</span> results
              </p>
            </div>
            <div>
              <select
                id="order"
                name="order"
                value={formdata.order}
                onChange={OnchangeData}
                className="border border-gray-300 rounded-md p-1 text-sm"
              >
                <option value="">Select sorting</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default OptionsTemplate
