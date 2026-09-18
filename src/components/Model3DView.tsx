import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Layers,
  Sparkles,
  Info,
  Maximize2,
  Volume2,
} from 'lucide-react';
import { Lesson, Language } from '../types';
import { translations } from '../data/translations';

interface Model3DViewProps {
  lesson: Lesson;
  language: Language;
  onBack: () => void;
}

export const Model3DView: React.FC<Model3DViewProps> = ({
  lesson,
  language,
  onBack,
}) => {
  const t = translations[language];
  const model = lesson.visualModel;
  const parts = model.parts;

  const [selectedPartId, setSelectedPartId] = useState<string>(parts[0]?.id || '');
  const [rotation, setRotation] = useState({ x: 15, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isAutoSpin, setIsAutoSpin] = useState(true);
  const [isCutaway, setIsCutaway] = useState(true);

  const selectedPart = parts.find((p) => p.id === selectedPartId) || parts[0];

  // Auto-spin effect
  useEffect(() => {
    if (!isAutoSpin || isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: prev.x,
        y: (prev.y + 0.6) % 360,
      }));
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoSpin, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoSpin(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation((prev) => ({
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.4)),
      y: (prev.y + deltaX * 0.4) % 360,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      id="model-3d-screen"
      className="min-h-screen w-full bg-gradient-to-b from-[#180D21] via-[#230F30] to-[#14081C] text-white flex flex-col items-center p-4 sm:p-6 pb-20 relative select-none"
      onMouseUp={handleMouseUp}
    >
      <div className="w-full max-w-xl flex flex-col space-y-4 z-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            id="back-from-model-btn"
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-white">
              {model.modelTitle}
            </h1>
            <p className="text-xs text-[#A56ABD] font-medium">
              {t.model3DDesc}
            </p>
          </div>

          <button
            id="toggle-auto-spin-btn"
            type="button"
            onClick={() => setIsAutoSpin(!isAutoSpin)}
            className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-colors ${
              isAutoSpin
                ? 'bg-[#6E3482] border-[#A56ABD] text-white'
                : 'bg-[#2A1335] border-[#49225B] text-[#E7DBEF]/60'
            }`}
            title="Aylanıw rejimini qosıw/óshiriw"
          >
            <RotateCw className={`w-4 h-4 ${isAutoSpin ? 'animate-spin' : ''}`} />
          </button>
        </header>

        {/* 3D Interactive Stage Canvas */}
        <div
          id="canvas-3d-stage"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          className="w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-[#120718] via-[#1F0A2B] to-[#14061E] border border-[#6E3482]/60 shadow-2xl relative overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {/* Subtle grid backdrop */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#A56ABD 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Floating 3D Controls Overlays */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
            <button
              type="button"
              onClick={() => setIsCutaway(!isCutaway)}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-md transition-all ${
                isCutaway
                  ? 'bg-[#6E3482]/90 border-[#A56ABD] text-white'
                  : 'bg-[#2A1335]/80 border-[#49225B] text-[#E7DBEF]/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isCutaway ? 'Qırqım (Ichki ko\'rinish)' : 'To\'liq shara'}</span>
            </button>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20 bg-[#2A1335]/80 backdrop-blur-md p-1 rounded-2xl border border-[#49225B]">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}
              className="w-7 h-7 rounded-xl hover:bg-white/10 flex items-center justify-center text-[#E7DBEF]"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold px-1 text-[#A56ABD]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.5, z + 0.15))}
              className="w-7 h-7 rounded-xl hover:bg-white/10 flex items-center justify-center text-[#E7DBEF]"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Centered 3D Cell Model Object */}
          <div
            className="relative transition-transform duration-75 flex items-center justify-center"
            style={{
              transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Outer Membrane (Semi-transparent sphere) */}
            <div
              className={`w-52 h-52 sm:w-64 sm:h-64 rounded-full border-2 border-[#A56ABD]/60 relative transition-all duration-500 shadow-[0_0_50px_rgba(110,52,130,0.4)] ${
                isCutaway
                  ? 'bg-gradient-to-tr from-[#6E3482]/40 via-[#49225B]/20 to-transparent'
                  : 'bg-gradient-to-tr from-[#6E3482]/70 via-[#49225B]/60 to-[#A56ABD]/40'
              }`}
              style={{
                clipPath: isCutaway
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%, 50% 0)'
                  : 'none',
              }}
            >
              {/* Cytoplasm glow */}
              <div className="absolute inset-4 rounded-full bg-radial from-[#A56ABD]/20 via-transparent to-transparent opacity-80" />
            </div>

            {/* Central Nucleus (Yadro) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPartId('p1');
              }}
              className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#6E3482] via-[#8E3B9F] to-[#D499E8] border-2 border-white/50 shadow-[0_0_30px_rgba(165,106,189,0.8)] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group"
              style={{
                transform: 'translateZ(20px)',
              }}
            >
              {/* Nucleolus inner core */}
              <div className="w-8 h-8 rounded-full bg-[#321342] border border-white/40 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#F5EBFA] animate-ping opacity-60" />
              </div>
              <span className="absolute -bottom-6 text-[10px] font-extrabold bg-[#230F30]/90 px-2 py-0.5 rounded-full border border-[#A56ABD] text-white whitespace-nowrap">
                Yadro
              </span>
            </div>

            {/* Mitochondria Organelle */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPartId('p2');
              }}
              className="absolute -top-12 -left-10 w-16 h-8 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 border border-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.6)] rotate-45 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              style={{
                transform: 'translateZ(40px)',
              }}
            >
              <div className="w-10 h-1 border-t-2 border-dotted border-amber-950/60" />
              <span className="absolute -top-5 text-[9px] font-bold bg-[#230F30]/90 px-1.5 py-0.5 rounded-full border border-amber-500 text-amber-300 whitespace-nowrap">
                Mitoxondriya
              </span>
            </div>

            {/* Endoplasmic Reticulum & Ribosomes */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPartId('p4');
              }}
              className="absolute -bottom-8 -left-8 w-14 h-14 rounded-2xl border-2 border-emerald-400/80 bg-emerald-500/20 rotate-12 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              style={{
                transform: 'translateZ(10px)',
              }}
            >
              <span className="text-[8px] font-bold text-emerald-300 bg-[#230F30]/90 px-1 rounded border border-emerald-500">
                ER
              </span>
            </div>

            {/* Golgi Apparatus */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPartId('p5');
              }}
              className="absolute top-8 right-[-24px] w-14 h-12 flex flex-col gap-1 cursor-pointer hover:scale-110 transition-transform"
              style={{
                transform: 'translateZ(30px)',
              }}
            >
              <div className="w-12 h-2.5 rounded-full bg-cyan-500/80 border border-cyan-300" />
              <div className="w-10 h-2.5 rounded-full bg-cyan-500/80 border border-cyan-300 ml-1" />
              <div className="w-8 h-2.5 rounded-full bg-cyan-500/80 border border-cyan-300 ml-2" />
              <span className="text-[8px] font-bold text-cyan-300 bg-[#230F30]/90 px-1 rounded border border-cyan-500 -mt-1">
                Golji
              </span>
            </div>
          </div>

          <div className="absolute bottom-3 text-center pointer-events-none">
            <span className="text-[10px] text-[#E7DBEF]/60 bg-[#180D21]/80 px-3 py-1 rounded-full border border-[#49225B]">
              🖱️ Sichqoncha yoki barmog'ingiz bilan aylantiring va organoidni bosing
            </span>
          </div>
        </div>

        {/* Organoids Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {parts.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPartId(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedPartId === p.id
                  ? 'bg-[#6E3482] text-white shadow-md shadow-[#6E3482]/40 ring-1 ring-[#A56ABD]'
                  : 'bg-[#230F30] text-[#E7DBEF]/70 hover:text-white border border-[#49225B]'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Organoid Detail Inspector Card */}
        {selectedPart && (
          <div className="rounded-3xl bg-[#230F30] border border-[#6E3482]/60 p-5 space-y-3 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#49225B] pb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: selectedPart.color }}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {selectedPart.name}
                  </h3>
                  <span className="text-[11px] text-[#A56ABD] font-medium">
                    Hujayra organoidi
                  </span>
                </div>
              </div>

              <span className="text-xs px-2.5 py-1 rounded-full bg-[#49225B] text-[#E7DBEF] font-semibold">
                3D interaktiv
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#A56ABD] uppercase tracking-wider block">
                Biologiyalıq xızmeti:
              </span>
              <p className="text-xs text-[#E7DBEF]/90 leading-relaxed">
                {selectedPart.role}
              </p>
            </div>

            {selectedPart.interestingFact && (
              <div className="p-3 rounded-2xl bg-[#180D21] border border-[#49225B] flex items-start gap-2.5 text-xs text-[#E7DBEF]">
                <Info className="w-4 h-4 text-[#A56ABD] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">
                    Bilesiz be?
                  </span>
                  <span className="text-[#E7DBEF]/80">
                    {selectedPart.interestingFact}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
