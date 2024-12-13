import React from "react";
import { Icon } from "@iconify/react";
import { LeaveRequestFormInterface } from "./LeaveRequestFormInterface";
import { UseModal } from "@/components/common/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    leaveType: Yup.string().required("Leave type is required"),
    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),
    reason: Yup.string().required("Reason is required"),
});

const LeaveRequestFormTemplate: React.FC<LeaveRequestFormInterface> = ({
    dataChange,
    handleOnSubmit,
    formdata,
    leaveTypes,
    isModal,
    handleClose,
    loading,
}) => {
    return (
        <>
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
                                Request Leave
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
                                                htmlFor="leaveType"
                                                className="block text-sm font-medium text-textColor"
                                            >
                                                Leave Type:
                                            </label>
                                            <Field
                                                as="select"
                                                id="leaveType"
                                                name="leaveType"
                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                    setFieldValue('leaveType', e.target.value);
                                                    dataChange(e);
                                                  }}
                                                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="" disabled>
                                                    Select Leave Type
                                                </option>
                                                {leaveTypes.map((leaveType) => (
                                                    <option
                                                        key={leaveType.leave_type_id}
                                                        value={leaveType.leave_type_id}
                                                    >
                                                        {leaveType.leave_type_name}
                                                    </option>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="leaveType"
                                                component="div"
                                                className="text-red-600 text-sm"
                                            />
                                        </div>

                                        {/*  Start Date Field (Always shown) */}
                                        <div className="mb-4">
                                            <label
                                                htmlFor="startDate"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                            >
                                                Start Date
                                            </label>
                                            <Field
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    setFieldValue('startDate', e.target.value);
                                                    dataChange(e);
                                                  }}
                                                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <ErrorMessage
                                                name="startDate"
                                                component="div"
                                                className="text-red-600 text-sm"
                                            />
                                        </div>

                                        {/* Start Date Field (Always shown) */}
                                        <div className="mb-4">
                                            <label
                                                htmlFor="endDate"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                            >
                                                End Date
                                            </label>
                                            <Field
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    setFieldValue('endDate', e.target.value);
                                                    dataChange(e);
                                                  }}
                                                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <ErrorMessage
                                                name="endDate"
                                                component="div"
                                                className="text-red-600 text-sm"
                                            />
                                        </div>

                                        {/* Leave Reason Field (Always shown) */}
                                        <div className="mb-4">
                                            <label
                                                htmlFor="reason"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                            >
                                                Leave Reason
                                            </label>
                                            <Field
                                                type="text"
                                                placeholder="type here..."
                                                id="reason"
                                                name="reason"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    setFieldValue('reason', e.target.value);
                                                    dataChange(e);
                                                  }}
                                                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            />
                                            <ErrorMessage
                                                name="reason"
                                                component="div"
                                                className="text-red-600 text-sm"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500${isModal && "sm:w-full"
                                                }`}
                                            disabled={loading || isSubmitting}
                                        >
                                            {loading ? (
                                                <FontAwesomeIcon
                                                    icon={faSpinner}
                                                    className="spinner mr-2"
                                                    spin
                                                /> // Add spin prop
                                            ) : (
                                                <>{"Submit Leave Request"}</>
                                            )}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </UseModal>
        </>
    );
};

export default LeaveRequestFormTemplate;
