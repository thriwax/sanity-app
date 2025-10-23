'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Link = {
    href: string;
    label: string;
};

export default function Header() {
    const [open, setOpen] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDivElement | null>(null);

    const toggle = () => setOpen(v => !v);
    const close = () => setOpen(false);

    useEffect(() => {
        if (!open) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };

        document.addEventListener('keydown', onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const t = setTimeout(() => {
            const focusable = dialogRef.current?.querySelector<HTMLElement>('a,button');
            focusable?.focus();
        }, 0);

        return () => {
            document.body.style.overflow = prev;
            document.removeEventListener('keydown', onKey);
            clearTimeout(t);
        };
    }, [open]);

    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) close();
    };

    const links: Link[] = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/music', label: 'Music' }
    ];

    return (
        <header className="sticky top-0 z-50 p-5 mb-5">
            <nav className="container mx-auto flex h-20 items-center justify-between px-2 lg:px-4 bg-[#1A1A1A] rounded-xl border-[#272727] border-2 shadow-md">

                <Link href="/" className="rounded-md px-2 py-1 text-xl lg:text-2xl font-bold bg-[#272727] text-white hover:bg-white hover:text-black transition">
                    Fedor Tatarintsev
                </Link>

                <button
                    type="button"
                    aria-label={open ? 'Close Menu' : 'Open Menu'}
                    aria-expanded={open}
                    onClick={toggle}
                    className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring"
                >
                    <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
                        <span
                            className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${open ? 'translate-y-0 rotate-45' : '-translate-y-2'}`}
                        />
                        <span
                            className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}
                        />
                        <span
                            className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${open ? 'translate-y-0 -rotate-45' : 'translate-y-2'}`}
                        />
                    </span>
                </button>
            </nav>

            {open &&
                createPortal(
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation"
                        onClick={onBackdropClick}
                        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md"
                    >
                        {/* попап по центру */}
                        <div
                            ref={dialogRef}
                            className="relative mx-4 w-full max-w-md rounded-3xl border border-white/20 bg-white/80 p-6 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-white/70"
                        >
                            <button
                                type="button"
                                onClick={close}
                                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/60 shadow-sm transition hover:shadow focus:outline-none focus-visible:ring"
                                aria-label="Close Menu"
                            >
                                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>

                            <h2 className="mb-4 text-center text-xl font-semibold text-black">Menu</h2>

                            <ul className="space-y-2">
                                {links.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={close}
                                            className="block rounded-xl px-4 py-3 text-center text-lg font-medium text-black/90 transition hover:bg-black/5 focus:outline-none focus-visible:ring"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 text-center text-sm text-black/60">
                                Press <kbd className="rounded border px-1">Esc</kbd> to close
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </header>
    );
}
