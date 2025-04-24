import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

export default function CoffeeClubApp() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hotel, setHotel] = useState('');
  const [registered, setRegistered] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const hotels = [
    'Moxy Aberdeen Airport', 'Moxy Edinburgh Airport', 'Moxy Edinburgh Fountainbridge',
    'Moxy Glasgow Merchant City', 'Moxy Glasgow SEC', 'Moxy York', 'Moxy Chester',
    'Moxy Birmingham NEC', 'Moxy Milton Keynes', 'Moxy Bristol', 'Moxy London Heathrow Airport',
    'Moxy London Stratford', 'Moxy London ExCel', 'Moxy Plymouth', 'Moxy Southampton',
    'Moxy Manchester City', 'Moxy Slough'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || !name || !email || !hotel) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('https://8jgo0it3vc.execute-api.eu-north-1.amazonaws.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, name, email, hotel })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const res = await response.json();
        setError(res.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#e8e1d9',
      color: '#000000',
      fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <img
        src="/moxy-logo.svg"
        alt="Moxy Coffee Club"
        style={{ height: '64px', marginBottom: '2rem' }}
      />

      {submitted ? (
        <Card className="max-w-md w-full text-center shadow-lg">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Thanks for registering!</h2>
            <p className="mb-4">Please check your email to confirm your membership.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-md w-full text-left shadow-lg">
          <CardContent>
            <h2 className="text-xl font-bold mb-4 text-center">Register for Moxy Coffee Club</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Your Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Email Address</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Hotel</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                >
                  <option value="">Select your hotel</option>
                  {hotels.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit">Register</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}