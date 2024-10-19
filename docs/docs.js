const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

// ตัวแปรสำหรับเก็บข้อมูลผู้ใช้
let usersd = []; // ประกาศตัวแปร usersd โดยใช้ let

// อ่านไฟล์ JSON
fs.readFile('../ข้อมูลหลักสูตรปวส.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  usersd = JSON.parse(data); // แปลงข้อมูล JSON สตริงกลับเป็นอ็อบเจ็กต์และเก็บใน usersd
});

// 1. Endpoint เพื่อดึงผู้ใช้ทั้งหมด
app.get('/api/users', (req, res) => {
  res.json(usersd);
});

// 2. Endpoint เพื่อดึงผู้ใช้ตาม ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = usersd.find(u => u.id === userId); // ใช้ usersd แทน users

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 3. Endpoint เพิ่มเติม เช่นข้อมูลของบริษัท
const companyInfo = {
  name: "TechCorp",
  address: "1234 Main St, Tech City",
  employees: 100
};

app.get('/api/company', (req, res) => {
  res.json(companyInfo);
});

// 4. Endpoint เพื่อดึงรายการผลิตภัณฑ์
const products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
  { id: 3, name: "Tablet", price: 300 }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

// รันเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
