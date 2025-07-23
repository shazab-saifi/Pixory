// global.d.ts
interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (options: {
          client_id: string;
          callback: (response: { credential: string }) => void;
          auto_select?: boolean;
          cancel_on_tap_outside?: boolean;
        }) => void;
        prompt: () => void;
      };
    };
  };
}
