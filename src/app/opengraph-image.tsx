import { ImageResponse } from 'next/og';
export const alt = 'Force One Smart Totem — Segurança colaborativa começa pela conexão';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#090D0B',
        color: '#F4F7F5',
        padding: '72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 20,
          letterSpacing: 5,
          color: '#39E879',
          marginBottom: 40,
        }}
      >
        FORCE ONE SMART TOTEM
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 61,
          fontWeight: 800,
          letterSpacing: -2,
          lineHeight: 1.06,
        }}
      >
        Uma câmera monitora um ponto.
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 67,
          fontWeight: 800,
          letterSpacing: -2,
          lineHeight: 1.06,
          color: '#21C460',
          marginTop: 12,
        }}
      >
        Uma rede ajuda a proteger uma região.
      </div>
      <div style={{ display: 'flex', fontSize: 19, color: '#A9B3AC', marginTop: 42 }}>
        Segurança colaborativa começa pela conexão.
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 5,
          background: '#21C460',
          display: 'flex',
        }}
      />
    </div>,
    size,
  );
}
