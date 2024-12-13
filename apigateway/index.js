const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const proxy = require('express-http-proxy');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5003; // API Gateway port

// Middleware
app.use(cors());
app.use(express.json());

// Proxy Routes to Backend Services

// Proxy to Signup Service
app.use(
  '/api/auth',
  proxy(process.env.SIGNUP_SERVICE_URL || 'http://localhost:5000', {
    proxyReqPathResolver: (req) => '/api/auth' + req.url, // Rewriting the path for auth
  })
);

// Proxy to Product Service
app.use(
  '/api/products',
  proxy(process.env.PRODUCT_SERVICE_URL || 'http://localhost:5001', {
    proxyReqPathResolver: (req) => '/api/products' + req.url, // Rewriting the path for product
  })
);

// Proxy to Cart Service
app.use(
  '/api/cart',
  proxy(process.env.CART_SERVICE_URL || 'http://localhost:5002', {
    proxyReqPathResolver: (req) => '/api/cart' + req.url, // Append '/cart' for correct resolution
    
  })
);


// Proxy to Favorite Service
app.use(
  '/api/favorites',
  proxy(process.env.FAVORITE_SERVICE_URL || 'http://localhost:5004', {
    proxyReqPathResolver: (req) => '/api/favorites' + req.url, // Rewriting the path for favorites
  })
);
app.use(
  '/api/orders',
  proxy(process.env.ORDERS_SERVICE_URL || 'http://localhost:5005', {
    proxyReqPathResolver: (req) => '/api/orders' + req.url, // Rewriting the path for orders
  })
);

// Start the API Gateway server
app.listen(port, () => {
  console.log(`API Gateway running on http://localhost:${port}`);
});
