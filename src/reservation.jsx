import { AiOutlineHome } from 'react-icons/ai';

function Reservation() {
  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      {/* Home Icon - Top Left */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          cursor: 'pointer',
        }}
        onClick={() => (window.location.href = '/')}
        title="Go Home"
      >
        <AiOutlineHome size={32} />
      </div>

      {/* Centered Text */}
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>
          To book a table, please contact aryarestaurant6@gmail.com or call +44
          7955 965365
        </h1>
      </div>
    </div>
  );
}

export default Reservation;
