import QRCode from 'qrcode';

export const dynamic = 'force-dynamic';

export default async function SamiDemoPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const profileUrl = `${baseUrl.replace(/\/$/, '')}/d/sami-demo`;
  const qrDataUrl = await QRCode.toDataURL(profileUrl, { width: 360, margin: 2, errorCorrectionLevel: 'H' });

  return (
    <main className="page">
      <section className="card">
        <header className="hero">
          <div className="brand">TAXICARD TUNISIA</div>
          <div className="driver">
            <div className="avatar">SY</div>
            <div>
              <h1>Sami Ben Youssef</h1>
              <div className="sub">Independent taxi driver · Tunis</div>
            </div>
          </div>
        </header>
        <div className="content">
          <div className="demo">DEMO PROFILE — FICTIONAL DRIVER DATA</div>
          <div className="detail"><span>Phone</span><strong>+216 20 000 001</strong></div>
          <div className="detail"><span>Taxi reference</span><strong>TAXI-2048</strong></div>
          <div className="detail"><span>Service area</span><strong>Tunis</strong></div>
          <a className="button google" href="/api/wallet/google" rel="nofollow">Add to Google Wallet</a>
          <a className="button secondary" href="https://wa.me/21620000001?text=Bonjour%20Sami%2C%20je%20souhaite%20preparer%20un%20trajet%20avec%20vous." target="_blank" rel="noreferrer">Contact via WhatsApp</a>
          <img className="qr" src={qrDataUrl} alt="TaxiCard demo profile QR code" />
          <p className="note">This is a development test. The QR opens this profile; it does not directly store contact data. The Google Wallet button requires valid issuer configuration and a test account.</p>
        </div>
      </section>
    </main>
  );
}
