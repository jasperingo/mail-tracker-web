import { Link } from "@remix-run/react";

export const H2Component = ({ text, links }: { text: string; links?: { text: string; to: string; }[] }) => {
  return (
    <div className="bg-white flex gap-4 mb-4 flex-wrap py-4">
      <h2 className="text-2xl font-bold flex-grow">{ text }</h2>
      <ul className="flex gap-dimen-sm">
        {
          links?.map(item => (
            <li key={item.text}>
              <Link 
                to={item.to}
                className="inline-block text-white bg-orange-600 py-4 px-2 rounded-lg hover:bg-orange-400"
              >
                { item.text }
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
