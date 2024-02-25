# ShopAnythingLagos-backend
ShopAnythingLagos allows merchants to manage their product listings by themselves. This project provides a RESTful API for CRUD operations on products, enabling merchants to display, create, edit, and delete their products.

# Features
* Display all products listed by a merchant, including the date the product was added to the system.
* Create a product for a merchant.
* Edit an existing product.
* Delete an existing product.

# Technologies Used
Express- programming language
JSON - Data interchange format

# Build and run the project
* npm run start:dev

# Access the API endpoints:

The server will start running at http://localhost:3005.

# API Endpoints
GET /products/{merchantId}: Display all products listed by a merchant.
POST /products/{merchantId}: Create a product for a merchant.
PUT /products/{skuId}: Edit an existing product.
DELETE /products/{skuId}: Delete an existing product.