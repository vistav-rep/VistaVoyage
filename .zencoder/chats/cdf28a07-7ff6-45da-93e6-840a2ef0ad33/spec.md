# Technical Specification - Admin Dashboard Enhancement

This specification outlines the steps to implement proper authentication, remove hardcoded data, and refactor the Admin Dashboard UI to align with the "Travelie Travel Agency Admin Dashboard" kit.

## Technical Context
- **Backend**: Node.js, Express, MongoDB (using Mongoose), JSON Web Tokens (JWT).
- **Frontend**: React, Tailwind CSS, Lucide-React for icons, Framer Motion for animations.
- **Data Fetching**: Axios for API calls.

## Implementation Approach

### 1. Backend: Authentication & Authorization
- **`backend/middleware/authMiddleware.js`**:
    - Remove the temporary bypass in `protect` and `admin` functions.
    - Implement real JWT verification using `jsonwebtoken` and `process.env.JWT_SECRET`.
    - Populate `req.user` from the database (excluding password).
    - Ensure `admin` middleware correctly checks for `ADMIN`, `MANAGER`, or `AGENT` roles.
- **`backend/controllers/authController.js`**: (Assuming it handles login)
    - Ensure it issues a valid JWT token on successful staff login.

### 2. Backend: Dashboard Statistics Refinement
- **`backend/controllers/adminController.js`**:
    - `getStats`: Replace hardcoded `airportPickups = 6` with actual counts from `Booking` model where appropriate (e.g., checking metadata for pickup requests).
    - Ensure all stats are calculated using MongoDB aggregation or simple counts where possible.
    - Validate that "Revenue" only counts confirmed and paid bookings.

### 3. Frontend: User State Management
- **`frontend/src/components/Admin/AdminLayout.jsx`**:
    - Remove hardcoded `user` fallback object.
    - Strictly load user data from `localStorage` or context if available.
    - Redirect to `/staff-login` if no valid user/token is found.
- **`frontend/src/components/Admin/DashboardHome.jsx`**:
    - Remove hardcoded user fallback.
    - Ensure all display values come from the API response.

### 4. Frontend: UI Refactor (Travelie Kit)
- **General Styling**:
    - Transition from the current "Dark Executive" theme to a cleaner, more vibrant travel agency theme (based on Travelie UI kit).
    - Use a consistent color palette (likely primary blues, whites, and light grays).
- **`Sidebar.jsx`**:
    - Update navigation items and icons to match Figma.
    - Implement a cleaner, more spaced layout.
- **`AdminLayout.jsx`**:
    - Refactor header (search, notifications, profile) to be more compact and professional.
- **`DashboardHome.jsx`**:
    - Redesign `StatCard` components to match Travelie aesthetics.
    - Improve the "Recent Transactions" table layout and typography.
    - Update "Today's Operations" and "Live Activity" sections for better readability.

## Source Code Changes
- `backend/middleware/authMiddleware.js`
- `backend/controllers/adminController.js`
- `frontend/src/components/Admin/AdminLayout.jsx`
- `frontend/src/components/Admin/DashboardHome.jsx`
- `frontend/src/components/Admin/Sidebar.jsx`
- `frontend/src/pages/StaffLogin.jsx` (Minor tweaks for persistence)

## Verification Plan
- **Manual Testing**:
    - Login as admin, verify token is stored and bypass is gone.
    - Access protected routes, verify 401/403 errors when unauthorized.
    - Compare dashboard values with database entries.
    - Visually compare new UI components with the Figma reference.
- **Automated Testing**: (If applicable in future)
    - Add integration tests for admin endpoints.
