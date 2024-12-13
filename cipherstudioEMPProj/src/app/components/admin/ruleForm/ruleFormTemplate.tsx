import React from "react";
import { UseModal } from "@/components/common/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { RuleFormTemplateProps } from "./RuleForminterface";

const validationSchema = Yup.object({
  name: Yup.string().required("Rule Name is required"),

});


const RuleFormTemplate: React.FC<RuleFormTemplateProps> = ({
  formdata,
  handleChange,
  handleSubmit,
  isModal,
  handleClose,
  errors,
  loading,
 
}) => {
 
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
                  {formdata.id ? "Edit Rules" : "Create Rules"}
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
                      {/* Full Name Field (Always shown) */}
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                          Rule Name
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Name"
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
                          <>{formdata.id ? "Update" : "Save"}</>
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
export default RuleFormTemplate;
