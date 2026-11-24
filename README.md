# TaxiCard Vercel demo (Google Wallet)

A minimal Next.js app for one fictional driver. It has no database and no passenger accounts.

## Important before deployment

1. In Google Pay & Wallet Console, invite `taxicard-wallet-service@taxicard-tunisia.iam.gserviceaccount.com` as a **Developer** under **Users**.
2. In **Manage → Set up test accounts**, add `hamdichalbi28@gmail.com` if it is not already an Admin/Developer/test account.
3. Make sure the JSON key belongs to the same service account email above.
4. Keep the JSON key private. Never commit it to GitHub or send it in chat.

## Run locally

```bash
npm install
```

Create `.env.local` with:

```env
GOOGLE_WALLET_ISSUER_ID=BCR2DN6DWL3ZHHZX
GOOGLE_WALLET_SERVICE_ACCOUNT_JSON_BASE64=YOUR_BASE64_JSON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

PowerShell command to convert the downloaded JSON key to one base64 line:

```powershell
$key = Get-Content "C:\path\to\service-account-key.json" -Raw
$bytes = [System.Text.Encoding]::UTF8.GetBytes($key)
[Convert]::ToBase64String($bytes) | Set-Clipboard
```

Then run:

```bash
npm run dev
```

Open `http://localhost:3000/d/sami-demo` and tap **Add to Google Wallet**.

## Deploy to Vercel

1. Push this folder to a **private** GitHub repository.
2. Import the repository into Vercel.
3. In Vercel → Project → Settings → Environment Variables, add the three variables above.
4. Set `NEXT_PUBLIC_SITE_URL` to the actual deployed Vercel URL, e.g. `https://your-project.vercel.app`.
5. Redeploy after adding/changing environment variables.

The sample route currently contains a fixed demo profile and fixed class/object suffixes. It does not store driver data. Do not use it for real customer data as-is.

## Notes

- This generates a signed Save-to-Wallet JWT on the server. The private key is never sent to the browser.
- Google Demo Mode only allows Admin, Developer, and configured test accounts to save passes. Demo passes are marked `[TEST ONLY]` by Google.
- The class and object are supplied inline in the JWT for the initial test. For production, create and manage the class/object via the Wallet REST API and use stable, unique object IDs per driver.
- Set `NEXT_PUBLIC_SITE_URL` to your actual deployed URL; the app uses it for the pass barcode and profile link.
- This demo is Google Wallet only. Apple Wallet is not implemented.
