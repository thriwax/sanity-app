"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type Props = {
    src: string;
    title: string;
    artist: string;
    coverUrl?: string | null;
};

export default function MusicPlayer({ src, title, artist, coverUrl }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.9);
    const [muted, setMuted] = useState(false);

    // формат времени 03:21
    const fmt = (sec: number) => {
        if (!isFinite(sec)) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onLoaded = () => {
            setDuration(audio.duration || 0);
            setIsReady(true);
        };
        const onTime = () => setCurrentTime(audio.currentTime || 0);
        const onEnded = () => setIsPlaying(false);

        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("timeupdate", onTime);
        audio.addEventListener("ended", onEnded);

        // начальная громкость
        audio.volume = volume;
        audio.muted = muted;

        return () => {
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("timeupdate", onTime);
            audio.removeEventListener("ended", onEnded);
        };
    }, [volume, muted]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (e) {
                // автоплей может быть заблокирован — просто игнорируем
            }
        }
    };

    const onSeek = (v: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = v;
        setCurrentTime(v);
    };

    const onChangeVolume = (v: number) => {
        const audio = audioRef.current;
        setVolume(v);
        if (audio) audio.volume = v;
        if (v === 0) setMuted(true);
        else if (muted) setMuted(false);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        const next = !muted;
        setMuted(next);
        if (audio) audio.muted = next;
    };

    const progressPct = useMemo(
        () => (duration ? (currentTime / duration) * 100 : 0),
        [currentTime, duration]
    );

    return (
        <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 sm:p-5 text-zinc-100 shadow-lg backdrop-blur">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-stretch">
                {/* COVER */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-zinc-800">
                    {coverUrl ? (
                        <Image
                            src={coverUrl}
                            alt={`${artist} — ${title}`}
                            fill
                            className="object-cover"
                            sizes="144px"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-700" />
                    )}
                </div>

                {/* INFO + CONTROLS */}
                <div className="flex-1 min-w-0 w-full">
                    {/* titles */}
                    <div className="mb-2">
                        <h2 className="text-lg sm:text-xl font-semibold truncate">{title}</h2>
                        <p className="text-sm text-zinc-400 truncate">{artist}</p>
                    </div>

                    {/* transport */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={togglePlay}
                            className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-zinc-100 text-zinc-900 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 focus:ring-offset-zinc-900"
                            aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
                        >
                            {isPlaying ? (
                                // pause icon
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" rx="1" />
                                    <rect x="14" y="4" width="4" height="16" rx="1" />
                                </svg>
                            ) : (
                                // play icon
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        {/* time + seek */}
                        <div className="flex-1 flex items-center gap-2 min-w-0">
                            <span className="tabular-nums text-xs text-zinc-400 w-10 text-right">{fmt(currentTime)}</span>
                            <div className="relative w-full">
                                <input
                                    type="range"
                                    min={0}
                                    max={duration || 0}
                                    step={0.1}
                                    value={currentTime}
                                    onChange={(e) => onSeek(Number(e.target.value))}
                                    className="range-clean w-full appearance-none bg-transparent cursor-pointer"
                                    aria-label="Перемотка"
                                />
                                {/* custom track */}
                                <div className="pointer-events-none absolute inset-0 flex items-center">
                                    <div className="h-1 w-full rounded-full bg-zinc-700">
                                        <div
                                            className="h-1 rounded-full bg-zinc-200"
                                            style={{ width: `${progressPct}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className="tabular-nums text-xs text-zinc-400 w-10">{fmt(duration)}</span>
                        </div>

                        {/* volume */}
                        <button
                            type="button"
                            onClick={toggleMute}
                            className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 hover:bg-zinc-700 transition"
                            aria-label={muted ? "Включить звук" : "Выключить звук"}
                            title={muted ? "Unmute" : "Mute"}
                        >
                            {muted || volume === 0 ? (
                                // volume off
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16.5 12l3.5 3.5-1.5 1.5L15 13.5 11.5 17H8v-6h3.5L15 7.5l3.5 3.5-1.5 1.5z" />
                                </svg>
                            ) : volume < 0.5 ? (
                                // low
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                </svg>
                            ) : (
                                // high
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 9v6h4l5 5V4L7 9H3z" />
                                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z" />
                                    <path d="M19 12c0 3.04-1.72 5.64-4.25 6.92l-.75-1.86A6.01 6.01 0 0 0 17 12c0-2.3-1.3-4.28-3.25-5.28l.75-1.86C17.28 6.36 19 8.96 19 12z" />
                                </svg>
                            )}
                        </button>
                        <div className="hidden sm:flex w-28 items-center">
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={muted ? 0 : volume}
                                onChange={(e) => onChangeVolume(Number(e.target.value))}
                                aria-label="Громкость"
                                className="w-full cursor-pointer bg-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* скрытый аудио-элемент */}
            <audio ref={audioRef} src={src} preload="metadata" />
        </div>
    );
}
