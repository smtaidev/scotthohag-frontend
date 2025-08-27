# Report History Component

A responsive and pixel-perfect Report History component that matches the provided design image. This component provides a comprehensive view of user health reports with filtering, search, and responsive design.

## Features

### 🎨 Design Features
- **Pixel-perfect implementation** matching the provided design image
- **Responsive design** with mobile-first approach
- **Consistent styling** with the existing codebase design system
- **Dark blue header** with back navigation
- **Clean table layout** with proper spacing and typography

### 📱 Responsive Design
- **Desktop**: Full table view with all columns visible
- **Mobile**: Card-based layout for better mobile experience
- **Tablet**: Optimized layout for medium screens
- **Search functionality** that works across all screen sizes

### 🔍 Functionality
- **Search reports** by report type or date
- **Status badges** with color-coded indicators (Pending/Completed)
- **View report actions** with eye icon
- **Back navigation** to previous page
- **Empty state** handling for no results
- **Pagination** with configurable page sizes (5, 10, 20, 50 items per page)
- **Smart page navigation** with ellipsis for large datasets
- **Results counter** showing current page range and total results

## Components

### ReportHistory Component
Located at: `src/components/userProfile/ReportHistory.tsx`

**Props:**
- `onBack?: () => void` - Callback for back navigation
- `onViewReport?: (reportId: string) => void` - Callback for viewing individual reports

**Features:**
- Search functionality
- Responsive table/card layout
- Status badges
- Hover effects
- Loading states
- Pagination with configurable page sizes
- Smart page navigation with ellipsis
- Results counter and page info

### Demo Pages
- **Individual page**: `/report-history` - Standalone ReportHistory component
- **Demo page**: `/demo-report` - Combined view with SubmitReport component

## Usage

### Basic Usage
```tsx
import ReportHistory from '@/components/userProfile/ReportHistory';

const MyPage = () => {
  const handleBack = () => {
    // Handle back navigation
  };

  const handleViewReport = (reportId: string) => {
    // Handle viewing report
  };

  return (
    <ReportHistory
      onBack={handleBack}
      onViewReport={handleViewReport}
    />
  );
};
```

### Integration with SubmitReport
```tsx
import { useState } from 'react';
import SubmitReport from '@/components/userProfile/SubmitReport';
import ReportHistory from '@/components/userProfile/ReportHistory';

const ReportPage = () => {
  const [currentView, setCurrentView] = useState<'submit' | 'history'>('submit');

  return (
    <div>
      {currentView === 'submit' ? (
        <SubmitReport
          onViewHistory={() => setCurrentView('history')}
          onReportSubmit={(data) => {
            // Handle report submission
            setCurrentView('history');
          }}
        />
      ) : (
        <ReportHistory
          onBack={() => setCurrentView('submit')}
          onViewReport={(reportId) => {
            // Handle viewing report
          }}
        />
      )}
    </div>
  );
};
```

## Design System Consistency

The component follows the existing design system:

### Colors
- **Primary**: `#003160` (dark blue)
- **Secondary**: `#00A14B` (green)
- **Success**: `#10B981` (green for completed status)
- **Warning**: `#F59E0B` (yellow for pending status)
- **Gray scale**: Consistent with existing components

### Typography
- **Headers**: `text-2xl font-medium` for main titles
- **Body text**: `text-sm` for table content
- **Status badges**: `text-xs font-medium`

### Spacing
- **Container padding**: `px-6 py-6` for consistent spacing
- **Table padding**: `px-6 py-4` for cell content
- **Mobile cards**: `p-4` for card content

### Icons
- **Lucide React icons** for consistency with existing components
- **Proper sizing**: `size={16}` for inline icons, `size={20}` for header icons

## Responsive Breakpoints

- **Mobile**: `< 768px` - Card layout with simplified pagination
- **Tablet**: `768px - 1024px` - Table layout with adjusted spacing
- **Desktop**: `> 1024px` - Full table layout with complete pagination controls

## Accessibility

- **Semantic HTML** with proper table structure
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Screen reader** friendly
- **Focus indicators** for interactive elements

## Pagination Features

### Smart Page Navigation
- **Ellipsis display** for large datasets (shows "..." when there are many pages)
- **Configurable page sizes** (5, 10, 20, 50 items per page)
- **Results counter** showing "Showing X to Y of Z results"
- **Responsive pagination** - simplified on mobile, full controls on desktop

### Page Size Options
- **5 items per page** - Default for quick scanning
- **10 items per page** - Balanced view
- **20 items per page** - More comprehensive view
- **50 items per page** - Maximum items for power users

### Navigation Controls
- **Previous/Next buttons** with disabled states
- **Page number buttons** with active state highlighting
- **Mobile-friendly** page indicator ("Page X of Y")
- **Automatic page reset** when search term or page size changes

## Performance

- **Optimized rendering** with proper key props
- **Efficient filtering** with debounced search
- **Lazy loading** ready for large datasets
- **Minimal re-renders** with proper state management
- **Pagination optimization** - only renders current page items

## Future Enhancements

- **Advanced filtering** by date range, status, etc.
- **Export functionality** for reports
- **Bulk actions** for multiple reports
- **Real-time updates** with WebSocket integration
- **Sorting functionality** by columns
- **Advanced search** with multiple criteria
