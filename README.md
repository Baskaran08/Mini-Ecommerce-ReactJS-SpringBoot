# 🛒 Mini E-Commerce – Full Stack Application (Spring Boot + React)

A fully functional e-commerce web application built using **Spring Boot**, **React.js**, **JWT Authentication**, and **MySQL**.  
Supports product browsing, filtering, cart operations, order placement, and an admin dashboard.

---

## 🚀 Tech Stack

### **Backend**
- Java, Spring Boot
- Spring Web, Spring Security
- JWT Authentication & Authorization
- MySQL Database
- REST API Design

### **Frontend**
- React.js
- Tailwind CSS
- React Hooks / Context API

### **Tools**
- Git & GitHub
- Postman
- GitHub Actions
- Docker (optional)

---

## 📌 Features

### **User Features**
- Register & login using JWT
- Browse products
- View product details
- Add to cart
- Place orders
- View past orders

### **Admin Features**
- Add/update/delete products  
- Manage orders  
- Role-based access  

### **Additional Features**
- Global error handling  
- Data validation  
- Responsive UI  
- Clean API design  

---

## 📂 Project Structure

```txt
Mini-Ecommerce-ReactJS-SpringBoot/
 ├── Implementation_Images/                   # Demo screenshots
 │
 ├── Mini Ecommerce Backend/
 │    └── Mini-Ecommerce-Backend/
 │         ├── src/
 │         │    ├── main/
 │         │    │    ├── java/com/Mini_Ecommerce/
 │         │    │    │    ├── Controller/
 │         │    │    │    ├── Model/
 │         │    │    │    ├── Repository/
 │         │    │    │    ├── Security/
 │         │    │    │    └── Service/
 │         │    │    └── resources/
 │         │    │         └── application.properties
 │         │    └── test/java/com/Mini_Ecommerce/
 │         ├── .gitignore
 │         ├── mvnw
 │         ├── mvnw.cmd
 │         ├── pom.xml
 │         └── README.md
 │
 ├── Mini_Ecommerce_Frontend/
 │    ├── Frontend/
 │    │    ├── public/
 │    │    ├── src/
 │    │    │    ├── components/
 │    │    │    ├── pages/
 │    │    │    ├── App.js
 │    │    │    └── index.js
 │    │    ├── package.json
 │    │    └── README.md
 │
 ├── .gitignore
 └── README.md
```

---

## 🧪 How to Run

### **Backend**
```bash
cd backend
mvn spring-boot:run
```

### **Frontend**
```bash
cd frontend
npm install
npm start
```

### **Database**
- Configure MySQL in `application.properties`

---

## 📘 API Modules

- **Auth Controller:** Login, Signup  
- **Product Controller:** CRUD, Filters  
- **Cart Controller:** Add/Remove Items  
- **Order Controller:** Place/View Orders  
- **Admin Controller:** Restricted APIs  

---

## 🌟 Highlights

- End-to-end full stack implementation  
- JWT Authentication with roles  
- Modern UI using Tailwind  
- Production-style API structure  
- Clean React component architecture  

---

## 👤 Author  
**Baskaran G**  
GitHub: https://github.com/Baskaran08  
LinkedIn: https://www.linkedin.com/in/baskaran--g/
