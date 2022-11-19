import { type ReactNode } from 'react';

export const DualListComponent = <T,>(
  { items, emptyText, render }: 
  { items: T[], emptyText: string; render(item: T): ReactNode; }
) => {
  return (
    <ul className="lg:flex lg:flex-wrap lg:gap-x-8">
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
