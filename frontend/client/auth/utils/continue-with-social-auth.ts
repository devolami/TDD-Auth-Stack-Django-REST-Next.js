"use client";
import { toast } from 'react-toastify';

export default async function continueWithSocialAuth(
    provider: string,
    redirect: string
) {
    try {
        const url = `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/api/o/${provider}/?redirect_uri=${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_SITE_URL : 'http://localhost:3000'}/auth/${redirect}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        });

        if (!res.ok) {
            // Handle non-200 HTTP status codes
            toast.error(`HTTP error! status: ${res.status}`);
            return; // Exit the function to prevent further execution
        }

        const data = await res.json();

        if (typeof window !== 'undefined') {
            window.location.replace(data.authorization_url);
        } else {
            toast.error('Something went wrong');
        }
    } catch (err) {
        console.error("Something went wrong", err);
        if (err instanceof Error) {
            toast.error(err.message); // Display the error message from the Error object
        } else {
            toast.error("An unknown error occurred");
        }
    }
}