import { render, screen } from '@testing-library/react';
import Track from './Track';

test('renders Track removal', () => {
    render(<Track 
        track={{name: "TrackName", artist: "TrackArtist", album: "TrackAlbum" }}
    />);
    const linkElement = screen.getByText("TrackName");
    expect(linkElement).toBeInTheDocument();
});