# Multi-Vendor E-Commerce Platform — Frontend

A modern, scalable, and role-based multi-vendor e-commerce frontend built with React and designed to integrate with a Spring Boot REST API.

The platform provides separate experiences for **Customers, Vendors, and Administrators**, allowing customers to discover and purchase products, vendors to manage their stores and inventory, and administrators to manage vendors, categories, and marketplace orders.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Application Flow](#application-flow)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [State Management](#state-management)
- [TanStack Query](#tanstack-query)
- [Customer Features](#customer-features)
- [Vendor Features](#vendor-features)
- [Admin Features](#admin-features)
- [Payment Integration](#payment-integration)
- [Routing & Authorization](#routing--authorization)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Backend Integration](#backend-integration)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)
- [Project Status](#project-status)
- [License](#license)

---

# Overview

This project is the frontend application for a full-stack multi-vendor e-commerce platform.

The application is designed around three primary roles:

- **CUSTOMER**
- **VENDOR**
- **ADMIN**

Each role receives a dedicated experience and access to functionality based on authorization rules.

### Customer

Customers can:

- Register and login
- Browse products
- Search and filter products
- Browse categories
- View product details
- Add products to cart
- Manage cart quantities
- Manage saved addresses
- Checkout
- Select payment methods
- Place orders
- View order history
- View order details
- Cancel eligible orders
- View payment information

### Vendor

Vendors can:

- Register as vendors
- Create a store
- View store approval status
- Update store information
- Create products
- Edit products
- Manage product inventory
- Soft-delete products
- View vendor orders
- Update order item statuses

### Admin

Administrators can:

- View pending vendors
- Approve vendors
- Reject vendors
- View approved vendors
- Create categories
- Update categories
- Delete categories
- Monitor marketplace orders

---

# Features

## Authentication

- Customer registration
- Vendor registration
- Login
- Logout
- JWT authentication
- Persistent authentication using localStorage
- Role-based redirects
- Protected routes
- Role-based routes

### Role Redirects

```text
CUSTOMER → /
VENDOR   → /vendor/dashboard
ADMIN    → /admin