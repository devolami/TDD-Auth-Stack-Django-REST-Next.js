"use client"
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '../../../../redux/hooks';
import { setAuth } from '../../../../redux/features/authSlice';
import { toast } from 'react-toastify';


interface AuthenticateParams {
    provider: string;
    state: string | null;
    code: string | null;
}
interface AuthenticateSuccessResult {
    accessToken: string;
    userId: number;
}

interface AuthenticateResult {
    unwrap: () => Promise<AuthenticateSuccessResult>;
}

type AuthenticateFunction = (params: AuthenticateParams) => AuthenticateResult;


export default function useSocialAuth(authenticate: AuthenticateFunction, provider: string) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    const effectRan = useRef(false);

    useEffect(() => {
        const state = searchParams.get('state');
        const code = searchParams.get('code');

        if (state && code && !effectRan.current) {
            authenticate({ provider, state, code })
                .unwrap()
                .then(() => {
                    dispatch(setAuth());
                    toast.success('Logged in');
                    router.push('/dashboard');
                })
                .catch(() => {
                    toast.error('Failed to log in');
                    router.push('/auth/login');
                });
        }

        return () => {
            effectRan.current = true;
        };
    }, [authenticate, provider, dispatch, router, searchParams]);
}