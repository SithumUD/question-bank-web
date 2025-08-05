import React from 'react';
import { XIcon, LinkIcon, MailIcon, UserIcon, CalendarIcon } from 'lucide-react';
import { statusOptions, statusColors, statusColorsDark } from '../../utils/jobData';

const JobViewModal = ({ job, onClose, darkMode }) => {
  const statusOption = statusOptions.find(option => option.value === job.status);
  const statusColor = darkMode ? statusColorsDark[job.status] : statusColors[job.status];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
        </div>

        {/* Modal content */}
        <div
          className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3
                  className={`text-lg leading-6 font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {job.company}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {job.position}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-1 rounded-full ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
              >
                <XIcon size={20} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Location
                </label>
                <p
                  className={`mt-1 text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}
                >
                  {job.location || 'Not specified'}
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Application Date
                </label>
                <p
                  className={`mt-1 text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-900'
                  }`}
                >
                  {new Date(job.applicationDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Status
                </label>
                <div className="mt-1">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                  >
                    {statusOption?.label || job.status}
                  </span>
                </div>
              </div>

              {job.interviewDate && (
                <div>
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Interview Date
                  </label>
                  <p
                    className={`mt-1 text-sm ${
                      darkMode ? 'text-gray-200' : 'text-gray-900'
                    }`}
                  >
                    {new Date(job.interviewDate).toLocaleDateString()}
                  </p>
                </div>
              )}

              {job.jobUrl && (
                <div className="sm:col-span-2">
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Job Posting
                  </label>
                  <div className="mt-1 flex items-center">
                    <LinkIcon
                      size={16}
                      className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm ${
                        darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                      }`}
                    >
                      {job.jobUrl}
                    </a>
                  </div>
                </div>
              )}

              {(job.contactPerson || job.contactEmail) && (
                <div className="sm:col-span-2">
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Contact Information
                  </label>
                  <div className="mt-1 space-y-2">
                    {job.contactPerson && (
                      <div className="flex items-center">
                        <UserIcon
                          size={16}
                          className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        />
                        <p
                          className={`text-sm ${
                            darkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}
                        >
                          {job.contactPerson}
                        </p>
                      </div>
                    )}
                    {job.contactEmail && (
                      <div className="flex items-center">
                        <MailIcon
                          size={16}
                          className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        />
                        <a
                          href={`mailto:${job.contactEmail}`}
                          className={`text-sm ${
                            darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
                          }`}
                        >
                          {job.contactEmail}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {job.notes && (
                <div className="sm:col-span-2">
                  <label
                    className={`block text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Notes
                  </label>
                  <div
                    className={`mt-1 p-3 rounded-lg ${
                      darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{job.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}
          >
            <button
              type="button"
              onClick={onClose}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobViewModal;