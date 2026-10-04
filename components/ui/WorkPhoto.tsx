import Image from "next/image";
import { photos, type PhotoId } from "@/data/photos";
import { cn } from "@/lib/cn";

/**
 * A real job photo, presented plainly: rounded corners and a hairline border, no overlays or
 * filters. The frame's shape is set with `frameClassName` (e.g. "aspect-[4/3]") so the space is
 * reserved before the image loads; each photo's own focal point keeps the subject in view
 * whatever the crop. Below-the-fold photos lazy-load by default.
 */
export function WorkPhoto({
  id,
  sizes,
  frameClassName = "aspect-[4/3]",
  className,
  caption = true,
  priority = false,
}: {
  id: PhotoId;
  /** Rendered width at each breakpoint, so the browser downloads the right size. */
  sizes: string;
  frameClassName?: string;
  className?: string;
  caption?: boolean;
  priority?: boolean;
}) {
  const photo = photos[id];
  return (
    <figure className={cn("flex min-w-0 flex-col", className)} data-photo={id}>
      <div className={cn("relative w-full overflow-hidden rounded-lg border border-line bg-mist", frameClassName)}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={photo.blur}
          className="object-cover"
          style={{ objectPosition: photo.focus }}
        />
      </div>
      {caption && <figcaption className="mt-2 text-[0.875rem] leading-snug text-muted">{photo.caption}</figcaption>}
    </figure>
  );
}
