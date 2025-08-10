# Personalized Content Dashboard - Project Documentation

## Demo: https://youtu.be/G8X-YH0QG4E
## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [File Structure](#file-structure)
6. [Core Components](#core-components)
7. [API Integration](#api-integration)
8. [User Experience Features](#user-experience-features)
9. [Installation & Setup](#installation--setup)

***

## Project Overview

The **Personalized Content Dashboard** is a modern React application that aggregates news articles and movie information from multiple APIs, providing users with a unified interface to browse, search, filter, and save their favorite content. The application features a responsive design with dark/light theme support and comprehensive content management capabilities.

### Purpose
- Aggregate news content from various categories (Technology, Sports, Entertainment, Health, Business)
- Display trending and categorized movies from The Movie Database (TMDB)
- Provide advanced search functionality across both news and movies
- Allow users to save favorite content with persistent local storage
- Offer a smooth, paginated browsing experience

***

## Tech Stack

### Frontend Framework
- **React 18** - Core framework with functional components and hooks
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and development server

### UI Framework & Styling
- **shadcn/ui** - Component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### HTTP Client & APIs
- **Axios** - HTTP client for API requests
- **NewsAPI** - News articles aggregation
- **TMDB API** - Movie and TV show data

### Additional Features
- **LocalStorage** - Persistent favorites storage
- **Debounced Search** - Optimized search performance
- **Lazy Loading** - Code splitting with React.lazy()

***

## Architecture

### Component Architecture
The application follows a **component-based architecture** with clear separation of concerns:

```
App (Search Provider + Routing)
├── ThemeProvider (Theme management)
├── SidebarProvider (Sidebar context)
└── Dashboard (Main layout)
    ├── AppSidebar (Navigation & Filters)
    ├── SearchBar (Search trigger)
    ├── Content (Dynamic content display)
    └── SearchDialog (Search modal)
```

***

## Features

### 1. **Content Aggregation**
- **Default View**: Displays 5 latest news articles + 5 trending movies
- **Category Filtering**: News (Technology, Sports, Entertainment, Health, Business)
- **Movie Categories**: Trending, Top Rated, Action, Comedy, Drama
- **Smart Filtering**: Only shows articles with images and valid content

### 2. **Advanced Search**
- **Global Search**: Ctrl+K keyboard shortcut or click-to-search
- **Dual API Search**: Searches both NewsAPI and TMDB simultaneously
- **Debounced Input**: 300ms delay to optimize API calls
- **Rich Results**: Shows 3 news + 3 movies with images, descriptions, metadata
- **External Links**: "Show more" buttons link to external search pages

### 3. **Pagination System**
- **10 Items Per Page**: When category filters are active
- **Smart Pagination**: Shows page numbers with ellipsis for large page counts
- **Smooth Navigation**: Auto-scroll to top on page changes
- **Page State Persistence**: Maintains pagination state across filter changes

### 4. **Favorites Management**
- **Heart-Shaped Toggle**: Click to save/remove from favorites
- **LocalStorage Persistence**: Favorites survive browser sessions
- **Sidebar Display**: Quick access to saved content with thumbnails
- **Cross-Platform Compatibility**: Works with both news articles and movies

### 5. **Responsive Design**
- **Mobile-First**: Optimized for all screen sizes
- **Adaptive Grid**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- **Touch-Friendly**: Large click targets and hover states
- **Sidebar Collapse**: Mobile-optimized sidebar with trigger button

### 6. **Theme System**
- **Multiple Themes**: Light, Dark, System (auto-detect)
- **Persistent Preference**: Theme choice saved in localStorage
- **Smooth Transitions**: Animated theme switching
- **System Integration**: Respects OS dark mode preference

***

## File Structure

```
src/
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── sidebar.jsx
│   │   ├── dialog.jsx
│   │   ├── command.jsx
│   │   ├── card.jsx
│   │   ├── button.jsx
│   │   └── badge.jsx
│   ├── app-sidebar.jsx         # Main navigation sidebar
│   ├── Content.jsx             # Dynamic content display
│   ├── search-dialog.jsx       # Search modal component
│   ├── search-bar.jsx          # Search trigger bar
│   ├── mode-toggle.jsx         # Theme switcher
│   └── theme-provider.jsx      # Theme context provider
|
├── hooks/
│   └── use-debounce.js        # Custom debouncing hook
├── pages/
│   └── Dashboard.jsx          # Main dashboard layout
└── App.jsx                    # Root application component
```

***

## Core Components

### AppSidebar Component
**Purpose**: Navigation and content filtering
- **Category Lists**: Organized news and movie categories with icons
- **Active State Indicators**: Visual feedback for selected categories
- **Favorites Section**: Displays saved content with thumbnails
- **Clear Filter**: Quick return to default view

### Content Component
**Purpose**: Dynamic content display with pagination
- **Adaptive Fetching**: Different API calls based on active filters
- **Card Layout**: Consistent presentation for news and movies
- **Favorite Toggles**: Heart-shaped buttons on each content card
- **Pagination Controls**: Previous/Next buttons with page numbers

### SearchDialog Component
**Purpose**: Unified search interface
- **Command Palette Style**: shadcn/ui Command component
- **Real-time Results**: Debounced search with live updates
- **Sectioned Results**: Separate news and movies sections
- **Rich Previews**: Images, descriptions, and metadata

***

## API Integration

### 1. **NewsAPI Integration**
- **Base URL**: `https://newsapi.org/v2/`
- **Endpoints Used**:
  - `top-headlines?category={category}` - Category-specific news
  - `everything?q={query}` - Search functionality
- **Features**: Country filtering (US), image filtering, content validation

### 2. **TMDB API Integration**
- **Base URL**: `https://api.themoviedb.org/3/`
- **Endpoints Used**:
  - `trending/movie/day` - Daily trending movies
  - `movie/top_rated` - Top rated movies
  - `discover/movie?with_genres={id}` - Genre-specific movies
  - `search/movie?query={query}` - Movie search
- **Image CDN**: `https://image.tmdb.org/t/p/w500/` for posters

### 3. **Error Handling**
- **Network Errors**: Graceful fallbacks with user feedback
- **Rate Limiting**: Debounced requests to prevent API limits
- **Image Fallbacks**: Default placeholders for missing images
- **Content Validation**: Filters out incomplete articles

***

## User Experience Features

### 1. **Performance Optimizations**
- **Lazy Loading**: Route-based code splitting
- **Debounced Search**: Prevents excessive API calls
- **Image Optimization**: Multiple sizes for different use cases

### 2. **Accessibility Features**
- **Keyboard Navigation**: Full keyboard support for search (Ctrl+K)
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Logical tab order throughout application
- **Color Contrast**: High contrast ratios in both themes

### 3. **Error States & Loading**
- **Loading Spinners**: Visual feedback during API calls
- **Empty States**: Friendly messages when no content is available
- **Error Boundaries**: Graceful error handling
- **Network Status**: Feedback for failed requests

***

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Environment variables for APIs

### Environment Variables
```env
VITE_NEWS_API_KEY=your_newsapi_key
VITE_TMDB_API_KEY=your_tmdb_api_key
```

### Installation Steps
```bash
# Clone repository
git clone 
cd personalized-content-dashboard

# Install dependencies
npm install

# Install shadcn/ui components
npx shadcn@latest add dialog command button badge card

# Start development server
npm run dev
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

***

## Key Achievements

1. **Full-Stack Integration**: Successfully integrated multiple APIs with error handling
2. **User Experience**: Created intuitive interface with advanced search and filtering
3. **Performance**: Optimized with debouncing, lazy loading, and efficient re-renders
4. **Accessibility**: Built with keyboard navigation 
5. **Responsive Design**: Mobile-first approach with adaptive layouts
6. **Data Persistence**: Local storage integration for user preferences

This project demonstrates modern React development practices with a focus on user experience, performance, and maintainable code architecture.