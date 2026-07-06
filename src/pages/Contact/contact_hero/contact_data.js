import { 
  Headphones, Share2, MapPin, Shield, Users, BookOpen, Mic, Scale, 
  Gavel, UserCheck, UserPlus, Bot, Star, MessageSquare, ArrowRight, ArrowLeft 
} from 'lucide-react';

export const getPage1 = (handlePageChange) => [
  { Icon: Headphones, id: '1', label: 'Help Desk', path: '/contact/help-desk' },
  { Icon: Share2, id: '2', label: 'Follow Apps', path: '/reachus' },
  { Icon: MapPin, id: '3', label: 'Branch Details', path: '/contact/branch-details' },
  { Icon: Shield, id: '4', label: 'Officer', path: '/coming-soon' },
  { Icon: Users, id: '5', label: 'Employee', path: '/coming-soon' },
  { Icon: BookOpen, id: '6', label: 'Teacher', path: '/coming-soon' },
  { Icon: Mic, id: '7', label: 'Reporter', path: '/coming-soon' },
  { Icon: ArrowRight, id: 'next', action: () => handlePageChange(1), label: 'Next Page' }
];

export const getPage2 = (handlePageChange) => [
  { Icon: Scale, id: '8', label: 'Advocate', path: '/coming-soon' },
  { Icon: Gavel, id: '9', label: 'Legal Advisor', path: '/coming-soon' },
  { Icon: UserCheck, id: '10', label: 'Board Director', path: '/coming-soon' }, 
  { Icon: UserPlus, id: '11', label: 'Board Member', path: '/coming-soon' },
  { Icon: Bot, id: '12', label: 'AI Chat', path: '/contact/ai-chat' },
  { Icon: Star, id: '13', label: 'Review', path: '/coming-soon' },
  { Icon: MessageSquare, id: '14', label: 'Feedback', path: '/coming-soon' },
  { Icon: ArrowLeft, id: 'prev', action: () => handlePageChange(0), label: 'Prev Page' }
];
