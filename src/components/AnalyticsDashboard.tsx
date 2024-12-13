import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { fetchAnalytics, setDateRange, setSelectedRegion } from '../store/slices/analyticsSlice';
import type { RootState } from '../store';
import { Users, UserCheck, UserMinus } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AnalyticsDashboard = () => {
  const dispatch = useDispatch();
  const {
    totalUsers,
    activeUsers,
    deletedUsers,
    registrationTrend,
    usersByStatus,
    usersByRegion,
    loading,
    error,
    dateRange,
    selectedRegion,
  } = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    dispatch(
      fetchAnalytics({
        startDate: dateRange.start,
        endDate: dateRange.end,
        region: selectedRegion,
      }) as any
    );
  }, [dispatch, dateRange, selectedRegion]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  // Date Range Change Handler with Validation
  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const newDate = new Date(value).toISOString();
    if (field === 'start' && new Date(newDate) > new Date(dateRange.end)) {
      alert("Start date can't be later than End date");
      return;
    }
    dispatch(setDateRange({ ...dateRange, [field]: newDate }));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>

      {/* Filters */}
      <div className="mb-8 flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date Range</label>
          <input
            type="date"
            value={dateRange.start.split('T')[0]}
            onChange={(e) => handleDateRangeChange('start', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="date"
            value={dateRange.end.split('T')[0]}
            onChange={(e) => handleDateRangeChange('end', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Region</label>
          <select
            value={selectedRegion || ''}
            onChange={(e) => dispatch(setSelectedRegion(e.target.value || null))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Regions</option>
            {usersByRegion.length > 0 ? (
              usersByRegion.map((item) => (
                <option key={item.region} value={item.region}>
                  {item.region}
                </option>
              ))
            ) : (
              <option value="">No regions available</option>
            )}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">{activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <UserMinus className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Deleted Users</p>
              <p className="text-2xl font-semibold text-gray-900">{deletedUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Registration Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={registrationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#0088FE" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users by Status */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Users by Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart >
                <Pie className='font-medium text-2xl'
                  data={usersByStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {usersByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} name={entry.status} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Users by Region */}
        <div className="bg-white p-6 rounded-lg shadow col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Users by Region</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usersByRegion}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
