import { RetroGameLoader } from './RetroGameLoader';

export function LoadingScreen({ onComplete }) {
  return <RetroGameLoader onComplete={onComplete} />;
}
