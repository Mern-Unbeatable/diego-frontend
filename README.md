# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Diego_LMS_MERN

# Diego_LMS_Frontend

## 🎨 Tailwind Development vsCode Editor setup

### Step-1 : To get started, install prettier-plugin-tailwindcss as a dev-dependency:

```js
npm install -D prettier prettier-plugin-tailwindcss
```

### Step-2 : Then add the plugin to your Prettier configuration:

````js
// .prettierrc
{
  "plugins": ["prettier-plugin-tailwindcss"]
}

# Project Structure

```js

└── 📁 src/
├──  App.jsx
├──  index.css
├──  main.jsx
├── 📁 router/
│ ├── router.jsx
│ ├── 📁 guards/
│ │ ├── AuthGuard.jsx
│ │ ├── PublicGuard.jsx
│ │ └── RoleGuard.jsx
│ └── 📁 layout/
│ ├── 📁 teacher/
│ │ └── TeacherLayout.jsx
│ ├── 📁 students/
│ │ └── StudentLayout.jsx
│ ├── 📁 public/
│ │ └── MainLayout.jsx
│ ├── 📁 auth/
│ │ └── AuthLayout.jsx
│ └── 📁 admin/
│ └── AdminLayout.jsx
├── 📁 config/
│ ├── api.js
│ ├── appConfig.js
│ ├── constants.js
│ ├── permissions.js
│ ├── roles.js
│ ├── routes.js
│ └── 📁 language/
│ ├── 📁 locales/
│ │ ├── index.js
│ │ ├── 📁 zh/
│ │ │ └── translation.json
│ │ ├── 📁 it/
│ │ │ └── translation.json
│ │ ├── 📁 en/
│ │ │ └── translation.json
│ │ └── 📁 ar/
│ │ └── translation.json
│ └── 📁 i18n/
│ ├── index.js
│ ├── rtl.js
│ └── settings.js
├── 📁 components/
│ └── LanguageSwitcher.jsx
├── 📁 api/
│ ├── axiosInstance.js
│ ├── endpoints.js
│ └── httpMethods.js
├── 📁 pages/
│ ├── 📁 teacher/
│ │ ├── CoursesView.jsx
│ │ ├── TeacherView.jsx
│ │ └── VideosView.jsx
│ ├── 📁 students/
│ │ ├── DocsView.jsx
│ │ └── StudentView.jsx
│ ├── 📁 home/
│ │ ├── ContactView.jsx
│ │ └── HomeView.jsx
│ ├── 📁 err/
│ │ └── ErrorView.jsx
│ ├── 📁 auth/
│ │ └── LoginView.jsx
│ └── 📁 admin/
│ ├── AdminView.jsx
│ └── UsersView.jsx
└── 📁 features/
└── 📁 store/
├── rootReducer.js
└── store.js

```
