/** Reusable background image style factory — eliminates repeated inline style objects. */
export const createBgStyle = (
  imageUrl: string,
  options?: { size?: string; position?: string; repeat?: string }
) => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundRepeat: (options?.repeat ?? "no-repeat") as "no-repeat" | "repeat",
  backgroundSize: (options?.size ?? "cover") as "cover" | "contain",
  backgroundPosition: (options?.position ?? "center") as string,
});
