interface HeroImageResponse {
  imageUrl: string;
}

const staticImages = [
  "https://images.pexels.com/photos/33152106/pexels-photo-33152106.jpeg?_gl=1*11jnvrw*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTIxNCRqOSRsMCRoMA..",
  "https://images.pexels.com/photos/1563016/pexels-photo-1563016.jpeg?_gl=1*13csjoj*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTI4NSRqMjEkbDAkaDA.",
  "https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg?_gl=1*bzjjq3*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTM2MCRqOSRsMCRoMA..",
  "https://images.pexels.com/photos/634548/pexels-photo-634548.jpeg?_gl=1*18bqsrk*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTQxMiRqMzQkbDAkaDA.",
  "https://images.pexels.com/photos/33159662/pexels-photo-33159662.jpeg?_gl=1*10blshn*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTQ3MyRqNDIkbDAkaDA.",
  "https://images.pexels.com/photos/33159865/pexels-photo-33159865.jpeg?_gl=1*10vi285*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTUxMSRqNCRsMCRoMA..",
  "https://images.pexels.com/photos/33149768/pexels-photo-33149768.jpeg?_gl=1*1f0o0jc*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTU0NyRqNDQkbDAkaDA.",
  "https://images.pexels.com/photos/19258840/pexels-photo-19258840.jpeg?_gl=1*1b896oo*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTYwMiRqNTEkbDAkaDA.",
  "https://images.pexels.com/photos/6943643/pexels-photo-6943643.jpeg?_gl=1*1kxrbj8*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTY2MCRqNTkkbDAkaDA.",
  "https://images.pexels.com/photos/13151813/pexels-photo-13151813.jpeg?_gl=1*wvuck9*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTcxNyRqMiRsMCRoMA..",
  "https://images.pexels.com/photos/33131369/pexels-photo-33131369.jpeg?_gl=1*fqb94p*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTc2OCRqNDUkbDAkaDA.",
  "https://images.pexels.com/photos/219692/pexels-photo-219692.jpeg?_gl=1*11noe24*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTg1NiRqMjUkbDAkaDA.",
  "https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?_gl=1*14mo428*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYwOTk1MCRqMjAkbDAkaDA.",
  "https://images.pexels.com/photos/5514634/pexels-photo-5514634.jpeg?_gl=1*18jxebv*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYxMDAwNCRqMjckbDAkaDA.",
  "https://images.pexels.com/photos/7233182/pexels-photo-7233182.jpeg?_gl=1*ixkg4e*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYxMDA0OSRqNDIkbDAkaDA.",
  "https://images.pexels.com/photos/21032975/pexels-photo-21032975.jpeg?_gl=1*xwczr1*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYxMDA4MSRqMTAkbDAkaDA.",
  "https://images.pexels.com/photos/32961161/pexels-photo-32961161.png?_gl=1*leo9gf*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYxMDExMiRqNTkkbDAkaDA.",
  "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?_gl=1*7beqvp*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYxMDE5OCRqMzMkbDAkaDA.",
  "https://images.pexels.com/photos/1114688/pexels-photo-1114688.jpeg?_gl=1*tlitrh*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYxMDI5NCRqMzIkbDAkaDA.",
  "https://images.pexels.com/photos/409701/pexels-photo-409701.jpeg?_gl=1*1438e7n*_ga*MTk4MjEwNjY3Ny4xNzMxMDc3NTk0*_ga_8JE65Q40S6*czE3NTM2MDkxNjMkbzE3NSRnMSR0MTc1MzYxMDMzMyRqNTkkbDAkaDA.",
];

export async function getHeroImage(): Promise<HeroImageResponse> {
  const TWO_HOUR = 2 * 60 * 60 * 1000;
  const now = Date.now();

  const date = new Date(now);
  const day = date.getUTCDate();
  const hour = date.getUTCHours();

  const seed = Math.floor((day * 24 + hour) / 2);
  const imageIndex = seed % staticImages.length;

  return {
    imageUrl: staticImages[imageIndex],
  };
}
