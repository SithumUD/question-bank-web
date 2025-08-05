import React, { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import JobForm from './JobForm';
import JobList from './JobList';
import { addJob, updateJob, deleteJob, getJobs } from '../../utils/firebase';
import { statusOptions, sortJobs } from '../../utils/jobData';

const JobTrackerComponent = ({ darkMode }) => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ by: 'date', order: 'desc' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getJobs();
        setJobs(jobsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleAddJob = async (jobData) => {
    try {
      await addJob(jobData);
      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleUpdateJob = async (jobData) => {
    try {
      await updateJob(jobData.id, jobData);
      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
      setEditingJob(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await deleteJob(id);
      const updatedJobs = await getJobs();
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const job = jobs.find(j => j.id === id);
      if (job) {
        await updateJob(id, { ...job, status });
        const updatedJobs = await getJobs();
        setJobs(updatedJobs);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSort = (by) => {
    const order = sortConfig.by === by && sortConfig.order === 'asc' ? 'desc' : 'asc';
    setSortConfig({ by, order });
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleAddNewJob = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const sortedJobs = sortJobs(jobs, sortConfig.by, sortConfig.order);

  const activeJobs = sortedJobs.filter(job => 
    ['interested', 'applied', 'interview'].includes(job.status)
  );
  const archivedJobs = sortedJobs.filter(job => 
    ['offer', 'rejected', 'ghosted'].includes(job.status)
  );

  if (loading) {
    return (
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Active Applications ({activeJobs.length})
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Track your ongoing job applications
          </p>
        </div>
        <button
          onClick={handleAddNewJob}
          className={`flex items-center px-4 py-2 rounded-lg ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <PlusIcon size={18} className="mr-2" />
          Add Job
        </button>
      </div>

      <JobForm
        darkMode={darkMode}
        job={editingJob}
        onSubmit={editingJob ? handleUpdateJob : handleAddJob}
        onCancel={() => setIsFormOpen(false)}
        isOpen={isFormOpen}
      />

      {activeJobs.length > 0 ? (
        <JobList
          darkMode={darkMode}
          jobs={activeJobs}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
          onStatusChange={handleStatusChange}
        />
      ) : (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
            No active job applications. Add your first job to get started!
          </p>
        </div>
      )}

      {archivedJobs.length > 0 && (
        <div className="mt-8">
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Archived Applications ({archivedJobs.length})
          </h2>
          <JobList
            darkMode={darkMode}
            jobs={archivedJobs}
            onEdit={handleEditJob}
            onDelete={handleDeleteJob}
            onStatusChange={handleStatusChange}
          />
        </div>
      )}
    </div>
  );
};

export default JobTrackerComponent;