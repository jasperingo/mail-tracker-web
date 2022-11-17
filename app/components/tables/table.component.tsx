import { type ReactNode } from 'react';

export const TableComponent = <T,>(
  { caption, items, headings, emptyText, render }: 
  { caption?: string; headings: string[]; items: T[], emptyText: string; render(item: T): ReactNode; }
) => {

  return (
    <div className="bg-white overflow-auto rounded-lg p-4 shadow shadow-orange-400">
      <table className="w-full">
        <caption className="font-bold mb-2">
          {
            caption
          }
        </caption>
        <thead>
          <tr>
            {
              headings.map((headItem) => (
                <th
                  key={headItem}
                  className="text-left p-2"
                >
                  { headItem }
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          { 
            items.length > 0 ? items.map(render) : (
              <tr>
                <td colSpan={headings.length} className="text-center p-4 font-bold">{ emptyText }</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
