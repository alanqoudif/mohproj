import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <MessageCircle className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{' '}
            <Link
              href="/"
              className="font-medium underline underline-offset-4"
            >
              Nuqta Consultation
            </Link>
            . Powered by Nuqta.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/terms"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}