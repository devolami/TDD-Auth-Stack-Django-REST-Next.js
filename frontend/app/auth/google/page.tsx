'use client';
import React from 'react';

import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';
import { useSocialAuth } from '@/client/auth';
import { Loader } from '@/client/shared';

export default function Page() {
	const [googleAuthenticate] = useSocialAuthenticateMutation();
	useSocialAuth(googleAuthenticate, 'google-oauth2');

	return (
		<Loader>
		  <h2>Signing in...</h2>
		</Loader>
	  );
}