# Mandhirhothi Admin Dashboard

A modern, responsive admin dashboard built with React and Vite for managing users, content, and system operations.

## 🚀 Features

### User Management
- **User Overview**: View all registered users with detailed information
- **User Actions**: Block/unblock users, view detailed profiles
- **User Verification**: Track user verification status and progress
- **Blocked Users**: Dedicated page for managing blocked users

### Content Management
- **Blog Management**: Create, edit, and manage blog posts
- **FAQ Management**: Maintain frequently asked questions
- **About Us & Privacy Policy**: Manage static content pages
- **Terms & Conditions**: Handle legal documentation

### System Administration
- **Admin Creation**: Create new admin accounts
- **Notifications**: System-wide notification management
- **Reports**: Generate and view system reports
- **Earnings Management**: Track and manage financial data
- **Subscriber Management**: Handle newsletter subscribers

### Dashboard Features
- **Analytics Dashboard**: Overview of key metrics and statistics
- **Responsive Design**: Mobile-first approach with responsive sidebar
- **Modern UI**: Built with Ant Design components and Tailwind CSS
- **Role-based Access**: Admin and user role management

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern React with hooks
- **Vite 6.2.0** - Fast build tool and dev server
- **React Router DOM 7.3.0** - Client-side routing
- **Ant Design 5.24.3** - UI component library
- **Tailwind CSS 4.0.14** - Utility-first CSS framework

### State Management
- **Redux Toolkit 2.8.1** - State management
- **React Redux 9.2.0** - React bindings for Redux
- **Redux Persist 6.0.0** - Persist Redux state

### Additional Libraries
- **React Icons 5.5.0** - Icon library
- **React Hot Toast 2.5.2** - Toast notifications
- **SweetAlert2 11.21.0** - Beautiful alerts
- **Recharts 2.15.1** - Charts and data visualization
- **Jodit React 5.2.15** - Rich text editor
- **JWT Decode 4.0.0** - JWT token handling
- **Day.js 1.11.13** & **Moment 2.30.1** - Date manipulation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mandhirhothi-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=your_api_base_url
   VITE_JWT_SECRET=your_jwt_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── Components/
│   ├── Shared/           # Reusable components
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Loaders/
│   │   └── Error/
│   └── charts/           # Chart components
├── Layout/
│   └── Dashboard.jsx     # Main dashboard layout
├── pages/
│   ├── Auth/            # Authentication pages
│   ├── User/            # User management
│   ├── Blogs/           # Blog management
│   ├── DashboardHome/   # Dashboard home
│   ├── Profile/         # User profile
│   └── [other pages]/
├── redux/
│   ├── api/             # RTK Query API slices
│   ├── Slice/           # Redux slices
│   └── store.js         # Redux store configuration
├── Routes/
│   ├── Routes.jsx       # Route definitions
│   └── PrivetRoute.jsx  # Protected route component
└── Utils/
    ├── Sideber/         # Sidebar utilities
    ├── decode-access-token.js
    └── hook.js
```

## 🔐 Authentication

The application uses JWT-based authentication with:
- Login/logout functionality
- Password reset flow
- OTP verification
- Protected routes
- Token persistence with Redux Persist

## 📱 Responsive Design

- **Mobile-first approach** with responsive breakpoints
- **Collapsible sidebar** for mobile devices
- **Responsive tables** with horizontal scrolling
- **Touch-friendly** interface elements

## 🎨 UI/UX Features

- **Custom color scheme** with primary green theme (`#00823b`)
- **Consistent spacing** and typography
- **Loading states** and error handling
- **Modal dialogs** for user interactions
- **Toast notifications** for user feedback
- **Pagination** for large data sets

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Vite Configuration
The project uses Vite with React plugin for fast development and optimized builds.

### ESLint Configuration
ESLint is configured with React-specific rules for code quality.

### Tailwind CSS
Custom Tailwind configuration with project-specific colors and utilities.

## 📊 Key Pages

1. **Dashboard Home** - Overview and analytics
2. **User Management** - Complete user administration
3. **Blog Management** - Content creation and editing
4. **Earnings** - Financial tracking and reports
5. **Settings** - System configuration pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 🐛 Known Issues

- Private routes are currently commented out (line 28-30, 40-42 in Routes.jsx)
- Search functionality is disabled in AllUsers component (lines 276-284)

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using React, Vite, and modern web technologies**
