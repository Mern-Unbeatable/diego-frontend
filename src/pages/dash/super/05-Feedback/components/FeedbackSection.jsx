import React, { useMemo, useState } from 'react';
import { Star, StarHalf, Trash2, CheckCircle2 } from 'lucide-react';

/* ---------- small UI helpers ---------- */

function Rating({ value = 0 }) {
  // 4.5 -> [★,★,★,★,☆] with a half in the right spot
  const stars = useMemo(() => {
    const full = Math.floor(value);
    const hasHalf = value - full >= 0.5;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < full) return 'full';
      if (i === full && hasHalf) return 'half';
      return 'empty';
    });
  }, [value]);

  return (
    <div className="flex items-center gap-1 text-amber-500">
      {stars.map((t, i) =>
        t === 'full' ? (
          <Star key={i} className="h-4 w-4 fill-current" />
        ) : t === 'half' ? (
          <StarHalf key={i} className="h-4 w-4 fill-current" />
        ) : (
          <Star key={i} className="h-4 w-4" />
        ),
      )}
      <span className="ml-2 text-xs font-medium text-gray-600">
        {value.toFixed(1)}/5
      </span>
    </div>
  );
}

/* ---------- demo data so it renders immediately ---------- */
const demoData = [
  {
    id: '1',
    name: 'Diego',
    rating: 4.5,
    message:
      'Grazie a questa piattaforma ho finalmente trovato un modo semplice e flessibile per studiare. Posso seguire le lezioni quando voglio e ripassare i contenuti tutte le volte che mi serve.',
    published: false,
  },
  {
    id: '2',
    name: 'Diego',
    rating: 4.5,
    message:
      'I corsi sono molto pratici e aggiornati. Mi hanno aiutato a crescere professionalmente e ad affrontare nuove sfide sul lavoro.',
    published: false,
  },
  {
    id: '3',
    name: 'Diego',
    rating: 4.5,
    message:
      'Una piattaforma intuitiva e completa. La qualità dei contenuti è altissima e la possibilità di ottenere certificazioni riconosciute è un vero valore aggiunto.',
    published: false,
  },
  {
    id: '4',
    name: 'Diego',
    rating: 4.5,
    message:
      'Ho apprezzato tantissimo il supporto costante dei tutor. Non mi sono mai sentita sola durante il percorso formativo.',
    published: false,
  },
];

/**
 * Customer feedback list (admin view)
 * - Renders cards with avatar, name, rating, comment
 * - Actions: Pubblica (publish) / Cancella (delete)
 *
 * Props:
 *  - items: [{ id, name, avatar, rating (0-5, .5 ok), message, published }]
 *  - onPublish(id)
 *  - onDelete(id)
 */
export default function FeedbackSection({
  items: initialItems,
  onPublish = (id) => console.log('publish', id),
  onDelete = (id) => console.log('delete', id),
}) {
  // local UI state (optional) so it works out of the box
  const [items, setItems] = useState(
    initialItems ?? demoData, // use demo when not provided
  );

  const handlePublish = (id) => {
    setItems((s) =>
      s.map((i) => (i.id === id ? { ...i, published: true } : i)),
    );
    onPublish(id);
  };

  const handleDelete = (id) => {
    setItems((s) => s.filter((i) => i.id !== id));
    onDelete(id);
  };

  return (
    <div className="m-4 space-y-6 md:m-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        Feedback del cliente
      </h1>

      {items.map((fb) => (
        <div
          key={fb.id}
          className="rounded-xl bg-emerald-50/40 px-4 py-4 ring-1 ring-emerald-100 md:px-6 md:py-5"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {/* Left: avatar, name, rating, message */}
            <div className="flex flex-1 gap-3">
              <img
                src={
                  fb.avatar ||
                  `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(fb.name)}`
                }
                alt={fb.name}
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200"
              />
              <div className="space-y-1">
                <p className="font-semibold text-gray-900">Ciao, {fb.name}!</p>
                <Rating value={fb.rating} />

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-700">
                  {fb.message}
                </p>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3 md:pl-6">
              {!fb.published ? (
                <button
                  onClick={() => handlePublish(fb.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Pubblica
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Pubblicato
                </span>
              )}

              <button
                onClick={() => handleDelete(fb.id)}
                className="inline-flex items-center gap-2 rounded-full border border-rose-300 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
                Cancella
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
