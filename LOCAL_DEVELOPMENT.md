# 🏠 Local Development Guide

## Running Locally After Deployment

You can absolutely run your application locally even after it's deployed! This is perfect for:
- 🧪 Testing new features
- 🐛 Debugging issues
- 🚀 Rapid development iterations
- 🔧 Testing database changes safely

## 🎯 Quick Start

### 1. **Start Backend Locally**
```bash
cd backend
npm install
npm run dev
```
Your backend will run on `http://localhost:5000`

### 2. **Start Frontend Locally**
```bash
cd frontend
npm install
npm run dev
```
Your frontend will run on `http://localhost:5173`

## 🔧 Environment Configuration

### Backend (.env file)
Create `backend/.env`:
```bash
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/jokefy
PORT=5000
```

### Frontend
The frontend automatically detects the environment and will use:
- **Development**: `http://localhost:5000` (local backend)
- **Production**: `https://your-backend.onrender.com` (deployed backend)

## 🌍 How It Works

### Environment Detection
- **Local Development**: `NODE_ENV` is not set or set to `development`
- **Production**: `NODE_ENV=production` (set on Render)

### CORS Configuration
- **Local**: Allows `http://localhost:5173` and `http://localhost:3000`
- **Production**: Only allows your deployed frontend domain

### API Endpoints
- **Local**: Frontend calls `http://localhost:5000`
- **Production**: Frontend calls your deployed backend URL

## 📱 Switching Between Local and Live

### Option 1: Environment Variables
```bash
# Local development
export NODE_ENV=development
npm run dev

# Production mode (for testing)
export NODE_ENV=production
npm run dev
```

### Option 2: Manual Config Override
Temporarily modify `frontend/config.js`:
```javascript
// Force local backend for testing
export const API_BASE_URL = 'http://localhost:5000';
```

## 🗄️ Database Options

### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# Then use in .env:
MONGO_URI=mongodb://localhost:27017/jokefy
```

### Option 2: MongoDB Atlas (Same as Production)
```bash
# Use the same connection string as production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jokefy
```

### Option 3: Different Database for Testing
```bash
# Use a separate database for local development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jokefy-dev
```

## 🚀 Development Workflow

### 1. **Start Local Development**
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

### 2. **Make Changes**
- Edit your code
- See changes instantly (hot reload)
- Test locally

### 3. **Test Production Build**
```bash
cd frontend
npm run build
npm run preview
```

### 4. **Deploy to Production**
- Commit and push changes
- Render automatically redeploys
- Test live version

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use different port
PORT=5001 npm run dev
```

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongosh

# Or use MongoDB Atlas
# Update .env with Atlas connection string
```

### CORS Errors
- Ensure backend CORS allows `http://localhost:5173`
- Check that `NODE_ENV` is not set to `production`
- Verify frontend is calling correct backend URL

## 📋 Local Development Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:5173`
- [ ] MongoDB connection working
- [ ] Can post and read jokes locally
- [ ] Hot reload working for both frontend and backend
- [ ] Environment variables properly set

## 🎉 Benefits of Local Development

1. **Faster Development**: No deployment delays
2. **Better Debugging**: Full access to logs and error details
3. **Database Safety**: Test changes without affecting production data
4. **Cost Effective**: No Render usage while developing locally
5. **Offline Development**: Work without internet connection

## 🔄 Switching Back to Production

When you're ready to test production:
1. Deploy your changes to Render
2. Visit your live frontend URL
3. Test the deployed version
4. Switch back to local for more development

---

**Remember**: Your local development environment is completely independent of your deployed application. You can develop, test, and iterate locally without affecting your live users! 🚀
