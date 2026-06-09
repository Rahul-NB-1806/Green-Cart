# GreenCart Plant Store — Development Plan

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Tailwind CSS 4 |
| Backend | Node.js + Express.js |
| Database | MongoDB (with Mongoose ODM) |
| Auth | JWT (JSON Web Tokens) |
| Payments | Razorpay |
| File Storage | Cloudinary (for plant images) |
| Admin Panel | Custom React admin dashboard |

---

## Phase 1: Project Foundation (Days 1-2)

**Goal:** Fix existing issues, set up project structure, initialize Git

1. **Fix current issues**
   - Update `index.css` to Tailwind v4 syntax (`@import "tailwindcss"`)
   - Fix `react-scripts` version in `package.json`
   - Remove/update failing default test
   - Update `index.html` title to "GreenCart"

2. **Initialize Git repository**

3. **Set up project folder structure**

```
mark 5/
├── backend/
│   ├── config/          (db.js, razorpay.js, cloudinary.js)
│   ├── models/          (Plant.js, User.js, Order.js, Cart.js)
│   ├── routes/          (auth.js, plants.js, cart.js, orders.js, admin.js)
│   ├── controllers/     (authController.js, plantController.js, etc.)
│   ├── middleware/       (auth.js, admin.js, upload.js)
│   ├── seed/            (seed.js — initial plant data)
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── components/  (shared UI components)
│       ├── pages/       (route pages)
│       ├── context/     (AuthContext, CartContext)
│       ├── services/    (API calls)
│       ├── assets/      (images, icons)
│       └── App.js
│
└── admin/               (or /frontend/src/pages/admin/)
```

---

## Phase 2: Backend Development (Days 3-7)

**Goal:** Build complete API with all endpoints

### 2a. Database Models

**Plant Model** (core of your project):
```
{
  name: String (required),
  price: Number (required),
  description: String,
  category: String (indoor/outdoor/succulent/medicinal/flowering),
  image: String (Cloudinary URL),

  // Plant Care Info
  careGuide: {
    wateringSchedule: String,    // "Every 7-10 days"
    sunlightRequirement: String, // "Indirect sunlight"
    soilType: String,           // "Well-draining sandy soil"
    soilChangeFrequency: String, // "Every 12-18 months"
    temperature: String,        // "18-24°C"
    humidity: String            // "40-60%"
  },

  // Medical Properties (conditional)
  isMedicinal: Boolean,
  medicalProperties: {
    uses: [String],             // ["Anti-inflammatory", "Digestive aid"]
    benefits: String,           // Detailed description
    partsUsed: String,          // "Leaves, roots"
    dosageInfo: String,         // "Tea: 2-3 leaves steeped 5 min"
    precautions: String         // "Not for pregnant women"
  },

  stock: Number,
  featured: Boolean,
  ratings: { average: Number, count: Number }
}
```

**User Model:**
```
{ name, email, password (hashed), role (user/admin), address, phone }
```

**Order Model:**
```
{ user, items [{ plant, quantity, price }], totalAmount,
  shippingAddress, paymentId, paymentStatus, orderStatus }
```

**Cart Model:**
```
{ user, items [{ plant, quantity }] }
```

### 2b. API Endpoints

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get profile | Yes |
| GET | `/api/plants` | List all plants (with search/filter) | No |
| GET | `/api/plants/:id` | Get plant details | No |
| GET | `/api/plants/featured` | Get featured plants | No |
| GET | `/api/plants/medicinal` | Get medicinal plants | No |
| POST | `/api/cart` | Add to cart | Yes |
| GET | `/api/cart` | Get cart | Yes |
| PUT | `/api/cart/:id` | Update cart item | Yes |
| DELETE | `/api/cart/:id` | Remove from cart | Yes |
| POST | `/api/orders` | Create order | Yes |
| GET | `/api/orders/:id` | Get order details | Yes |
| POST | `/api/payment/create-order` | Create Razorpay order | Yes |
| POST | `/api/payment/verify` | Verify payment | Yes |

