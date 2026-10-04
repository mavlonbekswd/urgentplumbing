import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { business } from "@/data/business";

// The social-sharing image (1200×630), drawn from the logo and real business details.
// No photography, so nothing here can misrepresent the business.

export const alt = `${business.name} — local plumbing and drainage for homes and businesses`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public/brand/logo-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a2742",
          padding: "64px 72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", background: "#ffffff", borderRadius: 16, padding: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markSrc} width={148} height={120} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: 6, color: "#ffffff" }}>URGENT</div>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, color: "#9fb9d3" }}>{"PLUMBING & DRAINAGE"}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>
            {`Local plumbing & drainage for ${business.base.town} and surrounding areas`}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, color: "#c4d5e6" }}>
            <div
              style={{
                display: "flex",
                background: "#038545",
                color: "#ffffff",
                borderRadius: 10,
                padding: "12px 24px",
                fontWeight: 700,
              }}
            >
              {`Call ${business.phone.display}`}
            </div>
            <div style={{ display: "flex" }}>{business.domain}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
