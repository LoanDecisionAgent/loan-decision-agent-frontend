# Vercel Deployment Guide

This document provides step-by-step instructions for deploying the frontend to Vercel.

## ✅ Pre-Deployment Checklist

The frontend is now **Vercel-ready** with the following verified:

- ✅ `package.json` has required scripts (`dev`, `build`, `start`)
- ✅ `next.config.js` is properly configured (no static export)
- ✅ `app/` directory exists (Next.js 14 App Router)
- ✅ `vercel.json` configuration file created
- ✅ `.vercelignore` file created (excludes Docker files)
- ✅ TypeScript configuration is correct
- ✅ All dependencies are properly listed

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New Project"**

4. **Import your repository**

5. **Configure Project Settings:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend` (if repo contains multiple projects)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (default)

6. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_API_BASE_URL`
   - Value: Your backend API URL (e.g., `https://api.yourdomain.com`)
   - Apply to: Production, Preview, Development

7. **Click "Deploy"**

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Login to Vercel:**
   ```bash
   vercel login
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? (No for first deploy)
   - Project name: `loandecisionagent-frontend` (or your choice)
   - Directory: `./` (current directory)
   - Override settings? (No)

5. **Set Environment Variables:**
   ```bash
   vercel env add NEXT_PUBLIC_API_BASE_URL
   ```
   Enter your backend API URL when prompted.

6. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration Files

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### Environment Variables

**Required:**
- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL

**Example values:**
- Development: `http://localhost:3001`
- Production: `https://api.yourdomain.com`

## 📝 Post-Deployment

### 1. Verify Deployment

After deployment, verify:
- ✅ Site loads correctly
- ✅ API calls work (check browser console)
- ✅ All routes are accessible
- ✅ Environment variables are set correctly

### 2. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificate

### 3. Environment-Specific Deployments

Vercel supports three environments:
- **Production**: Main branch deployments
- **Preview**: Pull request deployments
- **Development**: Local development with `vercel dev`

Set environment variables for each environment as needed.

## 🐛 Troubleshooting

### Build Fails

1. **Check build logs** in Vercel dashboard
2. **Verify Node.js version** (should be 18.x)
3. **Check for TypeScript errors:**
   ```bash
   npm run build
   ```
4. **Verify all dependencies** are in `package.json`

### API Calls Fail

1. **Verify environment variable** is set correctly:
   - Check Vercel dashboard → Settings → Environment Variables
   - Ensure `NEXT_PUBLIC_API_BASE_URL` is set
   
2. **Check CORS configuration** on backend:
   - Backend must allow requests from Vercel domain
   - Add Vercel domain to CORS allowed origins

3. **Check network tab** in browser DevTools for errors

### Routes Not Working

1. **Verify Next.js App Router structure** is correct
2. **Check for dynamic routes** - ensure they're properly configured
3. **Review build logs** for route generation errors

### Environment Variables Not Working

1. **Redeploy** after adding/changing environment variables
2. **Verify prefix** - must start with `NEXT_PUBLIC_` for client-side access
3. **Check spelling** - variable names are case-sensitive

## 📊 Vercel Features

### Automatic Deployments
- **Git Integration**: Automatic deployments on push
- **Preview Deployments**: One per pull request
- **Branch Deployments**: Deploy specific branches

### Analytics (Optional)
- Enable Vercel Analytics in project settings
- View performance metrics and user analytics

### Edge Functions (Future)
- Can add API routes in `app/api/` directory
- Deployed as serverless functions

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## ✅ Deployment Checklist

Before deploying, ensure:
- [ ] Code is pushed to Git repository
- [ ] All tests pass locally (`npm test`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Environment variables are documented
- [ ] Backend API is accessible from Vercel domain
- [ ] CORS is configured on backend
- [ ] No hardcoded API URLs in code
- [ ] `.vercelignore` excludes unnecessary files

---

**Status**: ✅ Frontend is ready for Vercel deployment!
