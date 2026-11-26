// pigeon-pitch: the city pigeon's one-line elevator pitch to investors.
// Writes the pitch to /output/entry.txt for the sealed scorer.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "We're the city's last-mile delivery network: ten thousand couriers, zero salaries, paid in breadcrumbs. Our Series A ask: one statue, hold the spikes.";

const MAX_CHARS = 200;

function checkPitch(pitch: string): void {
  const size = [...pitch].length;
  if (size < 1 || size > MAX_CHARS) {
    throw new Error(`pitch is ${size} chars, gate is 1-${MAX_CHARS}`);
  }
  if (pitch.trim() !== pitch) throw new Error("pitch has edge whitespace");
  if (pitch.includes("\n")) throw new Error("pitch must be one line");
  if (/ {2,}/.test(pitch)) throw new Error("pitch has double spaces");
  if (/[\u0000-\u001F\u007F]/.test(pitch)) {
    throw new Error("pitch has control characters");
  }
}

checkPitch(PITCH);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), PITCH + "\n");
console.log(PITCH);
