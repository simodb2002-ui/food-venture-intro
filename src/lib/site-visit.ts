// Tracks whether this browser session has already loaded any page of the
// site, so a page-specific intro (e.g. the FIS page's logo animation) can
// tell "first time on the site" apart from "first time on this page."
//
// Every nav link is a plain <a>, so moving between pages is a full reload —
// each page load re-evaluates this module exactly once, which is what makes
// a single read-then-write of sessionStorage here enough: no React effect
// ordering to worry about, since this runs before any component mounts.
const SITE_VISITED_KEY = "fis-site-visited";

function computeIsReturningSiteVisit(): boolean {
  if (typeof window === "undefined") return false;
  const alreadyVisited = window.sessionStorage.getItem(SITE_VISITED_KEY) === "1";
  window.sessionStorage.setItem(SITE_VISITED_KEY, "1");
  return alreadyVisited;
}

export const isReturningSiteVisit = computeIsReturningSiteVisit();
