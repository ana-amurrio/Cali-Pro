import { BookCheck } from "lucide-react";
import { DoorClosed } from 'lucide-react';
import { DollarSign } from "lucide-react";

export const navItems = [
  { label: "Why Us", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "Andrea C.",
    text: "Unfortunate event made much better by offering a quick professional service! Thank you!",
  },
  {
    user: "Ana A.",
    text: "Martin provided clear expectations and delivered great service.",
  },
];

export const features = [
  {
    icon: <BookCheck/>,
    text: "Expert Technicians",
    description:
      "Skilled professionals with years of experience ensuring precise repairs and replacements",
  },
  {
    icon: <DoorClosed/>,
    text: "Mobile Service",
    description:
      "We come to you! Convenient, on-the-spot repairs at your home, office, or anywhere you need us",
  },
  {
    icon: <DollarSign/>,
    text: "Affordable Pricing",
    description:
      "Competitive rates with no hidden fees, providing great value for superior service",
  },
];

export const checklistItems = [
  {
    title: "Complete Interst Form and Call Us",
    description:
      "Reach out for a free, no-obligation estimate at (628) 588-4266. We’ll assess the damage and give you a clear, upfront price",
  },
  {
    title: "Scheduling",
    description:
      "Choose a time that fits your schedule. We offer flexible mobile services, bringing the repair to your home, office, or any convenient location",
  },
  {
    title: "On-Site Service",
    description:
      "Our expert technicians arrive at your location fully equipped to handle the repair or replacement. We work quickly and efficiently, ensuring minimal disruption to your day",
  },
  {
    title: "Quick & Reliable Results",
    description:
      "We prioritize fast, high-quality work to get you back on the road safely. Our repairs are designed to last, using the best materials for long-term durability",
  },
];
