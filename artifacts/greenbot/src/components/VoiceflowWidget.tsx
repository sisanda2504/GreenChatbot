import { useEffect } from "react";

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: object) => void;
        open: () => void;
      };
    };
  }
}

export default function VoiceflowWidget() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://cdn.voiceflow.com/widget-next/bundle.mjs"]'
    );
    if (existingScript) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";

    script.onload = () => {
      if (window.voiceflow?.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: "69db65c2baeb65241ec18948" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: {
            url: "https://runtime-api.voiceflow.com",
          },
        });
      }
    };

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }

    return () => {
      // cleanup is intentionally left out — widget persists on the page
    };
  }, []);

  return null;
}
