import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export function AudioPlayer() {
    const waveformRef = useRef<HTMLDivElement>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        if (!waveformRef.current) return;

        const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,

            height: 100,

            waveColor: "#A9DDF5",
            progressColor: "#4F8FA8",

            cursorColor: "#ffffff",

            barWidth: 1,
            barGap: 0,
            barRadius: 1,

            normalize: true,

            url: "http://localhost:5000/audio/1",
        });

        wavesurferRef.current = wavesurfer;

        wavesurfer.on("ready", () => {
            console.log("🎵 WaveSurfer pronto!");
            setCarregando(false);
        });

        wavesurfer.on("error", (erro) => {
            console.error("❌ Erro WaveSurfer:", erro);
            setCarregando(false);
        });

        wavesurfer.on("play", () => {
            setIsPlaying(true);
        });

        wavesurfer.on("pause", () => {
            setIsPlaying(false);
        });

        wavesurfer.on("finish", () => {
            setIsPlaying(false);
        });

        return () => {
            wavesurfer.destroy();
        };
    }, []);

    function handlePlayPause() {
        wavesurferRef.current?.playPause();
    }

    return (
        <div className="w-full max-w-3xl">

            <div
                ref={waveformRef}
                className="w-full"
            />

            {carregando && (
                <p className="text-gray-500">
                    Carregando áudio...
                </p>
            )}

            <button
                onClick={handlePlayPause}
                className="mt-4 rounded-lg bg-[#A9DDF5] px-5 py-2 font-bold"
            >
                {isPlaying ? "Pausar" : "Tocar"}
            </button>

        </div>
    );
}