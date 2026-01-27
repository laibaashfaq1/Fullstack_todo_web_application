// app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // Permanently redirect the root path to the login page.
  redirect('/auth/login');
}
