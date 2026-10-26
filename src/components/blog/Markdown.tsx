import type { ReactNode } from "react";

// Minimal Markdown for our own posts (see content/posts.ts). Builds React nodes — no innerHTML.

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = m.index;
    if (m[1]) out.push(<strong key={k}>{inline(m[1])}</strong>);
    else if (m[2]) out.push(<em key={k}>{inline(m[2])}</em>);
    else if (m[3]) out.push(<code key={k}>{m[3]}</code>);
    else
      out.push(
        <a
          key={k}
          href={m[5]}
          {...(m[5].startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
        >
          {inline(m[4])}
        </a>,
      );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n\s*\n/);
  return (
    <>
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        if (b.startsWith("### ")) return <h3 key={i}>{inline(b.slice(4))}</h3>;
        if (b.startsWith("## ")) return <h2 key={i}>{inline(b.slice(3))}</h2>;
        if (b.startsWith("> "))
          return (
            <blockquote key={i}>
              {inline(lines.map((l) => l.replace(/^> ?/, "")).join(" "))}
            </blockquote>
          );
        if (b.startsWith("|")) {
          const [head, , ...rows] = lines;
          return (
            <div key={i} className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    {cells(head).map((c, j) => (
                      <th key={j}>{inline(c)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, j) => (
                    <tr key={j}>
                      {cells(r).map((c, x) =>
                        x === 0 ? (
                          <th key={x} scope="row">
                            {inline(c)}
                          </th>
                        ) : (
                          <td key={x}>{inline(c)}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        if (/^- /.test(b))
          return (
            <ul key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        if (/^\d+\. /.test(b))
          return (
            <ol key={i}>
              {lines.map((l, j) => (
                <li key={j}>{inline(l.replace(/^\d+\. /, ""))}</li>
              ))}
            </ol>
          );
        return <p key={i}>{inline(lines.join(" "))}</p>;
      })}
    </>
  );
}
