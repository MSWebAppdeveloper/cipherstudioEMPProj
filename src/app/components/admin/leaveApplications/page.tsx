"use client"
import React, { useEffect, useState } from 'react';
import { ApproveLeave, HistoryLeave, RejectLeave } from '@/services/api';
import { LeaveApplicationsInterface } from './leaveApplicationsInterface';
import LeaveApplicationsTemplate from './leaveApplicationsTemplate';

// ... (previous imports)

const LeaveApplications: React.FC = () => {


    const [approverId, setApproverId] = useState<number | null>(null);
    const [leaveHistory, setLeaveHistory] = useState<LeaveApplicationsInterface[]>([]);
    const [filterType, setFilterType] = useState<"status">("status");
    const [filterValue, setFilterValue] = useState<string | [string, string]>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [formdata, setFormdata] = useState(
        {
            limit: "10",
            order: "",
            status: "",
        }
    )
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [sortColumn, setSortColumn] = useState<string>("createdAt");

    const OnchangeData = (e: any) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };


    const ApproverId = async () => {
        try {

            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch('http://192.168.1.2:8080/api/employee/user/details', {
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

    const fetchLeaveHistory = async (page: number) => {
        try {
            const url = `leave-requests?page=${page}&limit=${formdata.limit}&order=${formdata.order}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`;

            const response: any = await HistoryLeave(url);

            setLeaveHistory(response.data.data);
            setTotalPages(response.data.totalPages);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.error('Error fetching leave history:', error);
        }
    };

    const approveApplication = async (id: any) => {
        try {
            await fetchApproverId();
            const url = `approval`; // Update the URL based on your backend API
            await ApproveLeave(url, { leave_request_id: id, response: 'Approved', approver_id: approverId });

            // Update the leaveHistory state with the modified data
            setLeaveHistory(leaveHistory.map(leave => {
                if (leave.id === id) {
                    return { ...leave, status: 'Approved' };
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
            await RejectLeave(url, { leave_request_id: id, response: 'Rejected', approver_id: approverId });

            // Update the leaveHistory state with the modified data
            setLeaveHistory(leaveHistory.map(leave => {
                if (leave.id === id) {
                    return { ...leave, status: 'Rejected' };
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
            await fetchLeaveHistory(currentPage);
        };

        fetchData();
    }, [currentPage, formdata.limit, formdata.order, sortColumn, sortOrder]);

    const handleFilterChange = (
        type: "status",
        value: string | [string, string]
    ) => {
        setFilterType(type);
        setFilterValue(value);
    };

    const handleSort = (column: string) => {
        const order = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(order);
        setSortColumn(column);
    };

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    return (
        <>
            <LeaveApplicationsTemplate
                leaveHistory={leaveHistory}
                leaveType={''}
                startDate={''}
                endDate={''}
                reason={''}
                status={''}
                userName={''}
                id={''}
                approveApplication={approveApplication}
                rejectApplication={rejectApplication}
                filterName={filterType === "status" ? (filterValue as string) : ""}
                setFilterName={(value: any) => setFilterValue(value)}
                currentPage={currentPage}
                paginate={paginate}
                totalPages={totalPages}
                totalRecords={totalRecords}
                totalCount={totalCount}
                OnchangeData={OnchangeData}
                formdata={formdata}
                handleFilterChange={handleFilterChange}
                total_days={0}
                handleSort={handleSort}
                sortOrder={sortOrder}
                sortColumn={sortColumn}
            />
        </>
    );
}

export default LeaveApplications;


