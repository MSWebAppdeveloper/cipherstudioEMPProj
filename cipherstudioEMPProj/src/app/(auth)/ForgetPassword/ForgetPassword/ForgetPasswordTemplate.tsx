import React from "react";
// import { UserFormProps, UserFormTemplateProps } from "./FormInterface";
import { UseModal } from "@/components/common/Modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ForgetPasswordProps } from "./ForegetPasswordInterface";
import Link from "next/link";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});


const ForgetPasswordTemplate: React.FC<ForgetPasswordProps> = ({
  formdata,
  handleChange,
  handleSubmit,

  errors,
  loading,

}) => {
  return (
    <>
      <div>

        <div
          className={`relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 overflow-y-auto`}
        >

          <div className="w-auto">

            <div className="mt-5">
              <Formik
                initialValues={formdata}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>


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

                    <button
                      type="submit"
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                        "Verify mail address"
                      )}
                    </button>
                    <div>
                      <Link href="/login"
                      className="text-sm py-5">Back to <span className="text-blue-700 underline underline-offset-1">login page</span> 
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
export default ForgetPasswordTemplate;
