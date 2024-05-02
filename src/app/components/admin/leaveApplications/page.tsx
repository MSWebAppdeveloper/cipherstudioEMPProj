"use client"
import React, { useEffect, useState } from 'react';
import { ApproveLeave, HistoryLeave, RejectLeave } from '@/services/api';
import { leaveApplicationsInterface } from './leaveApplicationsInterface';
import LeaveApplicationsTemplate from './leaveApplicationsTemplate';

// ... (previous imports)

const LeaveApplications: React.FC = () => {
    const [applications, setApplications] = useState([
        { id: 1, status: 'pending' },
        { id: 2, status: 'approved' }
        // Add more applications as needed
    ]);

    const [approverId, setApproverId] = useState<number | null>(null);
    const [leaveHistory, setLeaveHistory] = useState<leaveApplicationsInterface[]>([]);

    const ApproverId = async () => {
        try {

            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8082/api/employee/user/details', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const user = await response.json();
            if (user.length > 0) {
                return user[0].id; // Replace 'UserId' with the actual property name
            } else {
                // Handle the case where no user is found
                throw new Error('No user found');
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            throw error;
        }
    };

    const fetchApproverId = async () => {
        try {
            // Replace this with your actual authentication logic
            const loggedInApproverId = await ApproverId();
            setApproverId(loggedInApproverId);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const fetchLeaveHistory = async () => {
        try {
            const url = `leave-requests`;
            const response: any = await HistoryLeave(url);
            setLeaveHistory(response.data);

        } catch (error) {
            console.error('Error fetching leave history:', error);
        }
    };

    const approveApplication = async (id: any) => {
        try {
            await fetchApproverId();
            const url = `approval`; // Update the URL based on your backend API
            await ApproveLeave(url, { leave_request_id: id, response: 'approved', approver_id: approverId });

            // Update the leaveHistory state with the modified data
            setLeaveHistory(leaveHistory.map(leave => {
                if (leave.id === id) {
                    return { ...leave, status: 'approved' };
                }
                return leave;
            }));
        } catch (error) {
            console.error('Error approving leave application:', error);
        }
    };

    const rejectApplication = async (id: any) => {
        try {
            await fetchApproverId();
            const url = `approval`; // Update the URL based on your backend API
            await RejectLeave(url, { leave_request_id: id, response: 'rejected', approver_id: approverId });

            // Update the leaveHistory state with the modified data
            setLeaveHistory(leaveHistory.map(leave => {
                if (leave.id === id) {
                    return { ...leave, status: 'rejected' };
                }
                return leave;
            }));
        } catch (error) {
            console.error('Error rejecting leave application:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchApproverId();
            await fetchLeaveHistory();
        };

        fetchData();
    }, []);

    return (
        <>
            <LeaveApplicationsTemplate
                leaveHistory={leaveHistory}
                leaveType={''}
                startDate={''}
                endDate={''}
                reason={''}
                status={''}
                id={''}
                approveApplication={approveApplication}
                rejectApplication={rejectApplication}
            />
        </>
    );
}

export default LeaveApplications;

