# Frontend Deployment Guide (Netlify)

## 🚀 Deploying to Netlify

### Step 1: Connect Your GitHub Repository
1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select **GitHub** and authorize
4. Choose the **AI-LEARNING-PLATFORM** repository
5. Click **"Connect"**

### Step 2: Configure Build Settings

When Netlify asks for build settings, use:

**Build Command:**
```
npm run build
```

**Publish Directory:**
```
dist
```

**Base Directory:** (leave empty)

### Step 3: Set Environment Variables

On Netlify, go to **Site Settings** → **Build & Deploy** → **Environment**:

Add the following environment variable for production:

```
VITE_API_URL = https://ai-learning-platform-lac.vercel.app
```

### Step 4: Deploy

1. Click **"Deploy site"**
2. Wait for the build to complete (usually 2-3 minutes)
3. You'll get a URL like: `https://your-site-name.netlify.app`

---

## 📝 Environment Configuration

### For Local Development
- No `.env.local` file needed
- Frontend will automatically use `http://localhost:8000`
- Make sure your backend is running: `npm run dev` in the backend folder

### For Netlify Production
- Frontend automatically uses: `https://ai-learning-platform-lac.vercel.app`
- Or set `VITE_API_URL` environment variable in Netlify settings

---

## ✅ Testing After Deployment

1. Visit your Netlify URL
2. Try to **Login/Register** - should connect to Vercel backend
3. Check network tab (F12 → Network) to see API calls going to Vercel
4. All features should work (AI chat, flashcards, quizzes, etc.)

---

## 🔧 Key Configuration Files

### [apiPaths.js](src/utils/apiPaths.js)
- Defines all API endpoints
- Auto-detects environment
- Uses `VITE_API_URL` if provided

### [axiosInstance.js](src/utils/axiosInstance.js)
- Sets up authentication (adds JWT token to headers)
- Handles request/response interceptors

---

## 🐛 Troubleshooting

### "API is not reachable" / CORS errors
- Check that `VITE_API_URL` is set correctly in Netlify
- Verify backend is running and accessible
- Check CORS headers in backend (should be enabled)

### "Network Error" on login
- Verify the backend URL in browser DevTools (Network tab)
- Make sure Vercel backend is running

### Build fails on Netlify
- Check Netlify build logs for errors
- Make sure `npm run build` works locally: `npm run build` in frontend folder

---

## 📱 API Base URL Hierarchy

The frontend automatically selects the correct API URL in this order:

1. **Environment Variable** (`VITE_API_URL`) - If set, uses this
2. **Development** - If `npm run dev`, uses `http://localhost:8000`
3. **Production** - If built for production, uses `https://ai-learning-platform-lac.vercel.app`

---

## 🎯 Quick Summary

✅ **Backend deployed:** https://ai-learning-platform-lac.vercel.app  
✅ **Frontend ready for Netlify**  
✅ **Environment variables configured**  

Next steps:
1. Push to GitHub (done automatically)
2. Connect Netlify to GitHub repo
3. Add `VITE_API_URL` environment variable in Netlify
4. Deploy!
