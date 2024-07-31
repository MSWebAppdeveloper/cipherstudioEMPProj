import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { TasksFormInterface } from "./tasksFormInterface";
import { UseModal } from "@/components/common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const validationSchema = Yup.object({
  projectName: Yup.string().required("Project name is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  estimatedTime: Yup.string().required("Estimated time is required"),
});

const TaskFormTemplate: React.FC<TasksFormInterface> = ({
  handleOnSubmit,
  formdata,
  isModal,
  handleClose,
  loading,
  projects,
  dataChange,
}) => {
  return (
    <UseModal isOpen={isModal} closeModal={handleClose}>
      <div
        className={`relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 overflow-y-auto`}
      >
        <div className="flex justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold rounded m-2 sm:w-auto md:w-auto"
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
              Daily Status
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
                  {formdata.id ? <>
                    <div className="mb-4">
                      <label
                        htmlFor="comments"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Comments
                      </label>
                      <Field
                        as="textarea"
                        id="comments"
                        name="comments"
                        placeholder="Type here..."
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          setFieldValue('comments', e.target.value);
                          dataChange(e);
                        }}
                      />
                      <ErrorMessage
                        name="comments"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </> : <>
                    <div className="mb-4">
                      <label
                        htmlFor="projectName"
                        className="block text-sm font-medium text-textColor"
                      >
                        Project Name:
                      </label>
                      <Field
                        as="select"
                        id="projectName"
                        name="projectName"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue('projectName', e.target.value);
                          dataChange(e);
                        }}
                      >
                        <option value="" disabled>
                          Select Project
                        </option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.projectName}>
                            {project.projectName}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="projectName"
                        component="div"
                        className="text-red-600 text-sm"
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
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Type here..."
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue('title', e.target.value);
                          dataChange(e);
                        }}
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Description Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Description
                      </label>
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        placeholder="Type here..."
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          setFieldValue('description', e.target.value);
                          dataChange(e);
                        }}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Estimated Time Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="estimatedTime"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Estimated Time
                      </label>
                      <Field
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue('estimatedTime', e.target.value);
                          dataChange(e);
                        }}
                      />
                      <ErrorMessage
                        name="estimatedTime"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </>
                  }
                  <button
                    type="submit"
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500${isModal && " sm:w-full"
                      }`}
                    disabled={loading || isSubmitting}
                  >
                    {loading ? (
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="spinner mr-2"
                        spin
                      />
                    ) : (
                      <>{formdata.id ?"Update" : "Save "}</>
                    )}
                  </button>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </UseModal>
  );
};

export default TaskFormTemplate;
