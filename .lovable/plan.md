

# Plan: Fix Sign-Up Flow & Enhance Profile Dropdown

## Summary
This plan addresses two main areas:
1. **Sign-up and email verification flow** - Fix error handling for unverified users and provide clear feedback
2. **Profile dropdown enhancement** - Add a full contact card with avatar, display name, email, and member since date

---

## Part 1: Sign-Up & Email Verification Flow

### Current Issues Identified
- When sign-up throws an error, it's not being handled with specific messaging
- When an unverified user tries to sign in, Supabase returns "Email not confirmed" error but the app shows a generic "Sign In Failed" toast
- No mechanism to resend verification email or guide users

### Changes Required

#### 1.1 Update AuthContext.tsx
- Modify `signUp` function to return more detailed information about the sign-up result
- Return both the `data` and `error` from Supabase to check if user was created but needs confirmation

#### 1.2 Update Auth.tsx (Sign In/Sign Up Page)
- Add specific error handling for the "Email not confirmed" case
- When this error is detected:
  - Show a clear message: "Please verify your email address before signing in"
  - Display a "Resend verification email" button
- Add a `resendVerificationEmail` function to AuthContext that calls `supabase.auth.resend()`
- Improve sign-up error handling to catch specific Supabase error messages

#### 1.3 Create Email Verification Pending State
- After successful sign-up, show a confirmation screen/message indicating the user should check their email
- Redirect to sign-in page with a message explaining they need to verify first

---

## Part 2: Profile Dropdown Enhancement

### Current State
- Dashboard has a simple avatar button showing initials
- Dropdown only contains "Sign Out" option

### New Design: Full Contact Card

The dropdown will be redesigned to include:

```text
+----------------------------------+
|  [Avatar]                        |
|  rakshan98n                      |
|  rakshan98n@gmail.com            |
|  --------------------------------|
|  Member since Jan 2026           |
|  ID: b4088cac...                 |
+----------------------------------+
|  [ Sign Out ]                    |
+----------------------------------+
```

#### 2.1 Update Dashboard.tsx
- Expand the `DropdownMenuContent` to include:
  - User avatar (using the existing gradient avatar with initials, or DiceBear)
  - Display name (derived from email: part before @)
  - Full email address
  - Separator line
  - Member since date (from `user.created_at`)
  - Truncated User ID (first 8 characters)
  - Separator line
  - Sign Out button (styled in red as it currently is)

#### 2.2 Styling Details
- Contact card section: Clean, minimal design matching the app's Swiss-inspired aesthetic
- Use muted colors for secondary info (email, member since, ID)
- Proper padding and spacing
- Dropdown width increased to accommodate content (around 240-280px)

---

## Technical Implementation Details

### Files to Modify

| File | Changes |
|------|---------|
| `src/contexts/AuthContext.tsx` | Add `resendVerificationEmail` function, update `signUp` return type |
| `src/pages/auth/Auth.tsx` | Handle "Email not confirmed" error, add resend verification UI |
| `src/pages/Dashboard.tsx` | Redesign profile dropdown with contact card |

### Error Messages to Handle
- "Email not confirmed" - Supabase error when unverified user tries to sign in
- "User already registered" - When email is already in use
- "Invalid login credentials" - Wrong email/password combination

### New AuthContext Function

```typescript
const resendVerificationEmail = async (email: string) => {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
  });
  return { error };
};
```

### Profile Dropdown Structure

```typescript
<DropdownMenuContent align="end" className="w-64">
  {/* Contact Card Section */}
  <div className="px-4 py-3">
    <div className="flex items-center gap-3">
      <Avatar />
      <div>
        <p className="font-medium">{displayName}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t">
      <p className="text-xs text-muted-foreground">
        Member since {formattedDate}
      </p>
      <p className="text-xs text-muted-foreground">
        ID: {truncatedId}
      </p>
    </div>
  </div>
  
  <DropdownMenuSeparator />
  
  <DropdownMenuItem onClick={handleSignOut}>
    <LogOut className="h-4 w-4" />
    Sign Out
  </DropdownMenuItem>
</DropdownMenuContent>
```

---

## Implementation Order

1. **AuthContext updates** - Add resend verification function
2. **Auth.tsx error handling** - Detect and handle email verification errors
3. **Dashboard.tsx** - Redesign profile dropdown with contact card

---

## Testing Checklist

After implementation, verify:
- [ ] New user sign-up shows confirmation message
- [ ] Unverified user trying to sign in sees "verify email" error with resend option
- [ ] Resend verification email button works
- [ ] After email verification, user can sign in and lands on dashboard
- [ ] Profile dropdown shows avatar, name, email, member since date, and user ID
- [ ] Sign out works from the new dropdown

