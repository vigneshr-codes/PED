# Project Estimates Dashboard - Technical Documentation

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
5. [Data Models](#data-models)
6. [Redux State Management](#redux-state-management)
7. [Workflow & Business Logic](#workflow--business-logic)
8. [Key Components](#key-components)
9. [Utilities](#utilities)
10. [Setup & Running](#setup--running)
11. [Data Persistence](#data-persistence)

---

## Overview

A workflow-driven dashboard for managing project estimates through a 4-step process:
1. **Project Creation** - Create project with metadata
2. **Scope Tracking** - Upload and track scope artifacts
3. **Estimate Tracking** - Manage estimate lifecycle through reviews
4. **VE Tool Tracking** - Track VE submissions and approvals

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Framework | 18.x |
| Vite | Build Tool | 5.x |
| Redux Toolkit | State Management | 2.x |
| React Router | Routing | 6.x |
| Tailwind CSS | Styling | 4.x |
| lucide-react | Icons | Latest |
| localStorage | Data Persistence | Native |

---

## Project Structure

```
src/
├── assets/
│   └── fonts/                    # Custom fonts (ATT Aleck Sans)
├── components/
│   ├── common/                   # Reusable UI components
│   │   ├── Alert.jsx
│   │   ├── Button.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Header.jsx
│   │   ├── Input.jsx
│   │   ├── KPICard.jsx
│   │   ├── Modal.jsx
│   │   ├── Select.jsx
│   │   ├── StatusBadge.jsx
│   │   ├── Stepper.jsx
│   │   ├── Table.jsx
│   │   ├── TextArea.jsx
│   │   └── index.js              # Barrel export
│   ├── dashboard/
│   │   ├── DashboardKPIs.jsx     # KPI cards grid
│   │   └── ProjectsTable.jsx     # Projects list table
│   ├── project/
│   │   ├── ProjectForm.jsx       # Create/Edit project form
│   │   └── ProjectHeader.jsx     # Project detail header
│   ├── scope/
│   │   ├── ScopeForm.jsx         # Add scope form
│   │   └── ScopeList.jsx         # Scope artifacts list
│   ├── estimate/
│   │   ├── EstimateForm.jsx      # Add estimate form
│   │   └── EstimateList.jsx      # Estimates list
│   ├── ve/
│   │   ├── VEForm.jsx            # Add VE record form
│   │   └── VEList.jsx            # VE records list
│   └── history/
│       └── HistoryList.jsx       # Status change history
├── constants/
│   └── statusConfig.js           # Status values, colors, workflow steps
├── data/
│   ├── projects.json             # Initial project data
│   ├── scopes.json               # Initial scope data
│   ├── estimates.json            # Initial estimate data
│   ├── veTracking.json           # Initial VE data
│   ├── statusHistory.json        # Initial history data
│   └── users.json                # Users and roles
├── pages/
│   ├── Dashboard.jsx             # Main dashboard page
│   ├── CreateProject.jsx         # New project page
│   └── ProjectDetail.jsx         # Project detail with tabs
├── redux/
│   ├── slices/
│   │   ├── projectsSlice.js      # Projects state & actions
│   │   ├── scopesSlice.js        # Scopes state & actions
│   │   ├── estimatesSlice.js     # Estimates state & actions
│   │   ├── veSlice.js            # VE records state & actions
│   │   ├── historySlice.js       # History state & actions
│   │   └── usersSlice.js         # Users state & actions
│   └── store.js                  # Redux store with persistence
├── utils/
│   ├── currentStepCalculator.js  # Current step logic & KPIs
│   ├── dateUtils.js              # Date formatting utilities
│   ├── formatters.js             # Currency/FTP formatters
│   ├── storage.js                # localStorage utilities
│   └── validators.js             # Form validation
├── App.jsx                       # Root component with routing
├── index.css                     # Global styles & fonts
└── main.jsx                      # Entry point
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           UI Layer                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │Dashboard │  │CreateProj│  │ProjDetail│  │Common Components │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘ │
└───────┼─────────────┼─────────────┼─────────────────┼───────────┘
        │             │             │                 │
        ▼             ▼             ▼                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Redux Store                                 │
│  ┌─────────┐ ┌──────┐ ┌─────────┐ ┌────┐ ┌───────┐ ┌─────┐     │
│  │projects │ │scopes│ │estimates│ │ ve │ │history│ │users│     │
│  └────┬────┘ └──┬───┘ └────┬────┘ └─┬──┘ └───┬───┘ └──┬──┘     │
└───────┼─────────┼──────────┼────────┼────────┼────────┼─────────┘
        │         │          │        │        │        │
        ▼         ▼          ▼        ▼        ▼        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    localStorage (Persistence)                    │
│              Key: 'project-estimates-dashboard'                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Models

### Project
```javascript
{
  uniqueId: "uuid",              // Internal unique ID
  projectId: "PRJ-001",          // Display ID (optional)
  projectName: "Project Name",   // Required
  projectOwner: "user-1",        // Required - User ID
  estimator: "user-2",           // User ID
  program: "Digital Transform",  // Portfolio/Program
  client: "Acme Corp",           // Client organization
  epicId: "EPIC-1234",           // Tracking ID
  ufd: "UFD Reference",          // UFD field
  targetDeliveryDate: "2025-06-30",
  estimateNeededBy: "2025-03-15",
  priority: "High",              // High | Medium | Low
  status: "Active",              // New | Active | On Hold | Closed
  notes: "Description...",
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp"
}
```

### Scope
```javascript
{
  id: "uuid",
  projectId: "project-uuid",     // Reference to project
  scopeTitle: "Scope Document",  // Required
  scopeType: "Functional",       // Functional | Technical | Business | Other
  artifactLink: "https://...",   // Required - Document link
  version: 1,                    // Auto-increment
  isLatest: true,                // Latest version flag
  status: "Draft",               // Draft | In Progress | Grooming | Completed
  comments: "Notes...",
  createdBy: "user-id",
  updatedBy: "user-id",
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp"
}
```

### Estimate
```javascript
{
  id: "uuid",
  projectId: "project-uuid",
  estimateName: "Estimate v1",   // Required
  estimateType: "ROM",           // ROM | LOE | Final
  workbookLink: "https://...",   // Required
  estimatedFTP: 1200,            // Required - Hours
  estimatedDollarValue: 180000,  // Required
  currency: "USD",               // Default: USD
  estimateOwner: "user-id",      // Required
  internalReviewers: ["user-id"],
  externalReviewers: ["user-id"],
  version: 1,
  isLatest: true,
  status: "Yet to Start",        // See status flow below
  notes: "Assumptions...",
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp"
}
```

### VE Record
```javascript
{
  id: "uuid",
  projectId: "project-uuid",
  submissionName: "VE Submission", // Required
  veToolReference: "https://...",  // Required
  veFTP: 1200,                     // Optional
  veDollarValue: 180000,           // Optional
  submittedBy: "user-id",
  submittedDate: "ISO timestamp",
  approvedDate: "ISO timestamp",
  stakeholders: ["user-id"],
  isLatest: true,
  status: "Yet to Submit",         // See status flow below
  notes: "...",
  createdAt: "ISO timestamp",
  updatedAt: "ISO timestamp"
}
```

### Status History
```javascript
{
  id: "uuid",
  projectId: "project-uuid",
  module: "Scope",              // Scope | Estimate | VE
  recordId: "record-uuid",
  fromStatus: "Draft",
  toStatus: "In Progress",
  reason: "Starting work...",
  changedBy: "user-id",
  changedAt: "ISO timestamp"
}
```

### User
```javascript
{
  id: "user-1",
  name: "John Doe",
  email: "john@example.com",
  role: "Estimator"            // See roles below
}
```

---

## Redux State Management

### Store Structure
```javascript
{
  projects: {
    items: [...],              // Array of projects
    filters: {                 // Active filters
      owner: "",
      program: "",
      priority: "",
      currentStep: "",
      currentStepStatus: "",
      dueDateFrom: "",
      dueDateTo: ""
    },
    loading: false,
    error: null
  },
  scopes: { items: [], loading: false, error: null },
  estimates: { items: [], loading: false, error: null },
  ve: { items: [], loading: false, error: null },
  history: { items: [], loading: false, error: null },
  users: {
    items: [...],
    currentUser: { ... }       // Currently selected user
  }
}
```

### Available Actions

| Slice | Actions |
|-------|---------|
| projects | `addProject`, `updateProject`, `deleteProject`, `setFilters`, `clearFilters` |
| scopes | `addScope`, `updateScopeStatus` |
| estimates | `addEstimate`, `updateEstimateStatus` |
| ve | `addVERecord`, `updateVEStatus` |
| history | `addHistoryEntry` |
| users | `setCurrentUser` |

### Usage Example
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/slices/projectsSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { items: projects } = useSelector(state => state.projects);

  const handleCreate = (data) => {
    dispatch(addProject(data));
  };
};
```

---

## Workflow & Business Logic

### Status Flows

**Scope Statuses:**
```
Draft → In Progress → Grooming → Completed
         ←──────────←──────────←
         (Backward requires reason)
```

**Estimate Statuses:**
```
Yet to Start → In Progress → Sent for Internal Review → Sent for External Review → Approved
                              │                                                      ↑
                              └──────────────────────────────────────────────────────┘
                                        (Skip external with justification)
```

**VE Statuses:**
```
Yet to Submit → Estimate Submitted in EDR → Estimate loaded in VE tool → Waiting for Approval → Estimate Fully Approved
```

### Current Step Logic

Located in: `src/utils/currentStepCalculator.js`

```javascript
// Determines which step a project is currently on
const calculateCurrentStep = (project, scopes, estimates, veRecords) => {
  const latestScope = getLatestRecord(scopes, project.uniqueId);
  const latestEstimate = getLatestRecord(estimates, project.uniqueId);
  const latestVE = getLatestRecord(veRecords, project.uniqueId);

  // Step 2: Scope not completed
  if (!latestScope || latestScope.status !== 'Completed') {
    return { step: 'Scope', stepNumber: 2, status: latestScope?.status || 'Not Started' };
  }

  // Step 3: Estimate not approved
  if (!latestEstimate || latestEstimate.status !== 'Approved') {
    return { step: 'Estimate', stepNumber: 3, status: latestEstimate?.status || 'Not Started' };
  }

  // Step 4: VE not fully approved
  if (!latestVE || latestVE.status !== 'Estimate Fully Approved') {
    return { step: 'VE', stepNumber: 4, status: latestVE?.status || 'Not Started' };
  }

  // All complete
  return { step: 'Done', stepNumber: 5, status: 'Completed' };
};
```

### KPI Calculations

```javascript
const calculateKPIs = (projects, scopes, estimates, veRecords) => {
  return {
    totalActive: // Projects with status !== 'Closed'
    scopeCompleted: // Projects where latest scope = 'Completed'
    estimatesInReview: // Projects where estimate is in review status
    veWaitingApproval: // Projects where VE = 'Waiting for Approval'
    overdue: // Projects past estimateNeededBy date
  };
};
```

---

## Key Components

### Common Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `variant`, `loading`, `icon`, `onClick` | Primary button with loading state |
| `Modal` | `isOpen`, `onClose`, `title`, `size` | Animated modal dialog |
| `Table` | `columns`, `data`, `onRowClick` | Data table with click handlers |
| `StatusBadge` | `status`, `size` | Colored status indicator |
| `Stepper` | `currentStep`, `currentStepNumber` | Workflow progress indicator |
| `FilterBar` | `filters`, `onFilterChange`, `options` | Dashboard filters |
| `Input` | `label`, `error`, `required`, `type` | Form input field |
| `Select` | `label`, `options`, `placeholder` | Dropdown select |
| `Alert` | `variant`, `title`, `children` | Alert messages |

### Page Components

| Page | Route | Description |
|------|-------|-------------|
| `Dashboard` | `/` | Main dashboard with KPIs, filters, projects table |
| `CreateProject` | `/projects/new` | New project form |
| `ProjectDetail` | `/projects/:id` | Project detail with tabs |

---

## Utilities

### Date Utils (`src/utils/dateUtils.js`)
```javascript
formatDate(date)       // "Jan 15, 2025"
formatDateTime(date)   // "Jan 15, 2025 2:30 PM"
toInputDate(date)      // "2025-01-15" (for input[type=date])
```

### Formatters (`src/utils/formatters.js`)
```javascript
formatCurrency(value, currency)  // "$180,000"
formatFTP(hours)                 // "1,200 hrs"
```

### Storage (`src/utils/storage.js`)
```javascript
saveState(state)       // Save to localStorage
loadState()            // Load from localStorage
clearState()           // Clear localStorage
hasStoredState()       // Check if state exists
```

### Validators (`src/utils/validators.js`)
```javascript
validateProject(data)   // Returns { isValid, errors }
validateScope(data)
validateEstimate(data)
validateVE(data)
```

---

## Setup & Running

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone repository
git clone <repo-url>
cd project-estimates-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Data Persistence

### How It Works

1. **Initial Load**: If localStorage is empty, data loads from JSON files
2. **Runtime**: All changes update Redux state
3. **Auto-Save**: Redux state auto-saves to localStorage (300ms debounce)
4. **Reload**: On refresh, data loads from localStorage

### localStorage Key
```
project-estimates-dashboard
```

### Reset Data
```javascript
// In browser console:
localStorage.removeItem('project-estimates-dashboard');
location.reload();
```

---

## User Roles

| Role | Description |
|------|-------------|
| Requestor | Creates projects, uploads scope artifacts |
| Estimator | Prepares estimates, responds to feedback |
| Internal Reviewer | Reviews estimates internally |
| External Reviewer | Client-side review and approval |
| Approver | Can mark Estimate Approved and VE Fully Approved |
| Admin | System configuration and permissions |

---

## Status Color Reference

Located in: `src/constants/statusConfig.js`

| Status | Background | Text |
|--------|------------|------|
| Draft | `bg-gray-100` | `text-gray-700` |
| In Progress | `bg-blue-100` | `text-blue-700` |
| Completed | `bg-green-100` | `text-green-700` |
| Approved | `bg-green-100` | `text-green-700` |
| Waiting for Approval | `bg-orange-100` | `text-orange-700` |

---

## Contributing

1. Follow existing code patterns
2. Use Tailwind CSS for styling
3. Add new components to appropriate folders
4. Update Redux slices for new data requirements
5. Test localStorage persistence after changes

---

*Last Updated: January 2026*
