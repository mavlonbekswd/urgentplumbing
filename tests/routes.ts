import { staticRoutes } from "../data/navigation";
import { services } from "../data/services";

export const allRoutes: string[] = [...staticRoutes, ...services.map((s) => `/services/${s.slug}`)];
