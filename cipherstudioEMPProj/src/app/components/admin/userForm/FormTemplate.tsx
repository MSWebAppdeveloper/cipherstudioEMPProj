import React from "react";
import { UserFormProps, UserFormTemplateProps } from "./FormInterface";
import { UseModal } from "@/components/common/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  userRole: Yup.string().required("Account Type is required"),
});


const UserFormTemplate: React.FC<UserFormTemplateProps> = ({
  formdata,
  handleChange,
  handleSubmit,
  isModal,
  handleClose,
  errors,
  loading,
  // shift,
}) => {
  const shift = ["Day", "Night", "Hybrid"];
  return (
    <>
      <div>
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
                  className=" hover:from-fuchsia-100 cursor-pointer"
                  onClick={handleClose}
                />
              </button>
            </div>
            <div className="w-auto">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {formdata.id ? "Edit User" : "Create User"}
                  {/* Conditionally render title */}
                </h1>
              </div>
              <div className="mt-5">
                <Formik
                  initialValues={formdata}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      {/* Account Type Field */}
                      <div className="mb-4">
                        <label
                          htmlFor="userRole"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Account Type
                        </label>
                        <Field
                          as="select"
                          id="userRole"
                          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          name="userRole"
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setFieldValue('userRole', e.target.value);
                            handleChange(e);
                          }}
                        >
                          <option value="">Select User Type</option>
                          <option value="Management">Management</option>
                          <option value="Employee">Employee</option>
                        </Field>
                        <ErrorMessage
                          name="userRole"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>

                      {/* Full Name Field (Always shown) */}
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Full Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('name', e.target.value);
                            handleChange(e);
                          }}
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-600 text-sm"
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
                        {formdata.id ? (
                          <p className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            {formdata.email}
                          </p>
                        ) : (
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="your@email.com"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setFieldValue('email', e.target.value);
                              handleChange(e);
                            }}
                          />
                        )}
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                        <span className="text-xs text-red-500">
                          {errors?.Email}
                        </span>
                      </div>

                      {/* Department Field (Conditional based on Account Type) */}
                      {formdata.userRole === "Employee" && (
                        <div className="mb-4">
                          <label
                            htmlFor="department"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                          >
                            Department
                          </label>

                          <Field
                            as="select"
                            id="department"
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            name="department"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                              setFieldValue('department', e.target.value);
                              handleChange(e);
                            }}
                          >
                            <option>Choose a department</option>
                            <option value="Web Developer">Web Developer</option>
                            <option value="Designing">Designing</option>
                          </Field>
                          <ErrorMessage
                            name="department"
                            component="div"
                            className="text-red-600 text-sm"
                          />
                        </div>
                      )}

                      <div className="mb-4">
                        <label
                          htmlFor="shift"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Select Shift
                        </label>
                        <Field
                          as="select"
                          id="shift"
                          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          name="shift"
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setFieldValue('shift', e.target.value);
                            handleChange(e);
                          }}
                        >
                          <option value="" disabled>
                            Select Shift Type
                          </option>
                          {shift.map((shiftItem: string) => (
                            <option key={shiftItem} value={shiftItem}>
                              {shiftItem}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="shift"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isModal && "sm:w-full"
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
                          <>{formdata.id ? "Update" : "Save & Invite"}</>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </UseModal>
      </div>
    </>
  );
};
export default UserFormTemplate;
