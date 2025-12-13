# 🏠 AURA HOME - Frontend

E-commerce platform built with React, Vite, and Tailwind CSS.

## 📁 Project Structure

```
src/
├── api/                      # API configuration
│   ├── axios.config.js       # Axios instance with interceptors
│   └── endpoints.js          # API endpoint URLs
│
├── components/               # Reusable components
│   ├── common/               # Basic UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Loader.jsx
│   │   └── Badge.jsx
│   │
│   ├── layout/               # Layout components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   └── ProgressStepper.jsx
│   │
│   ├── products/             # Product-related components
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductFilters.jsx
│   │   ├── ProductImageGallery.jsx
│   │   └── RelatedProducts.jsx
│   │
│   ├── cart/                 # Shopping cart components
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── QuantityControl.jsx
│   │
│   └── admin/                # Admin panel components
│       ├── DataTable.jsx
│       ├── StatCard.jsx
│       ├── Chart.jsx
│       └── ImageUploader.jsx
│
├── contexts/                 # React Context API
│   ├── AuthContext.jsx       # Authentication state
│   ├── CartContext.jsx       # Shopping cart state
│   └── FilterContext.jsx     # Product filters state
│
├── hooks/                    # Custom React hooks
│   ├── useAuth.js
│   ├── useCart.js
│   ├── useFilters.js
│   ├── useFetch.js
│   └── useCloudinary.js
│
├── pages/                    # Page components
│   ├── public/               # Public routes
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── CategoryListPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── LegalInfoPage.jsx
│   │   └── NotFoundPage.jsx
│   │
│   ├── user/                 # Authenticated user routes
│   │   ├── UserProfilePage.jsx
│   │   └── FavoritesPage.jsx
│   │
│   └── admin/                # Admin routes
│       ├── AdminDashboard.jsx
│       ├── AdminProducts.jsx
│       ├── AdminProductForm.jsx
│       ├── AdminCategories.jsx
│       ├── AdminOrders.jsx
│       └── AdminOrderDetail.jsx
│
├── routes/                   # Routing configuration
│   ├── AppRoutes.jsx         # Main router
│   ├── PrivateRoute.jsx      # Protected route HOC
│   └── AdminRoute.jsx        # Admin route HOC
│
├── services/                 # API service layer
│   ├── authService.js
│   ├── productService.js
│   ├── categoryService.js
│   ├── orderService.js
│   ├── paymentService.js
│   └── cloudinaryService.js
│
├── utils/                    # Utility functions
│   ├── validators.js         # Form validation
│   ├── formatters.js         # Price/date formatting
│   └── constants.js          # App constants
│
├── App.jsx                   # Root component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Colors

- **Primary:** `#2563EB` (Aura Blue)
- **Success:** `#10B981` (Aura Green)
- **Error:** `#EF4444` (Danger Red)
- **Warning:** `#F59E0B` (Orange)

### Typography

- **Font:** Inter (400, 600, 700)

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **React Icons** - Icons

## 🔗 API Connection

Base URL: `http://localhost:5000/api`

Configure in `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

## 📝 Naming Conventions

- **Components:** PascalCase (e.g., `ProductCard.jsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useAuth.js`)
- **Services:** camelCase with `Service` suffix (e.g., `authService.js`)
- **Utils:** camelCase (e.g., `formatters.js`)
- **Constants:** UPPER_SNAKE_CASE

## 🧪 Development Guidelines

1. Use functional components with hooks
2. Implement proper error handling
3. Add loading states for async operations
4. Use Tailwind utility classes
5. Keep components small and focused
6. Extract reusable logic into custom hooks
7. Use Context API for global state
8. Implement proper TypeScript types (future)

## 📱 Responsive Breakpoints

- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px
