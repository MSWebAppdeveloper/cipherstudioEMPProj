import React from "react";
import { UserFormProps } from "./FormInterface";
import { UseModal } from "@/components/common/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UserFormTemplate: React.FC<UserFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  isModal,
  handleClose,
  errors,
  loading,
}) => (
  <div>
    <UseModal isOpen={isModal} closeModal={handleClose}>
      <div
        className={`relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 overflow-y-auto`}
      >
        <div className="flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold  rounded m-2 sm:w-auto md:w-auto" // Adjust button size for small and medium screens
          >
            <Icon icon="material-symbols-light:cancel-outline" width="2em" height="2em" className=" hover:from-fuchsia-100 cursor-pointer" onClick={handleClose}/>
          </button>
        </div>
        <div className="w-auto">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              {formData.id ? "Edit User" : "Create User"}
              {/* Conditionally render title */}
            </h1>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              {/* Account Type Field */}
              <div className="mb-4">
                <label
                  htmlFor="userRole"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Account Type
                </label>
                <select
                  id="userRole"
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="userRole"
                  onChange={handleChange}
                  value={formData.userRole}
                  required
                >
                  <option value="">Select User Type</option>
                  <option value="Management">Management</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              {/* Full Name Field (Always shown) */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="John Doe"
                  required
                />

              </div>

              {/* Email Address Field (Always shown) */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address
                </label>
                {formData.id ? (
                  <p className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">{formData.email}</p>
                ) : (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="your@email.com"
                    required
                  />

                )}
                <span className="text-xs text-red-500">{errors?.Email}</span>
              </div>

              {/* Department Field (Conditional based on Account Type) */}
              {formData.userRole === "Employee" && (
                <div className="mb-4">
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Department
                  </label>

                  <select
                    id="department"
                    className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    name="department"
                    onChange={handleChange}
                    value={formData.department}
                  >
                    <option>Choose a department</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Designing">Designing</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isModal && "sm:w-full"
                  }`}
                disabled={loading}
              >
                {loading ? (
                  <FontAwesomeIcon icon={faSpinner} className="spinner mr-2" spin /> // Add spin prop
                ) : (
                  <>{formData.id ? "Update" : "Save & Invite"}</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </UseModal>
  </div>
);

export default UserFormTemplate;
