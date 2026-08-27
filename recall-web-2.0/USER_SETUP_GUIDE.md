# User Setup Flow Integration Guide

This guide explains how to connect the newly added `UserSetupPage` component to your existing authentication flow. 

When a user signs up, instead of going directly to the `/app` dashboard, they should be routed to `/setup` to configure their profile (Name, Experience Level, and Goals). Once complete, the setup page will save this data to your backend and then redirect them to the `/app` dashboard.

## 1. Page Location
The single setup page has been created at:
`src/pages/public/UserSetupPage.tsx`

The route is already registered in `src/App.tsx` as:
`<Route path="/setup" element={<UserSetupPage />} />`

## 2. Connect the Sign Up Flow

In your existing `SignUpPage` (likely located in `src/pages/public/AuthPages.tsx` or similar), locate the form submission or OAuth success handler. You need to change the redirect destination from `/app` to `/setup`.

### Example (React Router)
```typescript
import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await authApi.register(email, password);
      // ❌ Old behavior: navigate('/app');
      // ✅ New behavior: Send them to setup
      navigate('/setup');
    } catch (err) {
      // handle error
    }
  };

  return <form onSubmit={handleSignUp}>{/* ... */}</form>;
};
```

## 3. Handling Setup Completion

Inside `src/pages/public/UserSetupPage.tsx`, there is a `handleComplete` function that currently simulates an API call and redirects to the dashboard. 

When your backend is ready, update this function to execute the real API request to save the user's name, goals, and experience level:

```typescript
// Inside src/pages/public/UserSetupPage.tsx

const handleComplete = async () => {
  setIsSubmitting(true);
  try {
    // 1. Send data to your Python backend / database
    await apiClient.post('/users/profile/setup', {
      name: name,
      goals: selectedGoals,
      experienceLevel: experience
    });
    
    // 2. Redirect to dashboard
    navigate('/app');
  } catch (error) {
    console.error("Failed to save profile", error);
    setIsSubmitting(false);
  }
};
```

## UI & Theme
The `UserSetupPage` has been strictly styled to match the dark cinematic theme of the platform using `#07080C` backgrounds, `#11151F` elevations, and the `#FF6B61` coral accent color. It features a multi-step animation flow powered by Framer Motion.
