"use client";
// After
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

// Updated CSS import from new package
import "@knocklabs/react/dist/index.css";
import { useSession } from "next-auth/react";
import Knock from "@knocklabs/client";
import { useEffect, useRef, useState } from "react";

const KnockNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const notifButtonRef = useRef(null);
  const { data: session } = useSession();
  const knockClient = new Knock(process.env.KNOCK_PUBLIC_API_KEY as string);
  knockClient.authenticate(session?.user.id as string);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    // Updated props on KnockProvider
    <KnockProvider
      apiKey={process.env.KNOCK_PUBLIC_API_KEY as string}
      userId={session?.user.id as string}
      // userToken={currentUser.knockUserToken}
    >
      <KnockFeedProvider feedId={process.env.KNOCK_FEED_CHANNEL_ID as string}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={e => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};
export default KnockNotification;
