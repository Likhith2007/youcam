import React, { useState, useEffect } from 'react';
import { Layers, Flame, Droplets, ShieldAlert, Sparkles, Maximize2, X, CircleDot, Activity, Info, KeyRound, Download, Link as LinkIcon, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MaskOverlayCards({ imagePreview, metrics, heatmap = [], masks: initialMasks = null, reportZipUrl: initialZipUrl = null }) {
  const [activeModalMask, setActiveModalMask] = useState(null);
  const [customZipUrl, setCustomZipUrl] = useState(initialZipUrl || '');
  const [extractedMasks, setExtractedMasks] = useState(initialMasks);
  const [zipUrl, setZipUrl] = useState(initialZipUrl);
  const [isLoadingZip, setIsLoadingZip] = useState(false);
  const [zipError, setZipError] = useState(null);

  useEffect(() => {
    if (initialMasks && Object.keys(initialMasks).length > 0) {
      setExtractedMasks(initialMasks);
    }
    if (initialZipUrl) {
      setZipUrl(initialZipUrl);
      setCustomZipUrl(initialZipUrl);
    }
  }, [initialMasks, initialZipUrl]);

  if (!imagePreview) return null;

  const basePhoto = extractedMasks?.faceImage || imagePreview;
  const hasRealYouCamMasks = Boolean(extractedMasks && Object.keys(extractedMasks).length > 0);

  // Extract YouCam S3 ZIP Package URL via backend API
  const handleFetchZipUrl = async (urlToFetch) => {
    const targetUrl = urlToFetch || customZipUrl;
    if (!targetUrl || !targetUrl.trim()) {
      setZipError('Please paste or enter a valid YouCam S3 ZIP package URL.');
      return;
    }

    setZipError(null);
    setIsLoadingZip(true);

    try {
      const res = await fetch('/api/parse-zip-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipUrl: targetUrl.trim() })
      });

      const data = await res.json();
      if (data.success && data.masks) {
        setExtractedMasks(data.masks);
        setZipUrl(targetUrl.trim());
      } else {
        setZipError(data.error || 'Failed to unpack ZIP archive. URL may be expired or invalid.');
      }
    } catch (err) {
      console.error('Error fetching zip URL:', err);
      setZipError('Server connection error while downloading S3 ZIP package.');
    } finally {
      setIsLoadingZip(false);
    }
  };

  const maskTypes = [
    {
      id: 'oiliness',
      title: 'Oiliness Mask',
      subtitle: 'T-Zone Sebum & Lipid Distribution (Extracted from YouCam ZIP)',
      icon: Flame,
      color: 'text-amber-400',
      borderColor: 'hover:border-amber-500/50',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      realMask: extractedMasks?.oiliness
    },
    {
      id: 'moisture',
      title: 'Moisture Mask',
      subtitle: 'Transepidermal Hydration & Barrier Lock (Extracted from YouCam ZIP)',
      icon: Droplets,
      color: 'text-blue-400',
      borderColor: 'hover:border-blue-500/50',
      badgeBg: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
      realMask: extractedMasks?.moisture
    },
    {
      id: 'acne',
      title: 'Acne & Spots Mask',
      subtitle: 'Inflammatory Papule & Blemish Mask (Extracted from YouCam ZIP)',
      icon: ShieldAlert,
      color: 'text-rose-400',
      borderColor: 'hover:border-rose-500/50',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      realMask: extractedMasks?.acne || extractedMasks?.spots
    },
    {
      id: 'wrinkles',
      title: 'Wrinkles Mask',
      subtitle: 'Periorbital & Forehead Crease Mask (Extracted from YouCam ZIP)',
      icon: Sparkles,
      color: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/50',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      realMask: extractedMasks?.wrinkles || extractedMasks?.wrinkle
    },
    {
      id: 'texture',
      title: 'Texture Mask',
      subtitle: 'Epidermal Surface Smoothness Mask (Extracted from YouCam ZIP)',
      icon: Activity,
      color: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/50',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      realMask: extractedMasks?.texture
    },
    {
      id: 'pore',
      title: 'Pore Dilation Mask',
      subtitle: 'Follicular Pore Expansion Mask (Extracted from YouCam ZIP)',
      icon: CircleDot,
      color: 'text-purple-400',
      borderColor: 'hover:border-purple-500/50',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      realMask: extractedMasks?.pore || extractedMasks?.pores
    }
  ];

  const availableMasks = maskTypes.filter(m => Boolean(m.realMask));

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 mb-12 border border-slate-800 space-y-6">
      
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <h3 className="font-display font-bold text-xl text-white">Detection Mask Overlay Previews</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real diagnostic PNG mask overlay images extracted directly from YouCam S3 ZIP URL archives
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {zipUrl && (
            <a
              href={zipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center space-x-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-purple-400" />
              <span>Download S3 ZIP</span>
            </a>
          )}

          <div className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center space-x-1.5 border ${
            hasRealYouCamMasks
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hasRealYouCamMasks ? 'Live YouCam API ZIP Package Fetched' : 'Awaiting YouCam API ZIP Result'}</span>
          </div>
        </div>
      </div>

      {/* OPTIONAL ZIP UNPACKER TOOLBAR */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-200 flex items-center space-x-2">
            <LinkIcon className="w-4 h-4 text-teal-400" />
            <span>YouCam S3 ZIP Package URL:</span>
          </label>

          {zipUrl && (
            <span className="text-[11px] text-emerald-400 font-bold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Automatically Fetched & Unpacked from YouCam API
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="url"
            placeholder="https://yce-us.s3-accelerate.amazonaws.com/...zip"
            value={customZipUrl}
            onChange={(e) => setCustomZipUrl(e.target.value)}
            className="flex-1 w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
          />

          <button
            onClick={() => handleFetchZipUrl(customZipUrl)}
            disabled={isLoadingZip}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-md flex items-center justify-center space-x-2 transition-all whitespace-nowrap"
          >
            {isLoadingZip ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-teal-200" />
                <span>Unpacking S3 ZIP...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-teal-200" />
                <span>Fetch & Unpack ZIP ⚡</span>
              </>
            )}
          </button>
        </div>

        {zipError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{zipError}</span>
          </div>
        )}
      </div>

      {/* IF REAL YOUCAM ZIP MASKS ARE FETCHED */}
      {hasRealYouCamMasks && availableMasks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {availableMasks.map((mask) => {
            const MaskIcon = mask.icon;
            const score = metrics?.[mask.id]?.score || 80;

            return (
              <div
                key={mask.id}
                onClick={() => setActiveModalMask(mask)}
                className={`glass-panel rounded-2xl overflow-hidden border border-slate-800 ${mask.borderColor} transition-all cursor-pointer group flex flex-col justify-between`}
              >
                {/* Photo Viewport displaying ONLY Real YouCam PNG Mask */}
                <div className="relative aspect-[3/4] bg-slate-950 overflow-hidden">
                  <img
                    src={basePhoto}
                    alt={`${mask.title} Base Photo`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Real YouCam PNG Overlay */}
                  <img
                    src={mask.realMask}
                    alt={`${mask.title} YouCam Mask`}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen opacity-95 group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Expand Icon */}
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-slate-300 group-hover:text-white border border-slate-800 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold border backdrop-blur-md ${mask.badgeBg}`}>
                    Score {score}
                  </div>
                </div>

                {/* Footer Label */}
                <div className="p-2.5 bg-slate-900/90 text-center border-t border-slate-800">
                  <h4 className="font-bold text-xs text-white capitalize group-hover:text-teal-300 transition-colors flex items-center justify-center space-x-1">
                    <MaskIcon className={`w-3.5 h-3.5 ${mask.color}`} />
                    <span>{mask.title}</span>
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* PROMPT WHEN NO ZIP ARCHIVE HAS BEEN LOADED YET */
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-white">YouCam API Result ZIP Archive Required</h4>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Paste your YouCam S3 ZIP package URL in the box above and click "Extract YouCam ZIP Masks ⚡" to download and render all real diagnostic PNG overlay pictures live.
          </p>
        </div>
      )}

      {/* Fullscreen Expand Modal */}
      {activeModalMask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
              <div className="flex items-center space-x-2">
                <activeModalMask.icon className={`w-5 h-5 ${activeModalMask.color}`} />
                <h3 className="font-bold text-base text-white capitalize">{activeModalMask.title} YouCam Mask</h3>
              </div>
              <button
                onClick={() => setActiveModalMask(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[3/4] bg-black overflow-hidden">
              <img
                src={basePhoto}
                alt={activeModalMask.title}
                className="w-full h-full object-cover"
              />
              <img
                src={activeModalMask.realMask}
                alt={activeModalMask.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-95"
              />
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 text-center text-xs text-slate-300">
              {activeModalMask.subtitle}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
