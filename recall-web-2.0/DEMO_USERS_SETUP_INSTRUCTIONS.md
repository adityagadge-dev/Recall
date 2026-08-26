# Demo Users & Auth Setup Instructions

This document provides instructions on how to set up the authentication flow for your demo presentation, ensuring you have the requested 2 Learners, 1 Creator, and 1 Admin ready to log in and showcase the platform.

## 1. Demo User Profiles

For the presentation, we need to guarantee these 4 specific users can log in:

### Learners (2)
1. **Aria Chen**
   - **Email:** aria.chen@recall.edu
   - **Role:** learner
   - **Characteristics:** High XP, actively taking the Financial Literacy course, on a 14-day streak.
2. **Marcus Johnson**
   - **Email:** marcus.j@recall.edu
   - **Role:** learner
   - **Characteristics:** New user, onboarding stage, taking Digital Safety.

### Creator (1)
3. **Dr. Sarah Miller**
   - **Email:** sarah.miller@recall.edu
   - **Role:** creator
   - **Characteristics:** Has published 3 courses, viewing analytics and student engagement metrics.

### Admin (1)
4. **System Administrator**
   - **Email:** admin@recall.edu
   - **Role:** admin
   - **Characteristics:** Managing platform governance, resolving flagged content, viewing system-wide revenue and health.

## 2. Frontend Auth Configuration (Demo Mode)

To allow seamless switching during your demo without needing a real password or OTP verification, we configure the frontend's mock auth service to intercept these emails.

Currently, `src/services/authApi.ts` uses generic mock data. To enforce the 4 demo users:

Modify `src/services/authApi.ts` `signIn` method to check the email and return the exact profile:

```typescript
static async signIn(email: string): Promise<ApiResponse<User>> {
  return ApiClient.post<User>('/auth/sign-in', { email }, () => {
    
    if (email === 'admin@recall.edu') {
      return { id: 'u3', name: 'System Administrator', email, role: 'admin', avatarUrl: '...', permissions: ['all'] };
    }
    if (email === 'sarah.miller@recall.edu') {
      return { id: 'u2', name: 'Dr. Sarah Miller', email, role: 'creator', avatarUrl: '...' };
    }
    if (email === 'marcus.j@recall.edu') {
      return { id: 'u4', name: 'Marcus Johnson', email, role: 'learner', avatarUrl: '...', currentXp: 120, streakDays: 2 };
    }
    
    // Default fallback (Aria Chen)
    return { id: 'u1', name: 'Aria Chen', email: 'aria.chen@recall.edu', role: 'learner', avatarUrl: '...', currentXp: 4850, streakDays: 14 };
  });
}
```

## 3. Database & Backend Connection

When you connect the real backend (e.g. Python API), you must seed these 4 users into your database before the presentation.

### Seed Script Example (Python / SQLAlchemy)
```python
from models import User, Role

def seed_demo_users(db_session):
    users = [
        User(email="aria.chen@recall.edu", name="Aria Chen", role=Role.LEARNER, xp=4850, streak=14),
        User(email="marcus.j@recall.edu", name="Marcus Johnson", role=Role.LEARNER, xp=120, streak=2),
        User(email="sarah.miller@recall.edu", name="Dr. Sarah Miller", role=Role.CREATOR),
        User(email="admin@recall.edu", name="System Administrator", role=Role.ADMIN),
    ]
    
    db_session.bulk_save_objects(users)
    db_session.commit()
    print("Demo users seeded successfully.")
```

## 4. Presentation Workflow

During your demo:
1. Open the app to the Public Landing Page (`/`).
2. Click **Sign In**.
3. Type `sarah.miller@recall.edu` and any password to demonstrate the **Creator Dashboard**.
4. Log out. Type `admin@recall.edu` to demonstrate the **Admin Governance Panel**.
5. Log out. Type `aria.chen@recall.edu` to show the fully populated **Student Dashboard** with the AI-generated syllabus.
