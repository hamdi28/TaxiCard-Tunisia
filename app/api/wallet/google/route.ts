import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const runtime = 'nodejs';


function getCredentials() {
  const encoded = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_JSON_BASE64;

  if (!encoded) {
    throw new Error(
      'Missing GOOGLE_WALLET_SERVICE_ACCOUNT_JSON_BASE64 environment variable.'
    );
  }

  const json = Buffer.from(encoded, 'base64').toString('utf8');

  const credentials = JSON.parse(json) as {
    client_email?: string;
    private_key?: string;
  };

  if (!credentials.client_email || !credentials.private_key) {
    throw new Error(
      'Service account JSON must contain client_email and private_key.'
    );
  }

  return {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  };
}


export async function GET() {
  try {
    const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;
    if (!issuerId) throw new Error('Missing GOOGLE_WALLET_ISSUER_ID environment variable.');

    const credentials = getCredentials();
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
    const profileUrl = `${siteUrl}/d/sami-demo`;
    const classSuffix = 'taxicard_demo_class_v1';
    const objectSuffix = 'sami_ben_youssef_demo_001';
    const classId = `${issuerId}.${classSuffix}`;
    const objectId = `${issuerId}.${objectSuffix}`;

    const genericClass = { id: classId };
    const genericObject = {
      id: objectId,
      classId,
      state: 'ACTIVE',
      cardTitle: { defaultValue: { language: 'en-US', value: 'TaxiCard Tunisia' } },
      header: { defaultValue: { language: 'en-US', value: 'Sami Ben Youssef' } },
      subheader: { defaultValue: { language: 'en-US', value: 'Taxi driver · Tunis' } },
      hexBackgroundColor: '#102B3F',
      logo: {
        sourceUri: { uri: 'https://developers.google.com/static/wallet/site-assets/images/pass-builder/pass_google_logo.jpg' },
        contentDescription: { defaultValue: { language: 'en-US', value: 'TaxiCard' } }
      },
      barcode: { type: 'QR_CODE', value: profileUrl },
      textModulesData: [
        { id: 'phone', header: 'PHONE', body: '+216 20 000 001' },
        { id: 'taxi', header: 'TAXI REFERENCE', body: 'TAXI-2048' },
        { id: 'area', header: 'SERVICE AREA', body: 'Tunis' },
        { id: 'demo', header: 'DEMO', body: 'Fictional test driver' }
      ],
      linksModuleData: {
        uris: [
          { uri: 'https://wa.me/21620000001', description: 'Contact Sami on WhatsApp' },
          { uri: profileUrl, description: 'TaxiCard driver profile' }
        ]
      }
    };

    const token = jwt.sign(
      {
        iss: credentials.client_email,
        aud: 'google',
        typ: 'savetowallet',
        origins: [],
        payload: {
          genericClasses: [genericClass],
          genericObjects: [genericObject]
        }
      },
      credentials.private_key,
      { algorithm: 'RS256' }
    );

    return NextResponse.redirect(`https://pay.google.com/gp/v/save/${token}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
