# Zplus University - Deployment Guide

This project is configured for **free lifetime hosting** using the following stack:
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Spring Boot + Docker)
- **Database**: TiDB Cloud or Aiven (MySQL - 5GB Free)

---

## Step 1: Set Up Database (TiDB Cloud)

1.  Go to [TiDB Cloud](https://tidbcloud.com/) and create a free **Serverless** cluster.
2.  Once created, go to **Connect** and copy the connection details.
3.  You'll get values like:
    - `host`: `gateway01.xxx.prod.aws.tidbcloud.com`
    - `port`: `4000`
    - `user`: `xxxxx.root`
    - `password`: `your_password`
4.  Construct your `DATABASE_URL`:
    ```
    jdbc:mysql://gateway01.xxx.prod.aws.tidbcloud.com:4000/zplus_university?sslMode=VERIFY_IDENTITY
    ```

---

## Step 2: Deploy Backend to Render

1.  Go to [Render](https://render.com/) and create a new **Web Service**.
2.  Connect your GitHub repository (`Exoticaditya/Zplus-University`).
3.  Choose **Docker** as the environment (Render will auto-detect the `Dockerfile`).
4.  Set these **Environment Variables**:

    | Key                 | Value                                                                 |
    |---------------------|-----------------------------------------------------------------------|
    | `DATABASE_URL`      | `jdbc:mysql://gateway01.xxx.prod.aws.tidbcloud.com:4000/zplus_university?sslMode=VERIFY_IDENTITY` |
    | `DATABASE_DRIVER`   | `com.mysql.cj.jdbc.Driver`                                            |
    | `DATABASE_USERNAME` | `xxxxx.root`                                                          |
    | `DATABASE_PASSWORD` | `your_tidb_password`                                                  |
    | `H2_CONSOLE_ENABLED`| `false`                                                               |
    | `FRONTEND_URL`      | `https://zplus-university.vercel.app`                                 |

5.  Click **Create Web Service**. Render will build and deploy your backend.
6.  Note your Render URL (e.g., `https://zplus-university-backend.onrender.com`).

---

## Step 3: Deploy Frontend to Vercel

1.  Go to [Vercel](https://vercel.com/) and import the same GitHub repository.
2.  Vercel will auto-detect Vite. Set the following:
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
3.  Set this **Environment Variable**:

    | Key           | Value                                                   |
    |---------------|---------------------------------------------------------|
    | `VITE_API_URL` | `https://zplus-university-backend.onrender.com`       |

4.  **Important**: Update your React code to use this environment variable for API calls.
    - Replace `http://localhost:8080` with `import.meta.env.VITE_API_URL`.

5.  Click **Deploy**. Your frontend will be live at `https://zplus-university.vercel.app`.

---

## Local Development

For local development, no changes are needed. The app will use H2 by default.

```bash
# Start backend
mvn spring-boot:run

# Start frontend
npm run dev
```

---

## Summary

| Component  | Service      | URL                                                 |
|------------|--------------|-----------------------------------------------------|
| Frontend   | Vercel       | `https://zplus-university.vercel.app`               |
| Backend    | Render       | `https://zplus-university-backend.onrender.com`     |
| Database   | TiDB Cloud   | MySQL Serverless                                    |

**All services are 100% free for lifetime (hobby/free tiers).**
