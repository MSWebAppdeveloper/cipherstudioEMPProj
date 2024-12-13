import React, { useState } from 'react';
import { RulesForCalendarProps } from './RuleForCalendarInterface';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from 'axios';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

const RuleForCalendarTemplate: React.FC<RulesForCalendarProps> = ({
  activeTab,
  setActiveTab,
  setModal,
  allRules,
  deleteSelected,
  handleDeleteConfirmation,
  cancelDeleteRule,
  isDeleteConfirmationVisible,
  selectedRuleId,
  onupdate
}) => {
  const [graceStart, setGraceStart] = useState<string>('');
  // const [graceEnd, setGraceEnd] = useState<string>('');
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [allowedCount, setAllowedCount] = useState<string>('')
  const [selectedRuleData, setSelectedRuleData] = useState<null>(null)
  const [ruleId, setRuleId] = useState<any>()
  const handleGraceSubmit = async (ruleId: string) => {
    if (!graceStart || !allowedCount) {
      alert('Please fill in all fields and select a rule');
      return;
    }

    try {
      const ruleData = {
        graceTime: graceStart,
        // end: graceEnd,
        allowedCount: allowedCount,
      };

      const response = await axios.put(
        `http://192.168.1.8:8080/api/rules/${ruleId}`,
        ruleData
      );
      if (response.status === 200) {
        toast.success('Rule updated successfully!');
        onupdate();
        setGraceStart('');
        // setGraceEnd('');
        setAllowedCount('');
        setModal(false);
      } else {
        alert('Failed to update the rule. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting grace data:', error);
      alert('An error occurred while submitting the rule. Please try again later.');
    }
  };



  const handleRuleClick = (rule: any) => {
    setActiveTab(rule.ruleName === 'Grace' ? 'grace' : rule.key);
    setSelectedRuleData(rule);
    setGraceStart(rule.graceTime || '');
    setAllowedCount(rule.allowedCount || '');
    setRuleId(rule.id);

  };

  const softDeleteUser = (ruleId: string) => {
    setDeleteAlertVisible(false); // Hide delete alert
    // Perform soft delete operation here
    deleteSelected(ruleId);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-96 bg-white text-gray-900 p-4 shadow-md">
        <div className="space-y-4">
          {/* Dropdown */}
          <div className="relative">
            <button
              className="w-full flex items-center justify-between text-left bg-gray-200 p-3 rounded-md hover:bg-gray-300"
              onClick={() => setActiveTab('rules')}
            >
              Rules
              <RiArrowDropDownLine size={24} />
            </button>
            {activeTab === 'rules' && (
              <ul className="absolute left-0 mt-2 bg-gray-200 rounded-md shadow-lg w-full">
                {allRules.map((rule: any) => (
                  <li
                    key={rule.key}
                    className="flex    items-center px-4 py-2 hover:bg-gray-300 cursor-pointer"
                  >
                    <span
                      onClick={() =>
                        handleRuleClick(rule)
                      }
                      className='rule-name max-w-[90%] truncate'
                      style={{ flex: '0 0 90%' }}
                    >
                      {rule.ruleName}
                    </span>
                    <button
                      className="flex justify-center items-center ml-9"
                      style={{ flex: '0 0 10%' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSelected(rule.id)
                      }}
                    >
                      <Icon
                        icon="mi:delete"
                        width="1.2em"
                        height="1.2em"
                        style={{ color: "#323232" }}
                      />
                    </button>
                    {isDeleteAlertVisible && (
                      <div className="fixed deletePopup  inset-0 overflow-y-auto">
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
                                onClick={() => softDeleteUser(selectedRuleId)}
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
                      <div className="fixed inset-0 deletePopup overflow-y-auto flex justify-center items-center">
                        <div className="absolute inset-0 bg-black opacity-25"></div>
                        <div className="relative bg-white rounded-lg p-8">
                          <p className="text-lg font-semibold mb-4">
                            Are you sure you want to delete this rule?
                          </p>
                          <div className="flex justify-end">
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                              onClick={handleDeleteConfirmation}
                            >
                              Yes
                            </button>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                              onClick={cancelDeleteRule
                              }
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Rules tab */}
        {activeTab === 'rules' && (
          <>
            <div className="flex justify-end mb-6">
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => setModal((prev) => !prev)}
              >
                Add Rules
              </button>
            </div>

            <h1 className="text-3xl font-bold mb-4">Welcome</h1>
            <p className="text-lg text-gray-700">
              Select a rule from the sidebar to view its details.
            </p>
          </>
        )}

        {/* Grace Rules page */}
        {activeTab === 'grace' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Grace Rules for Calendar</h1>
            <p className="text-lg text-gray-700">
              Set the grace period for the attendance calendar.
            </p>

            {/* Grace Time and Allowed Count Inline */}
            <div className="flex items-center space-x-4">
              {/* Grace Start Time */}
              <div className="flex flex-col">
                <label
                  htmlFor="graceStart"
                  className="block text-sm font-medium text-gray-700"
                >
                  Grace Start Time (in minutes)
                </label>
                <input
                  type="number"
                  id="graceStart"
                  value={graceStart}
                  onChange={(e) => setGraceStart(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Enter grace start time"
                />
              </div>

              {/* Allowed Count */}
              <div className="flex flex-col">
                <label
                  htmlFor="allowedCount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Allowed Count
                </label>
                <input
                  type="number"
                  id="allowedCount"
                  value={allowedCount}
                  onChange={(e) => setAllowedCount(e.target.value)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Enter allowed count"
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-end">
                <button
                  onClick={() => handleGraceSubmit(ruleId)}
                  className="bg-blue-600 text-white mt-5 py-2 px-4 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}



        {/* Other rule pages */}
        {activeTab !== 'rules' && activeTab !== 'grace' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">
              Details for Rule: {activeTab}
            </h1>
            <p className="text-lg text-gray-700">
              Here you can view and manage the details for the selected rule.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RuleForCalendarTemplate;
