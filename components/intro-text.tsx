'use client';

import Tooltip from '@mui/material/Tooltip';

export default function IntroText() {
  return (
    <p className="text-2xl">
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
    </p>
  );
}
