"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import ThemeRegistry from "../theme/ThemeRegistry";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </Provider>
  );
}
