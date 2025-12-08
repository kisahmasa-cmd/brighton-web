export const useRouter = () => ({
  push: (url: string) => console.log("[MockRouter] push:", url),
  replace: (url: string) => console.log("[MockRouter] replace:", url),
  prefetch: async () => {},
  back: () => console.log("[MockRouter] back()"),
  forward: () => console.log("[MockRouter] forward()"),
  refresh: () => console.log("[MockRouter] refresh()"),
});

export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
