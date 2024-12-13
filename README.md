# Analytics Dashboard
A comprehensive analytics dashboard that includes authentication, user management, and detailed analytics features. This dashboard is built with React, Redux, TypeScript, and Recharts for an interactive and modern UI/UX experience.

## Features

### Authentication System
- **Login Page**: Mock authentication for login functionality.
- **Protected Routes**: Routes are protected using Redux state for secure access.
- **Logout Functionality**: Users can log out to terminate the session.

### User Management Dashboard
- **User Table**: Displays a table with pagination (5 users per page).
- **Search and Filter**: Filter users by name and status.
- **User Actions**: View user details and delete users.
- **Status Indicators**: Displays the current status (active/inactive).
- **Region Information**: Displays the region information for each user.

### Analytics Dashboard
- **Overview Cards**: Key metrics displayed on cards.
- **Interactive Charts** using [Recharts](https://recharts.org/):
  - **Line Chart**: Registration trends over time.
  - **Pie Chart**: Active vs Inactive users.
  - **Bar Chart**: Regional user distribution.
- **Filters**: Date range and region filters to customize data.

### State Management
- **Redux Store**: 
  - Separate slices for Authentication, User Management, and Analytics data.
- **TypeScript**: Interfaces for type safety.
- **Async Actions**: Using Redux Thunk for asynchronous operations.

### UI/UX Features
- **Modern Interface**: Clean, user-friendly design.
- **Loading States and Error Handling**: Proper handling for loading states and error scenarios.
- **Interactive Controls**: Filters and chart interactions to provide detailed insights.
- **Lucide React Icons**: For clean and modern visual elements.

## How to Use

### Login Credentials:
- **Username**: admin
- **Password**: password

### Navigation:
- Navigate between dashboards using the sidebar.
- Use the **search bar** in the Users dashboard to filter users.
- Apply **date range** and **region** filters in the Analytics dashboard.
- Interact with the **charts** to view detailed data.