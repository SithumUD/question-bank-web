export const statusOptions = [
  { value: 'interested', label: 'Interested' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'ghosted', label: 'Ghosted' }
];

export const statusColors = {
  interested: 'bg-blue-100 text-blue-800',
  applied: 'bg-purple-100 text-purple-800',
  interview: 'bg-yellow-100 text-yellow-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  ghosted: 'bg-gray-100 text-gray-800'
};

export const statusColorsDark = {
  interested: 'bg-blue-900 text-blue-100',
  applied: 'bg-purple-900 text-purple-100',
  interview: 'bg-yellow-900 text-yellow-100',
  offer: 'bg-green-900 text-green-100',
  rejected: 'bg-red-900 text-red-100',
  ghosted: 'bg-gray-700 text-gray-100'
};

export const sortJobs = (jobs, sortBy = 'date', sortOrder = 'desc') => {
  const sorted = [...jobs];
  
  sorted.sort((a, b) => {
    if (sortBy === 'date') {
      const dateA = new Date(a.applicationDate);
      const dateB = new Date(b.applicationDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    } else if (sortBy === 'company') {
      return sortOrder === 'asc' 
        ? a.company.localeCompare(b.company)
        : b.company.localeCompare(a.company);
    } else if (sortBy === 'status') {
      const statusOrder = ['interested', 'applied', 'interview', 'offer', 'rejected', 'ghosted'];
      const indexA = statusOrder.indexOf(a.status);
      const indexB = statusOrder.indexOf(b.status);
      return sortOrder === 'asc' ? indexA - indexB : indexB - indexA;
    }
    return 0;
  });
  
  return sorted;
};