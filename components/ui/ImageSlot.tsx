import Image from "next/image";
import { cn } from "@/lib/cn";
import { imageSlots, type ImageSlotId } from "@/data/images";

/** True once a real photo has been supplied for this slot in data/images.ts. */
export function hasImage(id: ImageSlotId): boolean {
  return Boolean(imageSlots[id].src);
}

/**
 * A reserved place for a real business photo (see data/images.ts).
 *
 * Until a photo is supplied the slot renders nothing at all — no stock image, no decorative
 * placeholder competing with the contact options. Once `src` is set it renders the photo at the
 * slot's aspect ratio, with data-image-slot="<id>" so it's easy to find in the page.
 */
export function ImageSlot({
  id,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  id: ImageSlotId;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const slot = imageSlots[id];
  if (!slot.src) return null;
  return (
    <div
      className={cn("relative overflow-hidden rounded-lg border border-line bg-mist", className)}
      style={{ aspectRatio: slot.aspect }}
      data-image-slot={id}
    >
      <Image src={slot.src} alt={slot.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
