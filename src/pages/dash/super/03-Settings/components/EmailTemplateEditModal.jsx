import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

const EXAMPLE_BODY =
  '<p>Hi {{userName}},</p>\n<p>Welcome to our training platform.</p>';

export default function EmailTemplateEditModal({
  template,
  open,
  onClose,
  onSave,
  saving = false,
}) {
  const [form, setForm] = useState({
    enabled: true,
    subject: '',
    bodyHtml: '',
  });

  useEffect(() => {
    if (!template) return;
    setForm({
      enabled: template.enabled !== false,
      subject: template.subjectEn || template.subject?.en || '',
      bodyHtml: template.bodyHtmlEn || template.bodyHtml?.en || '',
    });
  }, [template]);

  const placeholders = useMemo(
    () => template?.placeholders || [],
    [template],
  );

  if (!open || !template) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      enabled: form.enabled,
      subject: form.subject.trim(),
      bodyHtml: form.bodyHtml.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{template.label}</h3>

          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, enabled: event.target.checked }))
              }
              className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
            />
            Active template
          </label>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, subject: event.target.value }))
              }
              placeholder="Welcome to the platform"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email body (HTML)
            </label>
            <textarea
              rows={7}
              value={form.bodyHtml}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, bodyHtml: event.target.value }))
              }
              placeholder={EXAMPLE_BODY}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 font-mono text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            <p className="mb-2 font-medium text-gray-800">How to write content</p>
            <p className="mb-2">
              Use simple HTML tags like <code className="rounded bg-white px-1">&lt;p&gt;</code>,{' '}
              <code className="rounded bg-white px-1">&lt;strong&gt;</code>,{' '}
              <code className="rounded bg-white px-1">&lt;a&gt;</code>.
            </p>
            <p className="mb-2">Example:</p>
            <pre className="overflow-x-auto rounded bg-white p-3 text-xs text-gray-800">
              {EXAMPLE_BODY}
            </pre>
            {placeholders.length > 0 ? (
              <p className="mt-3">
                Dynamic placeholders (keep exactly as shown):{' '}
                {placeholders.map((item) => (
                  <code key={item} className="mr-2 rounded bg-white px-1">{`{{${item}}}`}</code>
                ))}
              </p>
            ) : null}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 disabled:opacity-60"
            >
              {saving ? 'Translating & saving...' : 'Save template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
