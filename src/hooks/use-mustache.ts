import { useUser } from "@/hooks/use-user";
import Mustache from "mustache";

export const useMustache = () => {
  const user = useUser();
  return (s: string, dict?: Record<string, string | number | boolean>) => {
    const d = { ...{ userName: user?.name }, ...(dict ?? {}) };
    try {
      return Mustache.render(s, d);
    } catch (e) {
      // Error: Unclosed tag at xxxx
      return s;
    }
  };
};
