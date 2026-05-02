# Mini Headless E-commerce Application

A clean, scalable, production-ready headless e-commerce app built with Next.js, Express, and MongoDB.

## Tech Stack
- **Frontend**: Next.js (App Router) + Tailwind CSS + Zustand
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Architecture**: Clean Architecture (Controllers, Services, Models)

## Project Structure

```
Ecommerce/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/          # Product.js, Order.js
│   │   ├── controllers/      # productController.js, orderController.js
│   │   ├── services/         # productService.js, orderService.js
│   │   ├── routes/           # productRoutes.js, orderRoutes.js
│   │   ├── middleware/       # validationMiddleware.js, errorMiddleware.js
│   │   ├── utils/            # payment.js
│   │   └── index.js
│   ├── seed.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── product/[id]/page.js
    │   │   ├── cart/page.js
    │   │   ├── checkout/page.js
    │   │   ├── layout.js
    │   │   ├── page.js
    │   │   └── globals.css
    │   ├── components/       # Navbar.js
    │   ├── store/            # cartStore.js
    │   └── lib/              # api.js
    ├── package.json
    ├── next.config.js
    ├── tailwind.config.js
    └── .env.local
```

## Step-by-Step Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
NODE_ENV=development
```

**For MongoDB Atlas**, update MONGODB_URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### 2. Seed Sample Products

```bash
cd backend
npm run seed
```

This will populate your database with 10 sample fashion products.

### 3. Start Backend

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

Test the API:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/products
```

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 5. Start Frontend

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product details |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |
| POST | `/api/orders/checkout` | Process checkout |

## Features
- ✨ Modern fashion store UI design
- 🏠 Product listing with hero section
- 🔍 Product details page
- 🛒 Cart management (Zustand + localStorage)
- 💳 Checkout with user info validation
- 💰 Mock payment integration
- 📦 Order creation and tracking
- 📱 Responsive Tailwind CSS design
- 🎯 Clean architecture (MVC pattern)

## Sample Products
The seed script includes 10 fashion products:
- Classic White T-Shirt ($29.99)
- Slim Fit Black Jeans ($59.99)
- Leather Jacket ($199.99)
- Summer Floral Dress ($69.99)
- Casual Button-Up Shirt ($54.99)
- Wool Beanie Hat ($24.99)
- Casual Canvas Sneakers ($44.99)
- Elegant Blazer ($129.99)
- Athletic Performance Shorts ($39.99)
- Silk Scarf ($49.99)

## Development
- Backend uses `nodemon` for auto-restart
- Frontend uses Next.js hot reload
- All responses include proper error handling
- CORS enabled for frontend-backend communication
