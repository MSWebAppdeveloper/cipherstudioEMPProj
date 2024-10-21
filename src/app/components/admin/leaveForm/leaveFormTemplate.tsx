import React from "react";
import { UseModal } from "@/components/common/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LeaveFormTemplateProps } from "./leaveFormInterface";

// Validation schema for Formik
const validationSchema = Yup.object({
  leave_type_name: Yup.string().required("Leave Type Name is required"),
  assign_year: Yup.string().required("Assign Year is required"),
  allowed_leaves: Yup.number().typeError("Allowed Leaves must be a number").required("Allowed Leaves is required"),
  leave_description: Yup.string().required("Leave Description is required"),
});
const LeaveFormTemplate: React.FC<LeaveFormTemplateProps> = ({
  formdata,
  dataChange,
  handleOnSubmit,
  isModal,
  handleClose,
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
            <Icon icon="material-symbols-light:cancel-outline" width="2em" height="2em" className=" hover:from-fuchsia-100 cursor-pointer" onClick={handleClose} />
          </button>
        </div>
        <div className="w-auto">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              {formdata.leave_type_id ? "Edit Leave Type" : "Create Leave Type"}
              {/* Conditionally render title */}
            </h1>
          </div>
          <div className="mt-5">
            <Formik
              initialValues={formdata}
              validationSchema={validationSchema}
              onSubmit={handleOnSubmit}>

              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      htmlFor="leave_type_name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Leave Type Name
                    </label>
                    <Field
                      type="text"
                      id="leave_type_name"
                      name="leave_type_name"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('leave_type_name', e.target.value);
                        dataChange(e);
                      }}
                      className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Leave Name"
                    />
                    <ErrorMessage
                      name="leave_type_name"
                      component="div"
                      className="text-red-600 text-sm"
                    />

                  </div>

                  {/* Assign Year Field (Always shown) */}
                  <div className="mb-4">
                    <label
                      htmlFor="assign_year"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Assign Year
                    </label>
                    <Field
                      type="text"
                      id="assign_year"
                      name="assign_year"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('assign_year', e.target.value);
                        dataChange(e);
                      }}
                      className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Assign Year"
                    />
                    <ErrorMessage
                      name="assign_year"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  {/* Allowed Leave Field (Always shown) */}
                  <div className="mb-4">
                    <label
                      htmlFor="allowed_leaves"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Allowed Leaves
                    </label>
                    <Field
                      type="text"
                      id="allowed_leaves"
                      name="allowed_leaves"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('allowed_leaves', e.target.value);
                        dataChange(e);
                      }}
                      className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Allowed Leaves"
                    />
                    <ErrorMessage
                      name="allowed_leaves"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>


                  {/* Full Name Field (Always shown) */}
                  <div className="mb-4">
                    <label
                      htmlFor="leave_description"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Leave Description
                    </label>
                    <Field
                      type="text"
                      id="leave_description"
                      name="leave_description"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('leave_description', e.target.value);
                        dataChange(e);
                      }}
                      className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Leave Description"
                    />
                    <ErrorMessage
                      name="leave_description"
                      component="div"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isModal && "sm:w-full"
                      }`}
                    disabled={loading || isSubmitting}
                  >
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} className="spinner mr-2" spin /> // Add spin prop
                    ) : (
                      <>{formdata.leave_type_id ? "Update" : "Save "}</>
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
);

export default LeaveFormTemplate;
