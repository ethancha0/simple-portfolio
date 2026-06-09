'use client';

import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export default function IntroText() {
  return (
    <Typography variant="h6">
      Currently leading a team to build{' '}
      <Tooltip title="Time Sync & Room Scheduler" arrow>
        <a
          href="https://zotmeet.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ZotMeet
        </a>
      </Tooltip>{' '}
      for UC Irvine students. There, I also study Software Engineering & Health
      Infomatics
    </Typography>
  );
}
