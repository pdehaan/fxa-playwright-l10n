import slugify from "@sindresorhus/slugify";
import { test, expect } from '@playwright/test';

const BASE_URL = "https://accounts.stage.mozaws.net/";
const FULL_PAGE = true;

// TODO: Fetch this from Pontoon? Currently this is just a hacky copy/paste from
// https://github.com/mozilla/fxa/blob/main/packages/fxa-shared/l10n/supportedLanguages.json
// Although I believe many of those translations are below the 80% theoretical threshold.
const locales = [
  "ar",
  "ast",
  "az",
  "be",
  "bg",
  "bn",
  "ca",
  "cak",
  "cs",
  "cy",
  "da",
  "de",
  "dsb",
  "el",
  "en",
  "en-GB",
  "en-CA",
  "en-US",
  "es",
  "es-AR",
  "es-CL",
  "es-ES",
  "es-MX",
  "et",
  "eu",
  "fa",
  "ff",
  "fi",
  "fr",
  "fy",
  "fy-NL",
  "gn",
  "he",
  "hi",
  "hi-IN",
  "hr",
  "hsb",
  "hu",
  "ia",
  "id",
  "it",
  "ja",
  "ka",
  "kab",
  "kk",
  "ko",
  "lt",
  "lv",
  "nl",
  "nb-NO",
  "nn-NO",
  "pl",
  "pt",
  "pt-BR",
  "pt-PT",
  "rm",
  "ro",
  "ru",
  "sk",
  "sl",
  "sq",
  "sr",
  "su",
  "sv",
  "sv-SE",
  "te",
  "th",
  "tr",
  "uk",
  "vi",
  "zh-CN",
  "zh-TW"
];

// Running 288 tests using 10 workers => 288 passed (56s)
test.describe.configure({ mode: 'parallel' });

// NOTE: If running without `{mode:"parallel"}`...
// Running 288 tests using 1 worker => 146 passed (5m) (and then it started failing locally for me after about 50% of the tests ran)
//
// Slow test file: [chrome] › index.spec.mjs (5m)
// Consider splitting slow test files to speed up parallel execution

for (const locale of locales) {
  test.describe(locale, () => {
    test.use( { locale });
    test(`Homepage`, async ({ page }) => {
      const pageUrl = new URL("/", BASE_URL).href;
      await page.goto(pageUrl, { waitUntil: "networkidle" });
      await page.screenshot({ path: `screenshots/homepage-${locale}.png`, fullPage: FULL_PAGE });
    });
    test(`Reset password`, async ({page}) => {
      const pageUrl = new URL("/reset_password", BASE_URL).href;
      await page.goto(pageUrl, { waitUntil: "networkidle"});
      await page.screenshot({ path: `screenshots/reset-password-${locale}.png`, fullPage: FULL_PAGE });
    });
    test(`Legal terms`, async ({ page }) => {
      const pageUrl = new URL("/legal/terms", BASE_URL).href;
      await page.goto(pageUrl, { waitUntil: "networkidle" });
      await page.screenshot({ path: `screenshots/legal-terms-${locale}.png`, fullPage: FULL_PAGE });
    });
    test(`Legal privacy`, async ({ page }) => {
      const pageUrl = new URL("/legal/privacy", BASE_URL).href;
      await page.goto(pageUrl, { waitUntil: "networkidle" });
      await page.screenshot({ path: `screenshots/legal-privacy-${locale}.png`, fullPage: FULL_PAGE });
    });
  });
}
