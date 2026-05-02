# E-Commerce Backend API

Production-ready Node.js + Express + MongoDB backend using MVC architecture.

Base URL: `http://localhost:3000`

## Setup

1. Install dependencies:
   - `npm install`
2. Add environment variables in `.env`:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLOUDINARY_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `REDIS_URL`
3. Start server:
   - `npm start` (or `node index.js`)

## Notes

- Product routes are mounted as `/api/products` and the router also uses `/products`, so product URLs are like `/api/products/products`.
- For product create/update with image, use `multipart/form-data`.
- Image upload tries Cloudinary first. If Cloudinary keys are missing, API falls back to storing local uploaded file path (`uploads/...`) instead of failing the request.

## Auth

### POST `/api/auth/signup`
- Access: Public
- Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### POST `/api/auth/login`
- Access: Public
- Body:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Returns JWT token for protected endpoints.

## Auth Header

Use this header for protected routes:

`Authorization: Bearer <jwt_token>`

## Products

### POST `/api/products/products`
- Access: Protected + Admin
- Content-Type: `multipart/form-data` (optional `image`)
- Body fields: `title`, `description`, `price`, `stock`, `category`
- Required fields: `title`, `description`, `price`
- Supports typo fallback: `discription` is accepted, but prefer `description`.

### GET `/api/products`
- Access: Public
- Returns all products sorted by latest.

### GET `/api/products/:id`
- Access: Public
- Returns single product by id.

### PUT `/api/products/:id`
- Access: Protected + Admin
- Content-Type: `multipart/form-data` (optional `image`)
- Body fields to update: `title`, `description`, `price`, `stock`, `category`

### Product request example (form-data)

`POST /api/products/products`

- `title`: `iPhone 16`
- `description`: `Apple Phone`
- `price`: `80000`
- `stock`: `10`
- `category`: `electronics`
- `image`: `<file>`

### DELETE `/api/products/:id`
- Access: Protected + Admin
- Deletes product.

## Cart

### GET `/api/cart`
- Access: Protected
- Get logged-in user cart.

### POST `/api/cart`
- Access: Protected
- Body:
```json
{
  "productId": "PRODUCT_ID",
  "quantity": 1
}
```

### DELETE `/api/cart/:productId`
- Access: Protected
- Removes product from cart.

## Wishlist

### GET `/api/wishlist`
- Access: Protected
- Get logged-in user wishlist.

### POST `/api/wishlist`
- Access: Protected
- Body:
```json
{
  "productId": "PRODUCT_ID"
}
```

### DELETE `/api/wishlist/:productId`
- Access: Protected
- Removes product from wishlist.

## Orders

### POST `/api/orders`
- Access: Protected
- Body:
```json
{
  "addressId": "ADDRESS_ID",
  "items": [
    { "product": "PRODUCT_ID", "quantity": 2 }
  ]
}
```

### GET `/api/orders`
- Access: Protected
- Returns current user's orders.

## Payments

### POST `/api/payments/create-order`
- Access: Protected
- Body:
```json
{
  "orderId": "ORDER_ID"
}
```
- Creates Razorpay order for an existing DB order.

### POST `/api/payments/verify`
- Access: Protected
- Body:
```json
{
  "razorpay_order_id": "order_abc",
  "razorpay_payment_id": "pay_xyz",
  "razorpay_signature": "signature_here"
}
```
- Verifies payment signature and marks payment/order as paid.

## Profile

### GET `/api/profile`
- Access: Protected
- Returns user profile.

### PUT `/api/profile`
- Access: Protected
- Content-Type: `multipart/form-data` (optional `avatar`)
- Body fields: `phone`, `bio`

## Addresses

### POST `/api/addresses`
- Access: Protected
- Body:
```json
{
  "fullName": "John Doe",
  "phone": "9999999999",
  "street": "123 Main Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "postalCode": "400001",
  "country": "India"
}
```

### GET `/api/addresses`
- Access: Protected
- Returns all addresses for current user.

### DELETE `/api/addresses/:id`
- Access: Protected
- Deletes selected address.

## Error Codes

Common responses:
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error

## Troubleshooting

- If product creation returns `500` with Cloudinary error like `Must supply api_key`, add:
  - `CLOUDINARY_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- If MongoDB startup fails with `querySrv ECONNREFUSED`, verify DNS/network and `MONGO_URI`.
