import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function HomeIcon() {
  return (
    <Link href="/">
      <a>
        <Image src="/pokeball.svg" alt="Home" width={32} height={32} />
      </a>
    </Link>
  );
}
