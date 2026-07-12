import { useEffect, useState } from 'react'
import { profile, type GalleryItem } from '../data/profile'
import { IconClose } from '../components/Icons'
import { PageHeader } from '../components/PageHeader'
import { useInView } from '../hooks/useInView'

function resolveImage(src: string) {
  return src.startsWith('http') ? src : `${import.meta.env.BASE_URL}${encodeURI(src.replace(/^\//, ''))}`
}

function GalleryTile({
  index,
  item,
  onOpen,
}: {
  index: number
  item: GalleryItem
  onOpen: (index: number) => void
}) {
  const { ref, inView } = useInView<HTMLElement>()
  const [broken, setBroken] = useState(false)

  return (
    <figure
      ref={ref}
      className={`gallery-tile reveal ${inView ? 'in-view' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {!broken ? (
        <button
          type="button"
          className="gallery-tile-button"
          onClick={() => onOpen(index)}
          aria-label={`View full photo: ${item.caption}`}
        >
          <img src={resolveImage(item.src)} alt={item.caption} loading="lazy" onError={() => setBroken(true)} />
        </button>
      ) : (
        <div className="gallery-placeholder" aria-hidden="true" />
      )}
      <figcaption>{item.caption}</figcaption>
    </figure>
  )
}

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openItem = openIndex !== null ? profile.gallery[openIndex] : null

  useEffect(() => {
    if (!openItem) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openItem])

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Field & Lab Life"
        lead="Fieldwork, conferences, and moments from the research group."
      />
      <section className="section">
        <div className="gallery-grid">
          {profile.gallery.map((item, i) => (
            <GalleryTile key={item.src} index={i} item={item} onOpen={setOpenIndex} />
          ))}
        </div>
      </section>
      {openItem && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setOpenIndex(null)}>
          <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setOpenIndex(null)}>
            <IconClose />
          </button>
          <figure className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={resolveImage(openItem.src)} alt={openItem.caption} />
            <figcaption>{openItem.caption}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
