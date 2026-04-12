mkdir -p client/public
mkdir -p client/src/{assets,components,pages,hooks,context,services,utils}

touch client/public/index.html

touch client/src/components/{Navbar.jsx,Sidebar.jsx,ProtectedRoute.jsx,Loader.jsx}
touch client/src/pages/{Login.jsx,Register.jsx,Dashboard.jsx,Interview.jsx,ResumeAnalyzer.jsx,Profile.jsx}
touch client/src/hooks/useAuth.js
touch client/src/context/AuthContext.jsx
touch client/src/services/{api.js,authService.js,interviewService.js,resumeService.js}
touch client/src/utils/formatDate.js

touch client/src/{App.jsx,main.jsx,routes.jsx}
touch client/.env
touch client/package.json
touch client/tailwind.config.js

# ---------------- SERVER ----------------
mkdir -p server/{config,controllers,models,routes,middleware,services,utils}

touch server/config/{db.js,jwt.js}

touch server/controllers/{authController.js,interviewController.js,answerController.js,resumeController.js}

touch server/models/{User.js,Question.js,Answer.js,Resume.js}

touch server/routes/{authRoutes.js,interviewRoutes.js,answerRoutes.js,resumeRoutes.js}

touch server/middleware/{authMiddleware.js,errorMiddleware.js,rateLimiter.js}

touch server/services/{aiService.js,speechService.js,mailService.js}

touch server/utils/{generateToken.js,validators.js}

touch server/{app.js,server.js,.env,package.json}

# ---------------- DOCS ----------------
mkdir -p docs
touch docs/{api-docs.md,architecture.md,setup-guide.md}

# ---------------- ROOT FILES ----------------
touch .gitignore README.md docker-compose.yml

echo "✅ Project structure created successfully!"
