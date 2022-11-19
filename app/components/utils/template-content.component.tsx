export const TemplateContentComponent = ({ content }: { content: string; }) => {
  return (
    <div className="shadow p-4 rounded-lg mb-8" dangerouslySetInnerHTML={{__html: content }}></div>
  );
}
