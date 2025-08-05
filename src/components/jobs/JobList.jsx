import React from 'react';
import { TrashIcon, EditIcon, EyeIcon } from 'lucide-react';
import { statusOptions, statusColors, statusColorsDark } from '../../utils/jobData';
import JobViewModal from './JobViewModal';

const JobList = ({ darkMode, jobs, onEdit, onDelete, onStatusChange }) => {
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);

  if (jobs.length === 0) {
    return null;
  }

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div>
      <div
        className={`overflow-x-auto rounded-lg border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th
                scope="col"
                className={`px-4 py-3.5 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } uppercase tracking-wider`}
              >
                Company
              </th>
              <th
                scope="col"
                className={`px-4 py-3.5 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } uppercase tracking-wider`}
              >
                Position
              </th>
              <th
                scope="col"
                className={`px-4 py-3.5 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } uppercase tracking-wider`}
              >
                Applied
              </th>
              <th
                scope="col"
                className={`px-4 py-3.5 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } uppercase tracking-wider`}
              >
                Status
              </th>
              <th
                scope="col"
                className={`px-4 py-3.5 text-right text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                } uppercase tracking-wider`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${
              darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'
            }`}
          >
            {jobs.map((job) => (
              <tr
                key={job.id}
                className={darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}
              >
                <td
                  className={`px-4 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {job.company}
                </td>
                <td
                  className={`px-4 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {job.position}
                </td>
                <td
                  className={`px-4 py-4 whitespace-nowrap text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {new Date(job.applicationDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <select
                    value={job.status}
                    onChange={(e) => onStatusChange(job.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded focus:outline-none ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600'
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    } border`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleViewJob(job)}
                    className={`p-1 rounded-full mr-2 ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                    }`}
                    title="View Details"
                  >
                    <EyeIcon size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(job)}
                    className={`p-1 rounded-full mr-2 ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                    }`}
                    title="Edit"
                  >
                    <EditIcon size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(job.id)}
                    className={`p-1 rounded-full ${
                      darkMode
                        ? 'bg-red-900 hover:bg-red-800 text-red-300'
                        : 'bg-red-100 hover:bg-red-200 text-red-600'
                    }`}
                    title="Delete"
                  >
                    <TrashIcon size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Job Modal */}
      {isViewModalOpen && selectedJob && (
        <JobViewModal
          job={selectedJob}
          onClose={closeModal}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default JobList;