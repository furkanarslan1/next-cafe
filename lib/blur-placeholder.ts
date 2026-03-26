// Server-side only — uses Buffer (Node.js)
// Do not import in client components
const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='8'><rect width='8' height='8' fill='#78716c'/></svg>`;
export const BLUR_PLACEHOLDER = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;