**Admin Endpoints:**

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/admin/plants` | Add new plant |
| PUT | `/api/admin/plants/:id` | Update plant |
| DELETE | `/api/admin/plants/:id` | Delete plant |
| GET | `/api/admin/orders` | Get all orders |
| PUT | `/api/admin/orders/:id` | Update order status |
| GET | `/api/admin/users` | Get all users |
| GET | `/api/admin/stats` | Dashboard stats |

### 2c. Seed Data
- Create `seed.js` with 15-20 plants across categories
- Include 3-4 medicinal plants with full medical properties
- Each plant gets complete care guide data

---

## Phase 3: Frontend — Core Pages (Days 8-14)

**Goal:** Build all customer-facing pages

### Pages to Build:

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero banner, featured plants, categories, CTA |
| Shop | `/plants` | All plants with filters (category, price, medicinal) |
| Plant Detail | `/plants/:id` | Full plant info with care guide + medical properties |
| Cart | `/cart` | Cart items, quantities, total |
| Checkout | `/checkout` | Shipping form + Razorpay payment |
| Order Success | `/order-success` | Confirmation page |
| My Orders | `/orders` | Order history |
| Login | `/login` | User login |
| Register | `/register` | User registration |
| About | `/about` | About GreenCart |
| Contact | `/contact` | Contact form |

### Shared Components:

```
components/
├── Navbar.jsx            (logo, nav links, cart icon, user menu)
├── Footer.jsx            (links, social, newsletter)
├── PlantCard.jsx         (image, name, price, quick view)
├── CareGuide.jsx         (watering, soil, sunlight info display)
├── MedicalInfo.jsx       (medical properties display)
├── CartItem.jsx          (plant image, qty controls, price)
├── SearchBar.jsx         (search with debounce)
├── CategoryFilter.jsx    (sidebar/top filter)
├── Rating.jsx            (star rating display)
├── Loader.jsx            (loading spinner)
└── ProtectedRoute.jsx    (auth guard)
```

---

## Phase 4: Frontend — Plant Detail Page (Day 15-16)

**Goal:** This is your key differentiator — make it excellent

The `/plants/:id` page layout:

```
┌─────────────────────────────────────────────┐
│  [Plant Image]    │  Plant Name             │
│                   │  Price: ₹XXX            │
│                   │  Category: Indoor       │
│                   │  Rating: ★★★★☆          │
│                   │  [Add to Cart]          │
├───────────────────┴─────────────────────────┤
│  📝 Description                             │
│  Beautiful low-maintenance plant...         │
├─────────────────────────────────────────────┤
│  🌱 Care Guide                              │
│  ┌──────────┬──────────┬──────────┐         │
│  │ 💧 Water │ ☀️ Light │ 🌍 Soil  │         │
│  │ Every    │ Indirect │ Well-    │         │
│  │ 7-10 days│ sunlight │ draining │         │
│  └──────────┴──────────┴──────────┘         │
│  🔄 Change soil every: 12-18 months         │
│  🌡️ Temperature: 18-24°C                    │
├─────────────────────────────────────────────┤
│  💊 Medical Properties (if medicinal)       │
│  • Anti-inflammatory properties             │
│  • Aids digestion                           │
│  • Parts used: Leaves, roots                │
│  • How to use: Tea from 2-3 leaves          │
│  ⚠️ Precautions: Not for pregnant women     │
└─────────────────────────────────────────────┘
```

---

## Phase 5: Cart & Checkout + Razorpay (Days 17-20)

**Goal:** Complete e-commerce flow

1. **Cart functionality**
   - Add/remove items
   - Update quantities
   - Persist cart (backend for logged-in, localStorage for guests)
   - Cart total calculation

2. **Checkout flow**
   - Shipping address form
   - Order summary
   - Razorpay payment integration
     - Create order on backend
     - Open Razorpay modal on frontend
     - Verify payment signature
     - Update order status

3. **Order management**
   - Order confirmation email (optional)
   - Order history page
   - Order status tracking

---

## Phase 6: Admin Panel (Days 21-25)

**Goal:** Full CRUD management dashboard

### Admin Pages:

| Page | Description |
|---|---|
| Dashboard | Stats: total plants, orders, revenue, users |
| Plants List | Table with search, edit, delete |
| Add/Edit Plant | Full form with image upload (Cloudinary) |
| Orders List | All orders with status filters |
| Order Detail | Update order status |
| Users List | View registered users |

### Admin Routes:
```
/admin             → Dashboard
/admin/plants      → Plants list
/admin/plants/new  → Add new plant
/admin/plants/:id  → Edit plant
/admin/orders      → Orders list
/admin/orders/:id  → Order detail
/admin/users       → Users list
```

---

## Phase 7: Polish & Testing (Days 26-28)

1. **UI/UX Polish**
   - Responsive design (mobile-first)
   - Loading states & error handling
   - Toast notifications
   - Smooth animations
   - Empty states (no plants found, empty cart)

2. **Testing**
   - Test all API endpoints
   - Test checkout flow end-to-end
   - Test admin CRUD operations
   - Cross-browser testing

3. **Performance**
   - Image optimization
   - Lazy loading
   - API response caching

---

## Phase 8: Deployment (Days 29-30)

| Service | Purpose |
|---|---|
| **Vercel** | Frontend hosting (free) |
| **Railway/Render** | Backend hosting (free tier) |
| **MongoDB Atlas** | Cloud database (free tier) |
| **Cloudinary** | Image storage (free tier) |

---

## Development Timeline Summary

| Phase | Days | Focus |
|---|---|---|
| 1 | 1-2 | Foundation & Setup |
| 2 | 3-7 | Backend API |
| 3 | 8-14 | Frontend Core Pages |
| 4 | 15-16 | Plant Detail Page |
| 5 | 17-20 | Cart & Razorpay |
| 6 | 21-25 | Admin Panel |
| 7 | 26-28 | Polish & Testing |
| 8 | 29-30 | Deployment |

**Total: ~30 days**
