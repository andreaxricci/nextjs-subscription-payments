'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import MemeLogo from '@/components/icons/MemeLogo';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
  credits?: number;
}

export default function Navlinks({ user, credits }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1 ml-4">
        <Link href="/" className={s.logo} aria-label="Logo">
          <MemeLogo />
        </Link>
        {/* 
        <nav className="ml-6 space-x-2 lg:block">
          <div>
          <Link href="/pricing" className={s.link}>
            Pricing
          </Link>
          {user && (
            <div>
            <Link href="/account" className={s.link}>
              Account
            </Link>
            <Link href="/face2meme" className={s.link}>
              Create
            </Link>
          </div>
          )}
          </div>
        </nav> */}
      </div>
      {/*  {user ? ( <div> Credits available: {credits} </div> ) : <div></div>}  */}
      <div className="flex justify-end space-x-8 mr-4">
        {user ? (
          <div className="flex justify-end space-x-8 mr-4">
          <Link href="/account" className={s.link}>
            Account
          </Link>
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname() || ''} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
          </div>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
