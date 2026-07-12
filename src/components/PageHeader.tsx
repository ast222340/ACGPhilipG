export function PageHeader({
  eyebrow,
  title,
  lead,
  image,
}: {
  eyebrow: string
  title: string
  lead: string
  image?: string
}) {
  return (
    <section className={`page-hero ${image ? 'has-image' : ''}`}>
      {image && (
        <>
          <img className="page-hero-bg" src={image} alt="" aria-hidden="true" />
          <div className="page-hero-scrim" aria-hidden="true" />
        </>
      )}
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-lead">{lead}</p>
    </section>
  )
}
