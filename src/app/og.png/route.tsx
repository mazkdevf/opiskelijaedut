import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { defaultLocale } from "@/i18n/config";
import { roundedCount } from "@/lib/format";
import { getOffers } from "@/lib/offers";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const SIZE = { width: 1280, height: 640 };

const color = {
  background: "#11110f",
  foreground: "#f0efea",
  muted: "#a5a39c",
  card: "#1a1a17",
  tile: "#252522",
  border: "#33332f",
  highlight: "#c5f04a",
  highlightForeground: "#1b2407",
};

const samples = [
  { label: "Ohjelmistot", value: "Ilmainen", free: true },
  { label: "Tekoäly", value: "12 kk ilmaiseksi", free: true },
  { label: "Musiikki", value: "−42 %", free: false },
  { label: "Junaliput", value: "−30 %", free: false },
  { label: "Lounas", value: "3,10 €", free: false },
];

const font = (file: string) =>
  readFile(path.join(process.cwd(), "node_modules", file));

export async function GET() {
  const [display, sans, mono] = await Promise.all([
    font(
      "@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-600-normal.woff",
    ),
    font("geist/dist/fonts/geist-sans/Geist-Medium.ttf"),
    font("geist/dist/fonts/geist-mono/GeistMono-Medium.ttf"),
  ]);
  const count = roundedCount(getOffers(defaultLocale).length);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        background: color.background,
        color: color.foreground,
        fontFamily: "Geist",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 780,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                padding: "7px 9px",
                borderRadius: 8,
                background: color.highlight,
                color: color.highlightForeground,
                fontFamily: "Geist Mono",
                fontSize: 17,
                transform: "rotate(-3deg)",
              }}
            >
              0 €
            </div>
            <div
              style={{
                fontFamily: "Bricolage",
                fontSize: 30,
                letterSpacing: "-0.02em",
              }}
            >
              {site.name}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: 62,
              fontFamily: "Bricolage",
              fontSize: 104,
              lineHeight: 0.98,
              letterSpacing: "-0.035em",
            }}
          >
            <div>Kaikki, mitä saat</div>
            <div>opiskelijana</div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                padding: "0 16px 10px",
                borderRadius: 18,
                background: color.highlight,
                color: color.highlightForeground,
                transform: "rotate(-1deg)",
              }}
            >
              ilmaiseksi
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontFamily: "Geist Mono",
            fontSize: 19,
            color: color.muted,
          }}
        >
          <span style={{ color: color.foreground }}>{count} etua</span>
          <span>·</span>
          <span>avoin lähdekoodi</span>
          <span>·</span>
          <span>lisää omasi pull requestilla</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12,
          width: 372,
          marginLeft: 16,
          transform: "rotate(3deg)",
        }}
      >
        {samples.map((sample) => (
          <div
            key={sample.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "16px 18px",
              borderRadius: 18,
              border: `1px solid ${color.border}`,
              background: color.card,
              fontSize: 19,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 12,
                background: color.tile,
                fontFamily: "Bricolage",
                fontSize: 20,
              }}
            >
              {sample.label.charAt(0)}
            </div>
            <div style={{ display: "flex", flex: 1 }}>{sample.label}</div>
            <div
              style={{
                display: "flex",
                padding: "6px 10px",
                borderRadius: 99,
                fontFamily: "Geist Mono",
                fontSize: 13,
                ...(sample.free
                  ? {
                      background: color.highlight,
                      color: color.highlightForeground,
                    }
                  : { border: `1px solid ${color.border}` }),
              }}
            >
              {sample.value}
            </div>
          </div>
        ))}
      </div>
    </div>,
    {
      ...SIZE,
      fonts: [
        { name: "Bricolage", data: display, weight: 600 },
        { name: "Geist", data: sans, weight: 500 },
        { name: "Geist Mono", data: mono, weight: 500 },
      ],
    },
  );
}
