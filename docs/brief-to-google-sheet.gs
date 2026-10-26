/**
 * Receives project briefs from /api/brief and appends them to this Google Sheet.
 *
 * Setup (5 minutes):
 *  1. Create a Google Sheet (e.g. "Portfolio briefs"). Extensions → Apps Script. Paste this file.
 *  2. Project Settings → Script properties → add SECRET = <any long random string>.
 *  3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone. Deploy, authorise.
 *  4. Copy the Web app URL (ends in /exec). In Lovable/Cloudflare set the server env vars:
 *       BRIEF_WEBHOOK_URL    = that URL
 *       BRIEF_WEBHOOK_SECRET = the same SECRET as step 2
 *  5. Submit a test brief on the site — a row appears in the "Briefs" tab and you get an email.
 *  After editing this script, Deploy → Manage deployments → edit → New version (the URL stays the same).
 */
const SHEET = "Briefs";
const HEADERS = ["Received", "Name", "Company", "Email", "Type", "Budget", "Start", "Message", "Status"];
const NOTIFY = "rishu07.dev@gmail.com";

function doPost(e) {
  const out = (o) => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
  try {
    const d = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (secret && d.secret !== secret) return out({ ok: false, error: "forbidden" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
    if (sh.getLastRow() === 0) {
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
      sh.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }
    // Prefix "'" so a value starting with = + - @ is stored as text, never run as a formula.
    const safe = (v) => {
      const s = String(v == null ? "" : v);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };
    sh.appendRow([
      new Date(d.submittedAt || Date.now()),
      safe(d.name),
      safe(d.company),
      safe(d.email),
      safe(d.type),
      safe(d.budget),
      safe(d.timeline),
      safe(d.msg),
      "New",
    ]);

    MailApp.sendEmail({
      to: NOTIFY,
      replyTo: d.email,
      subject: "New brief — " + (d.type || "New project") + " — " + (d.company || d.name),
      body: [
        "Name: " + d.name,
        "Company: " + (d.company || "-"),
        "Email: " + d.email,
        "Need: " + (d.type || "-"),
        "Budget: " + (d.budget || "-"),
        "Start: " + (d.timeline || "-"),
        "",
        d.msg || "",
        "",
        ss.getUrl(),
      ].join("\n"),
    });
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}
