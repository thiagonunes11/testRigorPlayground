import React, { useRef, useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/homePage.css';
import AudioA from "../assets/344211_giomilko_c-major-9-bossa-nova-guitar.wav";
import AudioB from "../assets/53704_reinsamba_samba-batucada1.wav";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomAudioPlayer = ({ src, testIdPrefix }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        if (!isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    // Atualiza o estado quando o áudio é pausado ou finalizado
    useEffect(() => {
        const audio = audioRef.current;
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onPause);
        return () => {
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onPause);
        };
    }, []);

    // Barra de progresso simples
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const audio = audioRef.current;
        const updateProgress = () => {
            setProgress(audio.currentTime / audio.duration || 0);
        };
        audio.addEventListener('timeupdate', updateProgress);
        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
        };
    }, []);

    const handleSeek = (e) => {
        const audio = audioRef.current;
        const rect = e.target.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    };

    return (
        <div className="mb-4">
            <audio
                ref={audioRef}
                src={src}
                data-testid={`${testIdPrefix}-audio`}
                style={{ display: 'none' }}
            />
            <div className="audio-controls d-flex align-items-center gap-3">
                <button
                    data-testid={`${testIdPrefix}-playpause`}
                    className={`btn ${isPlaying ? 'btn-danger' : 'btn-success'} me-2`}
                    onClick={handlePlayPause}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <div
                    className="audio-progress flex-grow-1"
                    style={{
                        height: 8,
                        background: '#e9ecef',
                        borderRadius: 4,
                        cursor: 'pointer',
                        position: 'relative',
                        minWidth: 120,
                    }}
                    onClick={handleSeek}
                    data-testid={`${testIdPrefix}-progressbar`}
                >
                    <div
                        style={{
                            width: `${progress * 100}%`,
                            height: '100%',
                            background: '#0d6efd',
                            borderRadius: 4,
                            transition: 'width 0.1s linear',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const AudioValidation = () => {
    return (
        <Layout 
            title="Audio Validation" 
            description="Validate audio playback functionality."
        >
            <div className="demo-content">
                <h4 className="card-subtitle mb-3">Sample A</h4>
                <CustomAudioPlayer src={AudioA} testIdPrefix="audioA" />
                <h4 className="card-subtitle mb-3">Sample B</h4>
                <CustomAudioPlayer src={AudioB} testIdPrefix="audioB" />
            </div>
        </Layout>
    );
};

export default AudioValidation;