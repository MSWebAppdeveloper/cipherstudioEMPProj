"use client"

import React, { useEffect, useState } from 'react'
import RuleForCalendarTemplate from './RuleForCalendarTemplate';
import RuleFormComponent from '../ruleForm/page';
import axios from 'axios';
import toast from 'react-hot-toast';

const RulesForCalendar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isModal, setModal] = useState<boolean>(false)
  const [selectedRule, setSelectedRule] = useState<any>(null);
  const [allRules, setAllRules] = useState<any[]>([]);
  const [selectedRuleId, setSelectedRuleId] = useState<string>("")
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState<boolean>(false);
  const getAllRules = async () => {
    try {
      const response = await axios.get(`http://192.168.1.8:8080/api/rules`)
      setAllRules(response.data)

    } catch (err) {
      console.log("Error fetching users:", err)
    }
  }

  useEffect(() => {
    getAllRules()
  }, [])


  const handleDeleteRule = async (ruleId: string) => {
    setSelectedRuleId(ruleId)
    setDeleteConfirmationVisible(true)
  }

  const handleDeleteConfirmation = async () => {
    try {
      const response = await axios.delete(`http://192.168.1.8:8080/api/rules/${selectedRuleId}`)
      if (response.status === 200) {
        getAllRules()
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("User deleted successfully");
    } finally {
      setDeleteConfirmationVisible(false);
    }
  }
  const cancelDeleteRule = () => {
    setDeleteConfirmationVisible(false);
  };


  const handleEditUserUpdate = () => {
    getAllRules()

  };


  return (
    <>
      <RuleFormComponent
        isModal={isModal}
        handleClose={() => setModal(false)}
        rule={selectedRule}
        onUpdate={handleEditUserUpdate}

      />
      <RuleForCalendarTemplate
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setModal={setModal}
        allRules={allRules}
        deleteSelected={handleDeleteRule}
        handleDeleteConfirmation={handleDeleteConfirmation}
        cancelDeleteRule={cancelDeleteRule}
        isDeleteConfirmationVisible={isDeleteConfirmationVisible}
        selectedRuleId={selectedRuleId}
        onupdate={handleEditUserUpdate}
      />
    </>
  );
};



export default RulesForCalendar;
