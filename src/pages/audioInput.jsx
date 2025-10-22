import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import '../styles/homePage.css';

const AudioInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]); // { url, blob, name }
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Microphone not supported by this browser.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const name = `Recording ${recordings.length + 1}`;
        setRecordings((prev) => [{ url, blob, name }, ...prev]);
        chunksRef.current = [];
      };

      mr.start();
      setIsRecording(true);
    } catch (err) {
      console.error('getUserMedia error:', err);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    } finally {
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) stopRecording();
    else startRecording();
  };

  const removeRecording = (index) => {
    setRecordings((prev) => {
      const item = prev[index];
      if (item?.url) URL.revokeObjectURL(item.url);
      const copy = prev.slice();
      copy.splice(index, 1);
      return copy;
    });
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      recordings.forEach((r) => r.url && URL.revokeObjectURL(r.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Audio Input" description="Record audio from the microphone and play back recordings.">
      <div className="demo-content">
        <div className="text-center mb-4">
          <button
            className={`btn btn-lg ${isRecording ? 'btn-danger' : 'btn-success'}`}
            onClick={toggleRecording}
            data-testid="record-toggle"
            aria-pressed={isRecording}
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5>Recordings</h5>
              {recordings.length === 0 && <p className="text-muted">No recordings yet.</p>}
              <ul className="list-group">
                {recordings.map((rec, idx) => (
                  <li key={idx} className="list-group-item d-flex align-items-center justify-content-between">
                    <div style={{ minWidth: 0 }}>
                      <div className="fw-semibold text-truncate" style={{ maxWidth: 300 }}>{rec.name}</div>
                      <audio
                        controls
                        src={rec.url}
                        className="w-100 mt-2"
                        data-testid={`recording-audio-${idx}`}
                        aria-label={`Playback ${rec.name}`}
                      />
                    </div>
                    <div className="ms-3 d-flex flex-column align-items-end">
                      <a
                        href={rec.url}
                        download={`${rec.name}.webm`}
                        className="btn btn-outline-primary btn-sm mb-2"
                        data-testid={`download-${idx}`}
                      >
                        Download
                      </a>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeRecording(idx)}
                        data-testid={`remove-${idx}`}
                        aria-label={`Remove ${rec.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AudioInput;