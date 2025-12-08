interface HtmlContentProps {
  content: string | null;
  title?: string;
  description?: string;
  className?: string;
}

export function HtmlContentDisplay({ content, title, description, className = "" }: HtmlContentProps) {
  const sanitizedContent = content?.trim() || "<p>Tidak ada konten.</p>";

  return (
    <article className={`bg-white ${className} prose lg:prose-xl`} itemScope itemType="https://schema.org/Article">
      {title && (
        <h1 className="text-3xl font-bold mb-6 text-black" itemProp="headline">
          {title}
        </h1>
      )}

      <div
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        itemProp="articleBody"
        className="[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-black
                   [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:text-black
                   [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-black
                   [&_h4]:text-lg [&_h4]:font-bold [&_h4]:mt-8 [&_h4]:mb-4 [&_h4]:text-black
                   [&_h5]:text-base [&_h5]:font-bold [&_h5]:mt-6 [&_h5]:mb-3 [&_h5]:text-black
                   [&_h6]:text-sm [&_h6]:font-bold [&_h6]:mt-5 [&_h6]:mb-2 [&_h6]:text-black
                   [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-black [&_p]:text-justify
                   [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                   [&_strong]:font-bold
                   [&_ul]:list-disc [&_ul]:mb-4
                   [&_ol]:list-decimal [&_ol]:mb-4
                   [&_li]:text-base [&_li]:mb-2 [&_li]:text-black
                   [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4"
      />
    </article>
  );
}
