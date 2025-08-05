import React, { useEffect } from 'react';
import { XIcon } from 'lucide-react';
import { statusOptions } from '../../utils/jobData';

const JobForm = ({ darkMode, job, onSubmit, onCancel, isOpen }) => {
  const [formData, setFormData] = React.useState({
    id: null,
    company: '',
    position: '',
    location: '',
    applicationDate: new Date().toISOString().split('T')[0],
    status: 'applied',
    interviewDate: '',
    jobUrl: '',
    notes: '',
    contactPerson: '',
    contactEmail: '',
  });

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        applicationDate: job.applicationDate
          ? new Date(job.applicationDate).toISOString().split('T')[0]
          : '',
        interviewDate: job.interviewDate
          ? new Date(job.interviewDate).toISOString().split('T')[0]
          : '',
      });
    } else {
      // Reset form when opening for new job
      setFormData({
        id: null,
        company: '',
        position: '',
        location: '',
        applicationDate: new Date().toISOString().split('T')[0],
        status: 'applied',
        interviewDate: '',
        jobUrl: '',
        notes: '',
        contactPerson: '',
        contactEmail: '',
      });
    }
  }, [job, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onCancel}
        >
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-900' : 'bg-gray-500'} opacity-75`}></div>
        </div>

        {/* Modal content */}
        <div
          className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className={`px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-start">
              <h3
                className={`text-lg leading-6 font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                {job ? 'Edit Job Application' : 'Add New Job Application'}
              </h3>
              <button
                onClick={onCancel}
                className={`p-1 rounded-full ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                }`}
              >
                <XIcon size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                        : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                    } border`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                        : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                    } border`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                        : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                    } border`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Application Date *
                  </label>
                  <input
                    type="date"
                    name="applicationDate"
                    value={formData.applicationDate}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                        : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                    } border`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                        : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                    } border`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Interview Date
                    {formData.status === 'interview' && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  <input
                    type="date"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    required={formData.status === 'interview'}
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                        : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                    } border`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Job URL
                </label>
                <input
                  type="url"
                  name="jobUrl"
                  value={formData.jobUrl}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                    darkMode
                      ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                      : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                  } border`}
                  placeholder="https://"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                        : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                    } border`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                      darkMode
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                        : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                    } border`}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                    darkMode
                      ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                      : 'bg-white text-gray-800 border-gray-300 focus:ring-blue-600'
                  } border`}
                  placeholder="Add any notes about the application, interview details, or follow-ups..."
                ></textarea>
              </div>

              <div className={`px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse ${
                darkMode ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <button
                  type="submit"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } text-base font-medium sm:ml-3 sm:w-auto sm:text-sm`}
                >
                  {job ? 'Update Job' : 'Add Job'}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className={`mt-3 w-full inline-flex justify-center rounded-md border ${
                    darkMode
                      ? 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  } shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;