# 🚀 Deployment Guide for Jokefy

## Prerequisites

1. **MongoDB Atlas Account** (Free tier available)
2. **Render Account** (Free tier available)
3. **GitHub Repository** with your code

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/jokefy`)
4. Note this connection string for later

## Step 2: Deploy Backend to Render

1. **Sign up for Render** at [render.com](https://render.com)
2. **Connect your GitHub repository**
3. **Create a new Web Service**:
   - Choose your repository
   - Name: `jokefy-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Plan: `Free`

4. **Set Environment Variables**:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: Leave empty (Render will set this automatically)

5. **Deploy** and note your backend URL (e.g., `https://jokefy-backend.onrender.com`)

## Step 3: Deploy Frontend to Render

1. **In the same Render dashboard, create another Web Service**:
   - Choose your repository again
   - Name: `jokefy-frontend`
   - Environment: `Static Site`
   - Build Command: `cd frontend && npm install --production=false && npm run build:prod`
   - Publish Directory: `frontend/dist`
   - Plan: `Free`

2. **Set Environment Variables**:
   - `NODE_ENV`: `production`

3. **Deploy** and note your frontend URL (e.g., `https://jokefy-frontend.onrender.com`)

## Step 4: Update Configuration

1. **Update backend CORS** in `backend/server.js`:
   ```javascript
   origin: process.env.NODE_ENV === 'production' 
     ? ['https://your-frontend-domain.onrender.com'] // Replace with your actual frontend URL
     : ['http://localhost:5173', 'http://localhost:3000']
   ```

2. **Update frontend config** in `frontend/src/config.js`:
   ```javascript
   export const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://your-backend-domain.onrender.com' // Replace with your actual backend URL
     : 'http://localhost:5000';
   ```

3. **Redeploy both services** after making these changes

## Troubleshooting

### "vite: not found" Error

This usually happens when:
1. **Dependencies not installed**: Make sure `npm install` runs before `npm run build`
2. **Wrong working directory**: Ensure the build command runs from the `frontend` directory
3. **Vite not in dependencies**: Check that `vite` is in `devDependencies`

**Solution**: Use the updated build command:
```bash
cd frontend && npm install --production=false && npm run build:prod
```

### Build Fails

1. **Test locally first**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Check for errors** in the build output
3. **Verify all dependencies** are in `package.json`

### CORS Issues

1. **Check backend CORS configuration**
2. **Verify frontend URL** in backend CORS settings
3. **Ensure backend is running** and accessible

### MongoDB Connection Issues

1. **Check connection string** format
2. **Verify network access** in MongoDB Atlas
3. **Check IP whitelist** in MongoDB Atlas

## Alternative Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend)
- **Vercel**: Better for React apps, automatic deployments
- **Render**: Good for Node.js backends

### Option 2: Netlify (Frontend) + Railway (Backend)
- **Netlify**: Excellent for static sites
- **Railway**: Good for Node.js, $5 credit monthly

### Option 3: Fly.io (Both)
- **Fly.io**: Free tier with 3 shared-cpu VMs

## Environment Variables Reference

### Backend (.env)
```bash
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jokefy
PORT=5000
```

### Frontend
```bash
NODE_ENV=production
```

## Final Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Render
- [ ] CORS settings updated with correct URLs
- [ ] Environment variables set correctly
- [ ] Both services are running and healthy
- [ ] Frontend can communicate with backend
- [ ] Jokes can be posted and retrieved

## Support

If you encounter issues:
1. Check the Render deployment logs
2. Verify all environment variables are set
3. Test the API endpoints manually
4. Check browser console for frontend errors
