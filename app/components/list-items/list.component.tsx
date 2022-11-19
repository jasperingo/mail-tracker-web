import { type ReactNode } from 'react';

export const ListComponent = <T,>(
  { items, emptyText, render }: 
  { items: T[], emptyText: string; render(item: T): ReactNode; }
) => {
  return (
    <ul className="">
      { 
        items.length > 0 ? items.map(render) : (
          <li className="w-full">
            <div className="border rounded-lg text-center p-4 font-bold">{ emptyText }</div>
          </li>
        )
      }
    </ul>
  );
}
