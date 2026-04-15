# Implementation Plan - Admin Dashboard & Auth

## Agent Instructions

Ask the user questions when anything is unclear or needs their input.

---

## Workflow Steps

### [x] Step: Technical Specification
- [x] Assess the task's difficulty: **Medium**
- [x] Create a technical specification for the task: `spec.md`
- [x] Identify all source code files to be modified.
- [x] Define verification steps.

### [ ] Task: Backend - Implement Authentication & Authorization
- [ ] Remove the "temporary bypass" in `backend/middleware/authMiddleware.js`.
- [ ] Implement proper JWT verification using `jsonwebtoken` and `User` model.
- [ ] Restore role-based checks (`ADMIN`, `MANAGER`, `AGENT`) in the `admin` middleware.
- [ ] Ensure `req.user` is correctly populated and handled in all controllers.
- [ ] Verify that unauthorized users are correctly blocked from accessing protected routes.

### [ ] Task: Backend - Refine Dashboard Statistics
- [ ] Update `getStats` in `backend/controllers/adminController.js` to remove hardcoded values (like `airportPickups`).
- [ ] Implement actual logic for `airportPickups` and other operational stats.
- [ ] Ensure all dashboard stats are accurately fetched from MongoDB using appropriate queries or aggregations.
- [ ] Verify that revenue calculations exclude pending or failed payments.

### [ ] Task: Frontend - Refactor User State & Remove Hardcoded Data
- [ ] Update `frontend/src/pages/StaffLogin.jsx` to ensure consistent data persistence.
- [ ] Update `frontend/src/components/Admin/AdminLayout.jsx` to strictly use authenticated user data from `localStorage`.
- [ ] Remove all hardcoded fallback user objects from `AdminLayout.jsx` and `DashboardHome.jsx`.
- [ ] Implement a redirection check to `/staff-login` if the user session is missing or expired.

### [ ] Task: Frontend - Redesign Dashboard UI (Travelie Kit)
- [ ] Refactor `frontend/src/components/Admin/Sidebar.jsx` to match the Travelie UI kit (modern, clean, travel-oriented).
- [ ] Update `frontend/src/components/Admin/AdminLayout.jsx` header (search, notifications, profile) for better aesthetics.
- [ ] Redesign `DashboardHome.jsx` components:
    - [ ] Update `StatCard` layout, typography, and iconography.
    - [ ] Redesign the "Recent Transactions" table for better data presentation.
    - [ ] Update "Today's Operations" and "Live Activity Feed" layouts.
- [ ] Ensure consistent theme usage (colors, shadows, spacing) across all admin components.

### [ ] Task: Final Verification and Report
- [ ] Perform a full manual verification of the admin login and dashboard flow.
- [ ] Ensure all admin modules are functional and displaying correct data.
- [ ] Verify UI consistency with the Travelie Figma kit.
- [ ] Write a report describing what was implemented, how it was tested, and any issues encountered.
