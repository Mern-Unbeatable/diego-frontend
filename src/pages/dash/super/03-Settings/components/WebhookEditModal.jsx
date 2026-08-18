import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export default function WebhookEditModal({
  webhook,
  open,
  onClose,
  onSave,
  saving = false,
}) {
  const [form, setForm] = useState({
    enabled: true,
    url: '',
  });

  useEffect(() => {
    if (!webhook) return;
    setForm({
      enabled: webhook.enabled !== false,
      url: webhook.url || '',
    });
  }, [webhook]);

  if (!open || !webhook) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      enabled: form.enabled,
      url: form.url.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{webhook.name}</h3>
            <p className="text-sm text-gray-500">Configure outbound webhook endpoint</p>
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
            Active
          </label>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Endpoint URL
            </label>
            <input
              type="url"
              value={form.url}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, url: event.target.value }))
              }
              placeholder="https://example.com/webhooks/user-registration"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
            <p className="mt-2 text-xs text-gray-500">
              Event: <code className="rounded bg-gray-100 px-1">{webhook.event}</code>
            </p>
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
              {saving ? 'Saving...' : 'Save webhook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
