# Diego LMS — Third-Party Integrations Setup Guide

**Document version:** 1.0  
**Project:** Diego LMS (Backend: `lms` · Frontend: `diego-frontend`)  
**Audience:** Client IT team, DevOps, and developers taking over after delivery  
**Purpose:** Step-by-step setup for Stripe, PayPal, Google Pay, Apple Pay, Twilio SMS, SMTP email, and Google Translate API

---

## ⚠️ Security notice (read first)

1. **Never commit real secrets** to Git (`.env`, API keys, passwords).
2. During development you may use **personal/test accounts**. Before production handoff, **replace every credential with the client’s own accounts**.
3. If any secret was ever shared in chat, email, or committed to a repo, **rotate it immediately** (revoke old key, create new key).
4. This document uses **placeholders only** (`your_..._here`). Do not paste production secrets into tickets or documentation.

---

## Table of contents

1. [Architecture overview](#1-architecture-overview)
2. [Handoff: personal account → client account](#2-handoff-personal-account--client-account)
3. [Environment variables reference](#3-environment-variables-reference)
4. [Stripe (cards + Payment Intents)](#4-stripe-cards--payment-intents)
5. [Google Pay & Apple Pay (via Stripe)](#5-google-pay--apple-pay-via-stripe)
6. [PayPal](#6-paypal)
7. [Twilio SMS](#7-twilio-sms)
8. [SMTP email (Gmail / custom domain)](#8-smtp-email-gmail--custom-domain)
9. [Google Cloud Translation API](#9-google-cloud-translation-api)
10. [Admin UI toggles (Super Admin)](#10-admin-ui-toggles-super-admin)
11. [Production deployment checklist](#11-production-deployment-checklist)
12. [Troubleshooting](#12-troubleshooting)
13. [Delivery package for client](#13-delivery-package-for-client)

---

## 1. Architecture overview

```
┌─────────────────────┐         ┌─────────────────────┐
│   diego-frontend    │  HTTPS  │        lms          │
│   (React + Vite)    │ ──────► │   (Node + Express)  │
│                     │         │                     │
│  Stripe.js (card,   │         │  Stripe SDK         │
│  Google/Apple Pay)  │         │  PayPal REST        │
│  PayPal JS SDK      │         │  Twilio SDK         │
│  RTK Query API      │         │  Nodemailer (SMTP)  │
└─────────────────────┘         │  Google Translate   │
                                └─────────────────────┘
```

| Integration | Where configured | Where used in app |
|-------------|------------------|-------------------|
| **Stripe** | Backend `.env` + Frontend `VITE_STRIPE_PUBLISHABLE_KEY` | Course checkout, archive purchase, license renewal |
| **Google Pay / Apple Pay** | Enabled in Stripe Dashboard + platform settings | Checkout via Stripe `ExpressCheckoutElement` |
| **PayPal** | Backend + Frontend client ID | Public course checkout (not company B2B checkout) |
| **Twilio SMS** | Backend `.env` only | Reminders, course assigned, test SMS in Admin Settings |
| **SMTP** | Backend `.env` only | Registration, notifications, transactional email |
| **Google Translate** | Backend `.env` only | Course/content i18n auto-translation |

**Key backend files:**
- `lms/src/config/config.js` — loads env
- `lms/src/config/env.validation.js` — validates env on startup
- `lms/src/features/payment/payment.service.js` — Stripe & PayPal
- `lms/src/shared/services/sms/sms.service.js` — Twilio
- `lms/src/shared/services/emails/emailService.js` — SMTP
- `lms/src/shared/services/translate/translate.service.js` — Google Translate

**Key frontend files:**
- `diego-frontend/src/config/env.config.js` — `VITE_*` keys
- `diego-frontend/src/components/payment/CheckoutStripeForm.jsx` — card + wallets
- `diego-frontend/src/components/payment/CheckoutPayPalForm.jsx` — PayPal
- `diego-frontend/src/pages/dash/super/03-Settings/components/FinancialSettings.jsx` — enable/disable gateways
- `diego-frontend/src/pages/dash/super/03-Settings/components/ApiSettings.jsx` — SMS test UI

---

## 2. Handoff: personal account → client account

Use this checklist when moving from **your personal/test credentials** to **client production accounts**.

### Phase A — Before delivery (developer)

- [ ] Remove all real secrets from `.env.example` (use placeholders only)
- [ ] Document which services are integrated (this file)
- [ ] Confirm all features work in **staging** with test keys
- [ ] List every external account the client must create

### Phase B — Client creates accounts

| Service | Client action |
|---------|---------------|
| Stripe | Business account, verify business, enable payment methods |
| PayPal | Business account, create REST app (Live) |
| Twilio | Business account, buy phone number, enable geo permissions |
| Google Cloud | Project + billing + Translation API + API key restrictions |
| Email | Client domain DNS (SPF/DKIM) or Google Workspace / SendGrid |

### Phase C — Client provides credentials to DevOps

Deliver secrets via **password manager** or **secure vault** — not email/Slack in plain text.

### Phase D — DevOps updates server env

- [ ] Backend `lms/.env` on production server
- [ ] Frontend build-time `diego-frontend/.env` (or CI secrets)
- [ ] Restart backend + rebuild/redeploy frontend
- [ ] Configure Stripe webhook URL on production domain
- [ ] Upload Apple Pay domain association file (see §5)
- [ ] Run smoke tests (§11)

### Phase E — Revoke developer personal keys

- [ ] Rotate Stripe test keys if they were shared
- [ ] Revoke Twilio auth token used during dev
- [ ] Revoke Google API keys used during dev
- [ ] Remove developer Gmail app password from SMTP

---

## 3. Environment variables reference

### 3.1 Backend (`lms/.env`)

```env
# ─── Stripe ───
STRIPE_SECRET_KEY=sk_live_or_sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_live_or_pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret

# ─── PayPal ───
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox
# Production: PAYPAL_MODE=live

# ─── Twilio SMS ───
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX
# Optional (not required for basic SMS):
# TWILIO_API_KEY=SKxxxxxxxx
# TWILIO_API_SECRET=your_api_secret

# ─── SMTP (example: Gmail) ───
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-sending-account@gmail.com
SMTP_PASS=your_gmail_app_password_no_spaces
SMTP_FROM=noreply@client-domain.com

# ─── Google Translate ───
GOOGLE_TRANSLATE_API_KEY=your_google_cloud_api_key

# ─── App URLs (required for payment redirects & CORS) ───
CLIENT_URLS=https://your-frontend-domain.com,http://localhost:5173
API_URL=https://your-api-domain.com
```

### 3.2 Frontend (`diego-frontend/.env`)

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_or_pk_test_your_publishable_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

> **Note:** Frontend keys are embedded at **build time**. Changing them requires a **new frontend build/deploy**.

---

## 4. Stripe (cards + Payment Intents)

### 4.1 What Stripe does in this project

- **Card payments** on checkout (Stripe Elements)
- **Payment Intents** created by backend; frontend confirms payment
- **Webhooks** verify payment success server-side
- **Google Pay & Apple Pay** use the same Payment Intent (via Stripe — see §5)

### 4.2 Create Stripe account (client)

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Complete business verification (required for **live** payments)
3. Dashboard → **Developers → API keys**
   - Copy **Publishable key** → `STRIPE_PUBLISHABLE_KEY` (backend) + `VITE_STRIPE_PUBLISHABLE_KEY` (frontend)
   - Copy **Secret key** → `STRIPE_SECRET_KEY` (backend only)

### 4.3 Enable payment methods in Stripe

Dashboard → **Settings → Payment methods**

Enable:
- Cards
- Google Pay (if available in your region)
- Apple Pay (requires domain verification — §5)

### 4.4 Webhooks (mandatory for production)

1. Dashboard → **Developers → Webhooks → Add endpoint**
2. **Endpoint URL:** `https://your-api-domain.com/api/v1/payments/webhook/stripe`
3. Events to listen for (minimum):
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed` (if using Checkout Sessions anywhere)
4. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

**Local testing:** use Stripe CLI:
```bash
stripe listen --forward-to localhost:5000/api/v1/payments/webhook/stripe
```

### 4.5 Test vs Live mode

| Mode | Key prefix | Use case |
|------|------------|----------|
| Test | `pk_test_`, `sk_test_` | Development, QA |
| Live | `pk_live_`, `sk_live_` | Production only |

**Test card:** `4242 4242 4242 4242` · any future expiry · any CVC

### 4.6 Backend implementation notes

- Payment intents use `automatic_payment_methods: { enabled: true }` so wallets work
- File: `lms/src/features/payment/payment.service.js`
- Platform can disable Stripe: Super Admin → Settings → Financial → Stripe toggle

### 4.7 Verification steps

1. Start backend + frontend with test keys
2. Open course checkout → pay with test card
3. Confirm enrollment / success redirect
4. Check Stripe Dashboard → Payments → succeeded
5. Check webhook delivery logs (no 4xx/5xx)

---

## 5. Google Pay & Apple Pay (via Stripe)

> **Important:** Google Pay and Apple Pay in this project are **not separate merchant accounts**. They run through **Stripe Payment Intents** + Stripe.js `ExpressCheckoutElement`.

### 5.1 Prerequisites

- Stripe account with Google Pay / Apple Pay enabled (§4.3)
- `STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY` configured
- Super Admin → Financial Settings → **Google Pay** and **Apple Pay** toggles ON
- Frontend checkout shows: Google Pay, Apple Pay, Stripe (card), PayPal (if enabled)

### 5.2 Google Pay setup

1. Stripe Dashboard → enable **Google Pay**
2. Use **HTTPS** (or `localhost` for dev)
3. **Browser requirements:**
   - Chrome (desktop/Android) with a saved Google Pay card
4. User selects **Google Pay** in checkout → Stripe wallet button appears → confirm payment

**Common issue:** Button does not appear → wrong browser, no saved card, or ad-blockers blocking Stripe.js

### 5.3 Apple Pay setup

1. Stripe Dashboard → **Settings → Payment methods → Apple Pay → Add domain**
2. Enter production domain, e.g. `diego.clientdomain.com`
3. Download domain association file
4. Place file on frontend static host:

```
diego-frontend/public/.well-known/apple-developer-merchantid-domain-association
```

5. Deploy frontend — file must be reachable at:

```
https://your-frontend-domain.com/.well-known/apple-developer-merchantid-domain-association
```

6. Return to Stripe → **Verify domain**

**Browser requirements:**
- Safari on iPhone, iPad, or Mac
- Card saved in Apple Wallet
- Apple Pay will **not** show in Chrome on Windows (expected)

See also: `diego-frontend/public/.well-known/README-APPLE-PAY.txt`

### 5.4 Platform toggles (database)

Settings stored in platform settings table:
- `applePayEnabled` (default: true)
- `googlePayEnabled` (default: true)
- `stripeEnabled` (default: true)

Managed via: **Super Admin → Settings → Financial**

### 5.5 Verification steps

1. Test card flow first (§4.7)
2. Select Google Pay → wallet button visible in Chrome → complete payment
3. Select Apple Pay → test on Safari + Apple device after domain verification
4. Confirm same backend verify endpoint runs as card payments

---

## 6. PayPal

### 6.1 What PayPal does in this project

- Alternative checkout on **public course purchase** (single-user plan)
- **Not** used for company B2B checkout in current UI
- Flow: create order (backend) → PayPal popup → capture (backend)

### 6.2 Create PayPal developer app

1. [https://developer.paypal.com/dashboard/](https://developer.paypal.com/dashboard/)
2. **Apps & Credentials**
3. Create app → copy **Client ID** and **Secret**

| Environment | `PAYPAL_MODE` | Credentials |
|-------------|---------------|-------------|
| Sandbox (testing) | `sandbox` | Sandbox Client ID + Secret |
| Production | `live` | Live Client ID + Secret |

### 6.3 Environment variables

**Backend (`lms/.env`):**
```env
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_MODE=sandbox
```

**Frontend (`diego-frontend/.env`):**
```env
VITE_PAYPAL_CLIENT_ID=your_client_id
```

> Only **Client ID** goes to frontend. **Secret stays on backend only.**

### 6.4 Enable in admin UI

Super Admin → Settings → Financial → **PayPal** toggle ON

### 6.5 Verification steps

1. Set `PAYPAL_MODE=sandbox`
2. Checkout → select PayPal → log in with **sandbox buyer** account
3. Complete payment → course enrollment confirmed
4. For production: switch to `live` keys + live PayPal business account

---

## 7. Twilio SMS

### 7.1 What SMS does in this project

- Enrollment reminders
- Course assigned notifications
- Inactive user reminders
- **Test SMS** from Super Admin → Settings → API & Integrazioni

**Core service:** `lms/src/shared/services/sms/sms.service.js`

### 7.2 Create Twilio account (client)

1. [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Console → copy **Account SID** and **Auth Token**
3. **Phone Numbers → Buy a number** → this is your **FROM** number
4. Set in env:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX
```

### 7.3 Critical rules

| Variable | Meaning | Example |
|----------|---------|---------|
| `TWILIO_PHONE_NUMBER` | Twilio **Active** number (sender) | `+14322373374` |
| Test SMS "To" field | Recipient phone (user’s mobile) | `+8801XXXXXXXXX` |

**Never** put the user’s personal mobile in `TWILIO_PHONE_NUMBER`.

### 7.4 Trial account limitations

- Can only send to **Verified Caller IDs**
- Console → Phone Numbers → **Verified Caller IDs** → add test numbers
- US trial numbers often **block international SMS** (e.g. Bangladesh, Italy)
- Fix: upgrade account OR enable **Messaging → Geo permissions** for target countries

### 7.5 Phone number format

Backend normalizes numbers to E.164:
- `018XXXXXXXX` → `+88018XXXXXXXX`
- Supports Bangla digits
- Fixes common mistake `+8800...` → `+8801...`

### 7.6 Test API

```http
POST /api/v1/platform-settings/sms/test
Authorization: Bearer {platform_admin_token}
Content-Type: application/json

{
  "to": "+8801XXXXXXXXX"
}
```

### 7.7 Common Twilio errors

| Code | Meaning | Fix |
|------|---------|-----|
| 21211 | Invalid phone | Use E.164 `+country...` |
| 21608 | Unverified number (trial) | Verify recipient in Twilio console |
| 21408 | Country not enabled | Geo permissions or upgrade account |
| From = To | Same sender/recipient | Fix `TWILIO_PHONE_NUMBER` |

### 7.8 Verification steps

1. Set env vars → restart backend
2. Super Admin → API Settings → enter verified mobile → **Test SMS**
3. Confirm SMS received
4. Trigger a real notification (e.g. course assign) and check logs

---

## 8. SMTP email (Gmail / custom domain)

### 8.1 What SMTP does in this project

- User registration / OTP emails
- Password reset
- Course & notification emails

**Service:** `lms/src/shared/services/emails/emailService.js`

### 8.2 Option A — Gmail (development / small volume)

**Not recommended for high-volume production** (daily sending limits, deliverability).

1. Google Account → **Security → 2-Step Verification** (enable)
2. **App passwords** → create app password for "Mail"
3. Copy 16-character password **without spaces**

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-account@gmail.com
SMTP_PASS=your16charapppassword
SMTP_FROM=noreply@yourdomain.com
```

**Notes:**
- `SMTP_PASS` must have **no spaces** (remove spaces from Gmail display)
- `SMTP_FROM` should ideally match a domain you control; Gmail may rewrite From if misconfigured
- For production with custom domain, prefer **Option B**

### 8.3 Option B — Client domain (recommended for production)

Use one of:
- **Google Workspace** (SMTP with client domain)
- **SendGrid / Mailgun / Amazon SES**
- Client IT configures **SPF, DKIM, DMARC** DNS records

Example SendGrid (if you add SendGrid support later):
```env
SENDGRID_API_KEY=SG.xxxx
SENDGRID_SENDER=noreply@clientdomain.com
```

Current project primarily uses **SMTP_* variables**.

### 8.4 Production requirement

`env.validation.js` requires email config in production:
- Either SMTP (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`)
- Or SendGrid (`SENDGRID_API_KEY`, `SENDGRID_SENDER`)

### 8.5 Verification steps

1. Configure env → restart backend
2. Trigger registration or password reset
3. Check inbox + spam folder
4. If fail: check logs for SMTP auth errors

---

## 9. Google Cloud Translation API

### 9.1 What it does in this project

- Auto-translates course/content fields (i18n JSON: `it`, `en`, `fr`, `zh`)
- Used when creating/updating multilingual content

**Service:** `lms/src/shared/services/translate/translate.service.js`

### 9.2 Create API key (client Google Cloud project)

1. [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Create project (or use existing)
3. **Billing** must be enabled
4. **APIs & Services → Library** → enable **Cloud Translation API**
5. **APIs & Services → Credentials → Create credentials → API key**
6. **Restrict key** (strongly recommended):
   - Application restrictions: IP addresses (production server IP)
   - API restrictions: Cloud Translation API only

```env
GOOGLE_TRANSLATE_API_KEY=AIzaSy...your_key
```

### 9.3 Cost awareness

Translation API is **paid per character**. Set billing alerts in Google Cloud.

### 9.4 Verification steps

1. Set key in backend `.env`
2. Create/edit course with Italian text → confirm English (or other locale) auto-fills
3. If key missing: logs show `GOOGLE_TRANSLATE_API_KEY not set — skipping translation`

---

## 10. Admin UI toggles (Super Admin)

Path: **Dashboard → Super Admin → Settings**

| Tab | Controls |
|-----|----------|
| **Financial** | Enable/disable Stripe, PayPal, Apple Pay, Google Pay |
| **API & Integrazioni** | Twilio SMS test, integration status |

These toggles read/write **platform settings** in the database. Env vars must still be set — toggles only control visibility/behavior in the app.

---

## 11. Production deployment checklist

### Backend (`lms`)

- [ ] All production env vars set on server (§3.1)
- [ ] `NODE_ENV=production`
- [ ] `CLIENT_URLS` includes production frontend URL
- [ ] Stripe **live** keys + webhook endpoint on production API URL
- [ ] PayPal `PAYPAL_MODE=live` + live credentials
- [ ] Twilio production number + geo permissions for target countries
- [ ] SMTP or SendGrid configured with client domain
- [ ] Google Translate API key restricted by IP
- [ ] PM2/systemd restart after env change

### Frontend (`diego-frontend`)

- [ ] `VITE_API_BASE_URL` points to production API
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` = live publishable key
- [ ] `VITE_PAYPAL_CLIENT_ID` = live client ID
- [ ] Apple Pay domain file deployed (§5.3)
- [ ] Fresh production build: `npm run build`
- [ ] Deploy `dist/` to CDN/hosting

### Smoke tests (production)

- [ ] Card payment (small real charge, then refund if needed)
- [ ] PayPal live payment
- [ ] Google Pay (supported device/browser)
- [ ] Apple Pay (Safari + verified domain)
- [ ] Test SMS to real number
- [ ] Registration email received
- [ ] Course translation works

---

## 12. Troubleshooting

### Payments

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| Stripe form blank | Missing/wrong publishable key | Check `VITE_STRIPE_PUBLISHABLE_KEY`, rebuild frontend |
| Payment succeeds but no enrollment | Webhook not configured | Fix webhook URL + secret |
| PayPal button missing | Toggle off or missing client ID | Financial settings + `VITE_PAYPAL_CLIENT_ID` |
| Google Pay no button | Wrong browser / no saved card | Use Chrome + Google Pay card |
| Apple Pay no button | Domain not verified | §5.3 domain association file |

### SMS

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| 21608 error | Trial + unverified number | Verify in Twilio console |
| 21408 error | Country blocked | Geo permissions / upgrade |
| From = To error | Wrong `TWILIO_PHONE_NUMBER` | Use Twilio number as FROM |

### Email

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| Authentication failed | Wrong app password | Regenerate Gmail app password, no spaces |
| Emails in spam | No SPF/DKIM | Client DNS setup |

### Translation

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| No translation | Missing API key | Set `GOOGLE_TRANSLATE_API_KEY` |
| 403 from Google | Key restrictions | Allow server IP or Translation API |

---

## 13. Delivery package for client

Include in handoff:

1. **This document** (PDF or Markdown)
2. **`.env.example`** files (placeholders only):
   - `lms/.env.example`
   - `diego-frontend/.env.example`
3. **Account creation checklist** (§2 Phase B)
4. **List of URLs to whitelist/configure:**
   - Stripe webhook: `https://{api}/api/v1/payments/webhook/stripe`
   - Apple Pay domain: `https://{frontend}/.well-known/apple-developer-merchantid-domain-association`
5. **Support contacts** for each provider’s dashboard
6. **Confirmation** that developer personal keys were rotated/revoked

### Minimum credentials client must provide

| # | Service | What client sends (secure channel) |
|---|---------|-----------------------------------|
| 1 | Stripe | Secret key, Publishable key, Webhook secret |
| 2 | PayPal | Live Client ID + Secret |
| 3 | Twilio | Account SID, Auth Token, Phone number |
| 4 | SMTP | Host, port, user, app password, from address |
| 5 | Google Cloud | Translation API key (IP-restricted) |
| 6 | Domains | Production frontend + API URLs |

---

## Quick reference — file locations

```
lms/
  .env                          ← all backend secrets
  src/config/config.js
  src/config/env.validation.js
  src/features/payment/payment.service.js
  src/shared/services/sms/sms.service.js
  src/shared/services/emails/emailService.js
  src/shared/services/translate/translate.service.js
  src/features/platformSetting/platformSetting.service.js

diego-frontend/
  .env                          ← VITE_* build-time vars
  src/config/env.config.js
  src/components/payment/CheckoutStripeForm.jsx
  src/components/payment/CheckoutPayPalForm.jsx
  src/components/payment/CheckoutPaymentMethodPicker.jsx
  public/.well-known/           ← Apple Pay domain file
  docs/CLIENT_THIRD_PARTY_INTEGRATIONS_GUIDE.md  ← this file
```

---

**End of document**

*For internal use during Diego LMS project delivery. Update version number when integrations change.*
