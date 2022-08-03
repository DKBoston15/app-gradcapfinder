import React from 'react';
import { Card } from './styles';
import ReactPlayer from 'react-player/youtube';

export default function Video({ video }) {
  return (
    <Card>
      <ReactPlayer url={video.url} width="100%" height="100%" style={{ maxWidth: '800px' }} />
    </Card>
  );
}
