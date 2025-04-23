import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

export default function CoffeeClubApp() {
  const [hasRedeemedToday, setHasRedeemedToday] = useState(false);
  const [lastRedemption, setLastRedemption] = useState(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    const storedRedemption = localStorage.getItem('lastRedemption');
    if (storedRedemption) {
      const redemptionDate = new Date(storedRedemption);
      const now = new Date();
      const isSameDay = redemptionDate.toDateString() === now.toDateString();
      setHasRedeemedToday(isSameDay);
      setLastRedemption(redemptionDate);
    }

    const isRegistered = localStorage.getItem('registered') === 'true';
    setRegistered(isRegistered);
  }, []);

  const handleRedeem = () => {
    const now = new Date();
    localStorage.setItem('lastRedemption', now.toISOString());
    setHasRedeemedToday(true);
    setLastRedemption(now);
  };

  const handleRegister = () => {
    localStorage.setItem('registered', 'true');
    setRegistered(true);
  };

  if (!registered) {
    return (
      <Card className="max-w-md mx-auto mt-10 text-center">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Join Moxy Coffee Club</h2>
          <p className="mb-4">Scan your Moxy Ocean Bottle code to activate membership.</p>
          <Button onClick={handleRegister}>Simulate Registration</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10 text-center">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Moxy Coffee Club</h2>
        {hasRedeemedToday ? (
          <>
            <p className="mb-4">You've redeemed your free coffee today!</p>
            <p className="text-sm text-muted">Last redemption: {lastRedemption?.toLocaleString()}</p>
          </>
        ) : (
          <>
            <p className="mb-4">You haven't redeemed your coffee yet today.</p>
            <Button onClick={handleRedeem}>Redeem Free Coffee</Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
