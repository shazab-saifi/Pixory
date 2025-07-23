"use client";

import { useEffect, useCallback, useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function GoogleOneTap() {
  const { data: session, status } = useSession();
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  const handleCredentialResponse = useCallback((response: any) => {
    console.log("Google One Tap response:", response);
    signIn("googleonetap", {
      id_token: response.credential,
      redirect: true,
      callbackUrl: "/",
    });
  }, []);

  const initializeGoogleOneTap = useCallback(() => {
    const google = (window as any).google;

    if (!google?.accounts?.id || session) return;
    // console.log(
    //   "Google client id : ",
    //   process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    // );

    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
      auto_select: false,
    });

    google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed()) {
        console.warn(
          "One Tap not displayed:",
          notification.getNotDisplayedReason(),
        );
      } else if (notification.isSkippedMoment()) {
        console.warn("One Tap skipped:", notification.getSkippedReason());
      } else if (notification.isDismissedMoment()) {
        console.warn("One Tap dismissed:", notification.getDismissedReason());
      } else {
        console.log("One Tap displayed successfully.");
      }
    });
  }, [session, handleCredentialResponse]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        if ((window as any).google?.accounts?.id) {
          clearInterval(interval);
          setIsGoogleScriptLoaded(true);
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (isGoogleScriptLoaded && status === "unauthenticated") {
      initializeGoogleOneTap();
    }
  }, [isGoogleScriptLoaded, initializeGoogleOneTap, status]);

  return null;
}
