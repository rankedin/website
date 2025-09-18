import { useEffect, useState } from 'react';

export function useAnimatedNumber(
  targetValue: number,
  duration: number = 1000
) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (targetValue === 0) {
      setCurrentValue(0);
      return;
    }

    const startValue = 0;
    const difference = targetValue - startValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - (1 - progress) ** 4;
      const current = Math.round(startValue + difference * easeOutQuart);

      setCurrentValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration]);

  return currentValue;
}
