import { render, screen } from '@testing-library/react';
import SplashScreen from '../components/SplashScreen';

describe('SplashScreen', () => {
    test('renders splash screen with emoji', () => {
        render(<SplashScreen />);
        const emojiElement = screen.getByText('🎲');
        expect(emojiElement).toBeInTheDocument();
    });

    test('has correct class names', () => {
        render(<SplashScreen />);
        const splashScreenElement = screen.getByRole('presentation');
        expect(splashScreenElement).toHaveClass('splash-screen');
        const splashContentElement = screen.getByText('🎲').parentElement;
        expect(splashContentElement).toHaveClass('splash-content');
    });
});