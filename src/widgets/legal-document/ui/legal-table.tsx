type LegalTableProps = {
  caption: string;
  headers: readonly string[];
  rows: readonly (readonly string[])[];
};

/** 문서 안의 표. 모바일 폭에서 넘치면 표만 가로 스크롤함 */
export default function LegalTable({ caption, headers, rows }: LegalTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-120 border-collapse text-left text-xxs">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-primary-100">
            {headers.map((header) => (
              <th key={header} scope="col" className="border border-border p-2 font-normal">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")}>
              {row.map((cell, index) => (
                <td
                  key={`${headers[index]}-${cell}`}
                  className="border border-border p-2 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
