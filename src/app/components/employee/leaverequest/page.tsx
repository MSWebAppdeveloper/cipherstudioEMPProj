"use client"
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
import { LeaveTypes, RequestLeave } from '@/services/api';
import LeaveRequestTemplate from './LeaveRequestTemplate';

const initialValues = {
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
}
interface LeaveRequestComponentProps {
    isModal: boolean;
    handleClose: () => void;
    user: any;
    onUpdate: () => void;
}
const LeaveRequestComponent: React.FC<LeaveRequestComponentProps> = ({
    isModal,
    handleClose,
    user,
    onUpdate,
}) => {
    const [formdata, setFormdata] = useState(initialValues);
    const [leaveTypes, setLeaveTypes] = useState<{ leave_type_id: number; leave_type_name: string }[]>([]);
    const [UserId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchLeaveTypes = async () => {
            try {
                const url = `leavetypes`;
                const response: any = await LeaveTypes(url);
                // console.log(response.data);
                setLeaveTypes(response.data)
            } catch (error) {
                console.error('Error fetching leaveTypes:', error);
            }
        };

        fetchLeaveTypes();
        const fetchUserId = async () => {
            try {
                // Replace this with your actual authentication logic
                // const loggedInUserId = await fetchLoggedInUserId();
                const UserId: any = localStorage.getItem('UserId');
                setUserId(UserId);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserId();
    }, []);
    const fetchLoggedInUserId = async () => {
        try {

            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch('http://192.168.1.2:8080/api/users/user/details', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const user = await response.json();
            if (user.length > 0) {
                return user[0].UserId; // Replace 'UserId' with the actual property name
            } else {
                // Handle the case where no user is found
                throw new Error('No user found');
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            throw error;
        }
    };


    const dataChange = (e: any) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    }

    const handleOnSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const requestData = {
                ...formdata,
                UserId: UserId,
                userName: localStorage.getItem("name"),
            };
            const url = `leave-request`;
            const response: any = await RequestLeave(url, requestData);
            if (response.status === 201) {
                toast.success("Leave request submitted successfully")
                setFormdata(initialValues);
                handleClose();
            } else {
                toast.error(response.data)
            }
        } catch (error: any) {
            console.error('Error submitting leave request:', error.response.data.error);
            toast.error(error.response.data.error)
        }
    };

    const handleClosePopup = () => {
        setFormdata(initialValues); // Clear formData before closing
        handleClose();
    };
    return (
        <LeaveRequestTemplate
            dataChange={dataChange}
            handleOnSubmit={handleOnSubmit}
            formdata={formdata}
            leaveTypes={leaveTypes}
            isModal={isModal}
            handleClose={handleClosePopup}
            loading={loading}
        />
    )
};

export default LeaveRequestComponent;