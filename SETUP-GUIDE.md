# 🎊 Setup Guide - MongoDB + Vercel

## 📋 Step-by-Step Instructions

### 1️⃣ Install MongoDB Package
```bash
npm install mongodb
```

### 2️⃣ Setup MongoDB on Vercel

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com
   - Select your project

2. **Add Storage**
   - Click "Storage" tab
   - Click "Create Database"
   - Select "MongoDB Atlas"
   - Click "Continue with MongoDB Atlas"

3. **Get Connection String**
   - After connecting, you'll see your MongoDB URI
   - It looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
   - Copy this string!

### 3️⃣ Add Environment Variable

1. **In Vercel:**
   - Go to Settings → Environment Variables
   - Add new variable:
     - Name: `MONGODB_URI`
     - Value: (paste your connection string)
   - Save

2. **For Local Development:**
   - Create `.env.local` file in your project root
   - Add: `MONGODB_URI=your_connection_string_here`
   - **IMPORTANT:** Never commit `.env.local` to git!

### 4️⃣ Project Structure

Create these files in your Next.js project:

```
your-project/
├── lib/
│   └── mongodb.js              ← MongoDB connection (file provided)
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── login/
│   │           └── route.js    ← Login API (file provided)
│   └── page.js                 ← Your Hero component
├── .env.local                  ← Your MongoDB URI (create this)
└── package.json
```

### 5️⃣ Copy the Files

1. **Copy `lib/mongodb.js`** to your project's `lib/` folder
2. **Copy `app/api/auth/login/route.js`** to your project's API folder
3. **Replace your Hero component** with the new version

### 6️⃣ Update .gitignore

Make sure `.env.local` is in your `.gitignore`:
```
# .gitignore
.env.local
.env*.local
```

### 7️⃣ Test Locally

```bash
npm run dev
```

Go to http://localhost:3000 and try logging in!

## 🎨 User Badge in Top Right

The user badge appears automatically after login with:
- **User's initial** in a circle
- **Username** (visible on desktop)
- **Logout button** (🚪 door icon)

### Design Features:
- ✨ Glowing background effect on hover
- 🎭 Semi-transparent backdrop
- 💫 Smooth animations
- 📱 Responsive (username hidden on mobile)

## 🔐 How It Works

1. **User logs in** → Username + password sent to `/api/auth/login`
2. **API checks password** → If correct (password: `chunjie2026`)
3. **MongoDB stores user** → Creates or updates user record
4. **Success response** → Frontend saves username to localStorage
5. **User badge appears** → Shows username in top right corner

## 📊 MongoDB Collection Structure

```javascript
// Collection: users
{
  _id: ObjectId("..."),
  username: "Pierre",
  createdAt: ISODate("2026-01-28T..."),
  lastLogin: ISODate("2026-01-28T...")
}
```

## 🐛 Troubleshooting

**Problem: "MONGODB_URI is not defined"**
- Solution: Make sure you created `.env.local` with your MongoDB URI

**Problem: "Failed to fetch"**
- Solution: Check that your API route is in the correct folder structure

**Problem: Can't connect to MongoDB**
- Solution: Verify your connection string is correct and network access is allowed

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Vercel will automatically deploy
3. Make sure `MONGODB_URI` is set in Vercel Environment Variables
4. Done! 🎉

## 📝 Notes

- Password is hardcoded as `chunjie2026` - you can change this in the API route
- Users are automatically created on first login
- `lastLogin` is updated each time user logs in
- Username is displayed in top right corner
- Logout clears localStorage and reloads page
