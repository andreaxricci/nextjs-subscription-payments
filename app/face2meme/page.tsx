export const runtime = 'edge'

import Face2Meme from '@/components/ui/Face2Meme/Face2Meme'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Home() {
    const supabase = createClient();
  
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect('/signin');
    }
  
    return (
        <Face2Meme />
        );
  }
  