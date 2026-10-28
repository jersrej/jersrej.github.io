/**
 * Personalized links: `?for=acme` (or `?for=jane-doe`) greets that name in the
 * hero, so each application can carry its own link. Limited to letters,
 * digits and a little punctuation, and all-lowercase input is title-cased.
 */
const clean = (raw: string) =>
  raw
    .replace(/[-_+]+/g, ' ')
    .replace(/[^\p{L}\p{N} .&']/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);

const titleCase = (text: string) => text.replace(/(^|\s)\p{L}/gu, (c) => c.toUpperCase());

const name = clean(new URLSearchParams(window.location.search).get('for') ?? '');

export const greetingName = name === name.toLowerCase() ? titleCase(name) : name;
