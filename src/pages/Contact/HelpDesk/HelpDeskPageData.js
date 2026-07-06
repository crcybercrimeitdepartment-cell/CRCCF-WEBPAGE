import { Shield, ShieldAlert, Monitor, Landmark, Droplet, UserX, User, TrainFront, Baby, Users } from 'lucide-react';

export const allCards = [
  // Page 1
  { id: 1, num: '01', title: 'CR HELP LINE', desc: 'Report any crime or\ncriminal activity.', phone: '1930', Icon: Shield, bg: 'bg-[#a3b1c6]', lines: 'grid' },
  { id: 2, num: '02', title: 'POLICE HELP LINE', desc: 'For police assistance\nand emergency.', phone: '100', Icon: ShieldAlert, bg: 'bg-[#ffb3b3]', lines: 'ruled' }, 
  { id: 3, num: '03', title: 'CYBER CRIME HELP LINE', desc: 'Report cyber frauds\nand online crimes.', phone: '1930', Icon: Monitor, bg: 'bg-[#b3e6cc]', lines: 'bulleted' }, 
  { id: 4, num: '04', title: 'BANK HELPLINE', desc: 'For banking support and\nfraud-related issues.', phone: '1800 11 22 11', Icon: Landmark, bg: 'bg-[#ffd9b3]', lines: 'dashed' }, 
  { id: 5, num: '05', title: 'BLOOD BANK HELPLINE', desc: 'Find blood donors\nor request blood.', phone: '1910', Icon: Droplet, bg: 'bg-[#ffb3c6]', lines: 'ruled' },
  // Page 2
  { id: 6, num: '06', title: 'ANTI-RAGGING HELPLINE', desc: 'Report ragging incidents\nanonymously.', phone: '1800 180 5522', Icon: UserX, bg: 'bg-[#d9b3ff]', lines: 'grid' }, 
  { id: 7, num: '07', title: 'SENIOR CITIZEN HELPLINE', desc: 'Support and assistance\nfor senior citizens.', phone: '14567', Icon: User, bg: 'bg-[#99e6e6]', lines: 'ruled' }, 
  { id: 8, num: '08', title: 'RAILWAY HELPLINE', desc: 'For railway enquiries\nand assistance.', phone: '139', Icon: TrainFront, bg: 'bg-[#b3ccff]', lines: 'bulleted' }, 
  { id: 9, num: '09', title: 'CHILD HELPLINE', desc: 'For child protection\nand safety.', phone: '1098', Icon: Baby, bg: 'bg-[#ffe699]', lines: 'dashed' }, 
  { id: 10, num: '10', title: "WOMEN'S HELPLINE", desc: 'For women safety,\nassistance and support.', phone: '181', Icon: Users, bg: 'bg-[#ffb3ff]', lines: 'ruled' },
];
