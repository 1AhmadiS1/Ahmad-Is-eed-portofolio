import { useState, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Maximize2, Monitor, Image as ImageIcon, Cpu, Volume2, VolumeX, Tv, ExternalLink } from 'lucide-react';
import { playArcadeSound } from '@/shared/utils/sound';

/**
 * Convert Google Drive or YouTube links into embeddable preview URLs
 */
function getEmbedUrl(url) {
  if (!url) return null;
  if (url.includes('drive.google.com/file/d/')) {
    const match = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&/?]+)/);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
    }
  }
  return null;
}

function isDriveLink(url) {
  return typeof url === 'string' && url.includes('drive.google.com');
}

/**
 * ProjectCRTMonitor — Interactive retro-arcade monitor displaying video demos,
 * multi-video channel switching, screenshot galleries, and architecture specifications.
 */
export function ProjectCRTMonitor({ project, onExpand }) {
  const images = project.images || [];
  const hasImages = images.length > 0;

  // Normalize single video vs multiple videos
  const videos = project.videos?.length
    ? project.videos
    : project.demo_video
    ? [{ url: project.demo_video, caption: project.video_caption || 'Live Demonstration', title: 'FEED 1' }]
    : [];
  const hasVideos = videos.length > 0;

  // Smart initial tab: if project has video -> 'video', if only images -> 'gallery', else -> 'specs'
  const [activeTab, setActiveTab] = useState(() => (hasVideos ? 'video' : hasImages ? 'gallery' : 'specs'));
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const activeVideo = videos[currentVideoIndex] || null;
  const currentImage = images[currentImageIndex] || null;
  const embedUrl = activeVideo ? getEmbedUrl(activeVideo.url) : null;
  const isDriveVideo = activeVideo ? isDriveLink(activeVideo.url) : false;

  // Video controls for native video
  const togglePlay = () => {
    if (!videoRef.current) return;
    playArcadeSound('click');
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    playArcadeSound('click');
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const switchVideo = (index) => {
    playArcadeSound('tab');
    setCurrentVideoIndex(index);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Gallery controls
  const prevImage = () => {
    if (!hasImages) return;
    playArcadeSound('swap');
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (!hasImages) return;
    playArcadeSound('swap');
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="crt-monitor">
      {/* ─── CRT TOP BEZEL & SCREEN SELECTOR ─── */}
      <div className="crt-bezel-top">
        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {/* Video mode tab */}
          {hasVideos && (
            <button
              type="button"
              onClick={() => {
                playArcadeSound('tab');
                setActiveTab('video');
              }}
              className={`crt-mode-tab ${activeTab === 'video' ? 'crt-mode-tab--active' : ''}`}
            >
              <Play size={10} className="fill-current" />
              <span>{videos.length > 1 ? `VIDEOS (${videos.length})` : 'DEMO VIDEO'}</span>
            </button>
          )}

          {/* Stills mode tab */}
          {hasImages && (
            <button
              type="button"
              onClick={() => {
                playArcadeSound('tab');
                setActiveTab('gallery');
              }}
              className={`crt-mode-tab ${activeTab === 'gallery' ? 'crt-mode-tab--active' : ''}`}
            >
              <ImageIcon size={10} />
              <span>STILLS ({images.length})</span>
            </button>
          )}

          {/* Specs mode tab */}
          <button
            type="button"
            onClick={() => {
              playArcadeSound('tab');
              setActiveTab('specs');
            }}
            className={`crt-mode-tab ${activeTab === 'specs' ? 'crt-mode-tab--active' : ''}`}
          >
            <Cpu size={10} />
            <span>SPECS</span>
          </button>
        </div>

        {/* Status indicator & fullscreen trigger */}
        <div className="flex items-center gap-2">
          {isDriveVideo && activeTab === 'video' && (
            <a
              href={activeVideo.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => playArcadeSound('click')}
              className="hidden sm:inline-flex items-center gap-1 font-mono text-[9px] font-black text-acid hover:underline"
              title="Open video directly in Google Drive"
            >
              <span>DRIVE</span>
              <ExternalLink size={9} />
            </a>
          )}

          <span className="hidden md:flex items-center gap-1.5 font-mono text-[8px] font-black uppercase tracking-widest text-acid">
            <span className="size-1.5 rounded-full bg-acid animate-pulse" />
            V-SYNC 60
          </span>

          {onExpand && (
            <button
              type="button"
              onClick={() => {
                playArcadeSound('expand');
                onExpand();
              }}
              className="crt-icon-btn"
              title="Expand Mission Dossier"
            >
              <Maximize2 size={11} />
            </button>
          )}
        </div>
      </div>

      {/* ─── MULTI-VIDEO CHANNEL BAR (IF 2+ VIDEOS) ─── */}
      {activeTab === 'video' && videos.length > 1 && (
        <div className="bg-[#12181a] border-b border-white/10 px-2 py-1.5 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Tv size={11} className="text-acid flex-shrink-0" />
            <span className="font-mono text-[9px] font-bold text-white/70 uppercase">CHANNELS:</span>
            <div className="flex items-center gap-1">
              {videos.map((vid, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => switchVideo(idx)}
                  className={`font-mono text-[9px] font-black px-2 py-0.5 border transition-all ${
                    currentVideoIndex === idx
                      ? 'bg-red text-white border-white shadow-[1px_1px_0_0_#ffffff]'
                      : 'bg-black/60 text-white/70 border-white/20 hover:text-white hover:bg-black'
                  }`}
                >
                  {vid.title || `FEED 0${idx + 1}`}
                </button>
              ))}
            </div>
          </div>

          <span className="font-mono text-[8px] font-bold text-muted uppercase tracking-wider truncate max-w-[200px]">
            {activeVideo?.caption}
          </span>
        </div>
      )}

      {/* ─── CRT DISPLAY SCREEN ─── */}
      <div className="crt-screen-frame">
        {/* CRT Scanline & Phosphor Overlay (pointer-events none) */}
        <div className="crt-scanlines pointer-events-none" />
        <div className="crt-screen-glare pointer-events-none" />

        {/* ── VIDEO MODE ── */}
        {activeTab === 'video' && hasVideos && (
          <div className="crt-media-view relative bg-black size-full">
            {activeVideo ? (
              embedUrl ? (
                /* Embed Player (Google Drive / YouTube) */
                <div className="relative size-full bg-black flex flex-col">
                  <iframe
                    key={activeVideo.url}
                    src={embedUrl}
                    className="size-full border-0 flex-1 bg-black"
                    allow="autoplay; encrypted-media; fullscreen"
                    allowFullScreen
                    title={activeVideo.caption || 'Video Stream'}
                  />

                  {/* Top-right quick launch button for Drive videos */}
                  <div className="absolute top-2 right-2 z-20">
                    <a
                      href={activeVideo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 bg-ink/90 hover:bg-red text-white text-[9px] font-mono font-black uppercase px-2 py-1 border border-white/30 shadow-[2px_2px_0_0_#000000] transition-colors"
                    >
                      <span>OPEN IN DRIVE</span>
                      <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              ) : (
                /* Direct Video File (.mp4, .webm) */
                <>
                  <video
                    key={activeVideo.url}
                    ref={videoRef}
                    src={activeVideo.url}
                    muted={isMuted}
                    loop
                    playsInline
                    className="size-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Video HUD overlay controls */}
                  <div className="crt-video-hud">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="crt-hud-btn"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} className="fill-current" />}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="crt-hud-btn"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                      </button>
                      <span className="font-mono text-[9px] text-white/90 font-bold uppercase tracking-wider truncate max-w-[170px] sm:max-w-[280px]">
                        {activeVideo.caption || 'Live Demonstration'}
                      </span>
                    </div>

                    <span className="font-mono text-[8px] font-black text-red bg-ink/80 px-1.5 py-0.5 border border-red/40">
                      {isPlaying ? '● REC // PLAY' : 'PAUSED'}
                    </span>
                  </div>
                </>
              )
            ) : (
              <div className="crt-empty-state">
                <Monitor size={36} className="text-white/40 mb-2" />
                <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
                  NO VIDEO FEED
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── GALLERY MODE ── */}
        {activeTab === 'gallery' && (
          <div className="crt-media-view relative bg-black size-full">
            {currentImage ? (
              <>
                <img
                  src={currentImage.image}
                  alt={currentImage.caption || `${project.name} preview`}
                  className="size-full object-cover transition-opacity duration-300"
                />

                {/* Caption Bar */}
                <div className="crt-caption-bar">
                  <span className="font-mono text-[9px] text-white/90 font-bold tracking-wider truncate">
                    [{currentImageIndex + 1}/{images.length}] {currentImage.caption}
                  </span>
                </div>

                {/* Prev / Next controls */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="crt-nav-btn crt-nav-btn--left"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="crt-nav-btn crt-nav-btn--right"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="crt-empty-state">
                <ImageIcon size={36} className="text-white/40 mb-2" />
                <span className="font-mono text-xs font-black text-white uppercase">
                  NO STILLS CAPTURED
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── SPECS MODE ── */}
        {activeTab === 'specs' && (
          <div className="crt-media-view crt-specs-view size-full">
            <div className="font-mono text-[10px] text-acid font-black uppercase tracking-[0.2em] mb-2 flex items-center justify-between border-b border-white/10 pb-1.5">
              <span>// SYSTEM ARCHITECTURE</span>
              <span>NODE: OK</span>
            </div>
            <ul className="space-y-2 font-mono text-[11px] text-white/90">
              {(project.highlights || [
                'Production environment with automated monitoring',
                'Modular architecture designed for horizontal scaling',
                'Secure credential handling with environment vaults',
              ]).map((spec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red font-bold">▶</span>
                  <span className="leading-tight">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ─── CRT BOTTOM BEZEL ─── */}
      <div className="crt-bezel-bottom">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red border border-ink" />
          <span className="font-mono text-[8px] font-black uppercase tracking-widest text-ink truncate max-w-[140px] sm:max-w-none">
            CHANNEL 03 // {project.tag || 'MISSION'}
          </span>
        </div>
        <div className="font-mono text-[8px] font-bold text-muted uppercase tracking-wider">
          {hasVideos && videos.length > 1
            ? `DUAL FEED ACTIVE [${currentVideoIndex + 1}/${videos.length}]`
            : hasVideos
            ? 'MONITOR MODEL: CRT-98TX'
            : `IMAGE ARCHIVE [${images.length} STILLS]`}
        </div>
      </div>
    </div>
  );
}
