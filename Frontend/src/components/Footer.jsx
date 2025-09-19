'use client';

import { Dna } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/60 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo + Description */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-gradient-sea">
                <Dna className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient-sea">
                BioDNA
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Decoding biodiversity using cutting-edge eDNA technology.
              Empowering researchers to identify taxonomy and assess ecosystems with precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2 text-sm">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/upload" className="hover:text-primary transition-colors">
              Upload Dataset
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Policies & Info */}
          <div className="flex flex-col space-y-2 text-sm">
            <h4 className="font-semibold text-foreground">Support</h4>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQs
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BioDNA Research Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
