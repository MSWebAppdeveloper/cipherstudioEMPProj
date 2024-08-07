import React from "react";
import { UseModal } from "@/components/common/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ProjectFormTemplateProps } from "./projectFormInterface";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const validationSchema = Yup.object({
  projectName: Yup.string().required("Project Name is required"),
});


const ProjectFormTemplate: React.FC<ProjectFormTemplateProps> = ({
  formdata,
  dataChange,
  handleOnSubmit,
  isModal,
  handleClose,
  loading,
  allUsers,
}) => {
  const getUserNames = () => {
    return allUsers.map((user) => user.name);
  };
  const getUserOptions = () => {
    return allUsers.map((user) => ({ value: user.name, label: user.name }));
  };
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
                <Icon icon="material-symbols-light:cancel-outline" width="2em" height="2em" className=" hover:from-fuchsia-100 cursor-pointer" onClick={handleClose} />
              </button>
            </div>
            <div className="w-auto">
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {formdata.id ? "Edit Project" : "Add Project "}
                  {/* Conditionally render title */}
                </h1>
              </div>
              <div className="mt-5">
                <Formik
                  initialValues={formdata}
                  validationSchema={validationSchema}
                   onSubmit={handleOnSubmit}
                   >

                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      <div className="mb-4">
                        <label
                          htmlFor="projectName"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Project Name
                        </label>
                        <Field
                          type="text"
                          id="projectName"
                          name="projectName"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue('projectName', e.target.value);
                            dataChange(e);
                          }}
                          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Project Name"

                        />
                        <ErrorMessage
                          name="projectName"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="assignedTo"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Assigned To
                        </label>
                        <Select
                          isMulti
                          name="assignedTo"
                          options={getUserOptions()}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedOptions) => {
                            const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                            setFieldValue('assignedTo', values);
                            dataChange({ target: { name: 'assignedTo', value: values } });
                          }}
                          value={getUserOptions().filter(option => formdata.assignedTo.includes(option.value))}
                        />
                        <ErrorMessage
                          name="assignedTo"
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
                          <>{formdata.id ? "Update" : "Save "}</>
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
  )
}


export default ProjectFormTemplate;
