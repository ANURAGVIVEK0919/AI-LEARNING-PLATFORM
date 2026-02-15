# Backend Deployment Guide

## ✅ What I Fixed

The app was crashing on Vercel due to PDF parsing libraries that require native dependencies (Canvas, DOMMatrix) which don't work in serverless environments.

### Changes Made:
1. ✅ **Made PDF imports dynamic** - Loads only when needed, prevents cold start crashes
2. ✅ **Added serverless detection** - Uses `/tmp` directory for Vercel
3. ✅ **Improved error handling** - Graceful failures instead of crashes
4. ✅ **Added health check endpoints** - Test with `/` and `/api`
5. ✅ **Database connection caching** - Reuses connections across serverless invocations

---

## ⚠️ Important Limitations on Vercel

### 1. **File Uploads Won't Persist**
- Vercel serverless functions use **read-only filesystem**
- Uploaded files to `/tmp` are **deleted after function execution**
- **Solution**: Use cloud storage (AWS S3, Cloudflare R2, or similar)

### 2. **PDF Parsing May Fail**
- `pdf-parse` requires native Canvas bindings that may not work in serverless
- **Solution**: Use external PDF parsing API (e.g., PDF.co, Adobe PDF Services)

### 3. **File Size Limits**
- Vercel has request body size limits (default 4.5MB)
- **Solution**: Use direct cloud storage uploads with pre-signed URLs

---

## 🚀 Recommended Solutions

### Option 1: Use Cloud Storage (Recommended)

```javascript
// Install AWS SDK
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner

// Replace multer with S3 uploads
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
```

### Option 2: Use a Different Platform

For full file processing capabilities, consider:
- **Railway** - Simple, supports persistent storage
- **Render** - Free tier with persistent disks
- **DigitalOcean App Platform** - Full Node.js support
- **Heroku** - Dynos with ephemeral filesystem

### Option 3: Hybrid Approach

- Deploy backend on Railway/Render for file processing
- Use Vercel only for frontend

---

## 🧪 Testing Your Deployment

After deployment, test these endpoints:

```bash
# Health check
curl https://your-app.vercel.app/

# API check
curl https://your-app.vercel.app/api

# Auth test
curl -X POST https://your-app.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

---

## 🔧 Environment Variables Required

Set these in Vercel Dashboard → Settings → Environment Variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key-here
GEMINI_API_KEY=your-google-gemini-api-key
NODE_ENV=production
PORT=3000
```

---

## 📝 Current Status

✅ **Working:**
- Authentication (register, login, JWT)
- AI chat with Gemini
- Flashcard management
- Quiz management
- Progress tracking
- Database operations

⚠️ **Limited/Not Working:**
- Document uploads (files won't persist)
- PDF text extraction (may fail due to native dependencies)
- File storage (temporary only)

---

## 💡 Next Steps

1. ✅ **Your app should now start successfully**
2. Test the health endpoint: Visit your Vercel URL
3. For full functionality, implement cloud storage (see Option 1 above)
4. Or migrate to a different platform (see Option 2 above)
