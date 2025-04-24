import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

const hotelList = [
  "Moxy Aberdeen Airport",
  "Moxy Edinburgh Airport",
  "Moxy Edinburgh Fountainbridge",
  "Moxy Glasgow Merchant City",
  "Moxy Glasgow SEC",
  "Moxy York",
  "Moxy Chester",
  "Moxy Birmingham NEC",
  "Moxy Milton Keynes",
  "Moxy Bristol",
  "Moxy London Heathrow Airport",
  "Moxy London Stratford",
  "Moxy London ExCel",
  "Moxy Plymouth",
  "Moxy Southampton",
  "Moxy Manchester City",
  "Moxy Slough"
];

export default function CoffeeClubApp() {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hotel, setHotel] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromURL = urlParams.get('code');
    if (codeFromURL) {
      setCode(codeFromURL);
    }
  }, []);

  const handleSubmit = async () => {
    if (!name || !email || !hotel) return alert('Please complete all fields.');

    try {
      const response = await fetch('https://8jgo0it3vc.execute-api.eu-north-1.amazonaws.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, name, email, hotel })
      });

      const result = await response.json();
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('There was an error: ' + result.error);
      }
    } catch (error) {
      console.error(error);
      alert('Submission failed.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: '#e8e1d9',
        fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, sans-serif',
        color: '#000000'
      }}
    >
      <Card className="max-w-md w-full text-center shadow-lg p-6 bg-white bg-opacity-90 rounded-lg">
        <CardContent>
          <img
            src="/moxy-logo.svg"
            alt="Moxy Coffee Club"
            className="mx-auto mb-6 h-16"
          />
          {submitted ? (
            <>
              <h2 className="text-xl font-bold mb-4">You're almost in!</h2>
              <p>Please check your inbox to verify your email address.</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">Register Your Bottle</h2>
              <p className="mb-2 text-sm">Code: <strong>{code}</strong></p>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              />
              <select
                value={hotel}
                onChange={(e) => setHotel(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full mb-4"
              >
                <option value="">Select your hotel</option>
                {hotelList.map(hotel => (
                  <option key={hotel} value={hotel}>{hotel}</option>
                ))}
              </select>
              <Button onClick={handleSubmit}>Submit Registration</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
