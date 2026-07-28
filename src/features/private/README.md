# Private User Enrollments API

এই document-এ private user dashboard-এর home page (`LeftContent`)-এ `/enrollments/my` API কীভাবে implement করা হয়েছে, সেটা step-by-step বর্ণনা করা হয়েছে।

Pattern follow করা হয়েছে: `src/features/auth`

---

## কোথায় কী করা হয়েছে

| Location | কাজ |
|----------|-----|
| `src/config/api/httpEndpoint.js` | API endpoint যোগ |
| `src/features/private/privateService.js` | HTTP GET request |
| `src/features/private/privateAPI.js` | Redux async thunk |
| `src/features/private/privateSlice.js` | Redux state management |
| `src/features/private/privateSelectors.js` | State selectors |
| `src/features/private/privateHooks.js` | `usePrivate()` custom hook |
| `src/features/private/privateMappers.js` | API response → UI data mapping |
| `src/features/store/rootReducer.js` | `private` reducer register |
| `src/pages/dash/private/01-Home/components/LeftContent.jsx` | UI-তে API data show |

---

## Folder Structure

```text
src/features/private/
├── privateService.js      # API call layer
├── privateAPI.js          # createAsyncThunk
├── privateSlice.js        # Redux slice
├── privateSelectors.js    # Selectors
├── privateHooks.js        # usePrivate hook
├── privateMappers.js      # Response mapper
└── README.md              # এই file
```

---

## Data Flow

```text
LeftContent.jsx
    ↓ usePrivate()
privateHooks.js
    ↓ dispatch(getMyEnrollmentsAPI())
privateAPI.js
    ↓ getMyEnrollmentsService()
privateService.js
    ↓ request({ GET /enrollments/my })
Backend API
    ↓ response
privateSlice.js
    ↓ mapEnrollmentsResponse()
Redux state → enrollments[]
    ↓
CourseCard.jsx (UI render)
```

---

## API Endpoint

**File:** `src/config/api/httpEndpoint.js`

```js
private: {
  MY_ENROLLMENTS: '/enrollments/my',
}
```

- Method: `GET`
- Auth: Bearer token (automatic via `axiosInstance`)
- Base URL: `ENV_CONFIG.API_BASE_URL`

---

## Layer Details

### 1. Service (`privateService.js`)

Axios `request()` helper দিয়ে API call করা হয়।

```js
export const getMyEnrollmentsService = async ({ signal } = {}) => {
  return await request({
    method: 'GET',
    url: endpoints.private.MY_ENROLLMENTS,
    signal,
  });
};
```

### 2. API Thunk (`privateAPI.js`)

Redux Toolkit `createAsyncThunk` use করা হয়েছে — `authAPI.js`-এর মতো same pattern।

```js
export const getMyEnrollmentsAPI = createAsyncThunk(
  'private/getMyEnrollments',
  async (_, { rejectWithValue, signal }) => {
    try {
      return await getMyEnrollmentsService({ signal });
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  },
);
```

### 3. Slice (`privateSlice.js`)

State shape:

```js
{
  loading: false,
  error: null,
  enrollments: [],
}
```

API success হলে `privateMappers.js` দিয়ে data map করে `enrollments`-এ store হয়।

### 4. Hook (`privateHooks.js`)

Component-এ use করার জন্য:

```js
const { fetchMyEnrollments, enrollments, loading, error } = usePrivate();
```

### 5. Mapper (`privateMappers.js`)

Backend response কে `CourseCard` component-এর expected format-এ convert করে:

```js
{
  id,
  courseId,
  title,
  category,      // COMPLETATO | IN CORSO | NON ANCORA INIZIATO
  image,
  progress,      // 0-100
  buttonText,    // Riprendi | Scarica attestato | Inizia corso
}
```

**Status mapping logic:**

| Condition | Category | Button |
|-----------|----------|--------|
| progress >= 100 বা status = completed | `COMPLETATO` | Scarica attestato |
| progress > 0 বা status = in_progress | `IN CORSO` | Riprendi |
| otherwise | `NON ANCORA INIZIATO` | Inizia corso |

**Supported API response shapes:**

```js
// Option 1
{ data: { enrollments: [...] } }

// Option 2
{ data: [...] }

// Option 3
{ enrollments: [...] }

// Option 4
[...]
```

**Enrollment item example (flexible fields):**

```js
{
  id: 1,
  progress: 75,
  status: 'in_progress',
  course: {
    id: 10,
    title: 'Formazione SEVESO',
    image: '/path/to/image.jpg'
  }
}
```

---

## UI Integration

**File:** `src/pages/dash/private/01-Home/components/LeftContent.jsx`

### আগে (hardcoded mock data)

```js
const courses = [
  { id: 1, title: 'Formazione SEVESO', ... },
  ...
];
```

### এখন (API driven)

```js
const { fetchMyEnrollments, enrollments, loading, error } = usePrivate();

useEffect(() => {
  fetchMyEnrollments().catch(() => {});
}, [fetchMyEnrollments]);
```

### UI States

| State | Behavior |
|-------|----------|
| `loading` | Spinner show |
| `error` | Error message show |
| `enrollments.length === 0` | Empty state message |
| data available | Course cards carousel (3 at a time) |

Course card click:

```js
navigate(`/dashboard/private-user/course/${course.courseId ?? course.id}`)
```

---

## Redux Store Registration

**File:** `src/features/store/rootReducer.js`

```js
import privateReducer from '../private/privateSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  contact: contactReducer,
  serviceRequest: serviceRequestReducer,
  private: privateReducer,  // ← নতুন
});
```

---

## নতুন API যোগ করতে (future)

`auth` feature-এর মতো same steps follow করুন:

1. `httpEndpoint.js`-এ endpoint যোগ
2. `privateService.js`-এ service function
3. `privateAPI.js`-এ thunk
4. `privateSlice.js`-এ extraReducers
5. `privateHooks.js`-এ callback expose
6. Component-এ hook use

---

## Backend Response Adjust করতে

API response structure আলাদা হলে শুধু `privateMappers.js` update করুন — UI/component-এ change লাগবে না।

---

## Related Files

- Dashboard home view: `src/pages/dash/private/01-Home/StudentHomeView.jsx`
- Course card UI: `src/pages/dash/private/01-Home/components/CourseCard.jsx`
- Auth pattern reference: `src/features/auth/`
