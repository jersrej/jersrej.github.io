import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { buildCommands } from './commands';
import { AchievementsDialog } from './components/AchievementsDialog';
import { AppearancePanel } from './components/AppearancePanel';
import { AchievementToast } from './components/AchievementToast';
import { CommandPalette } from './components/CommandPalette';
import { DeckView } from './components/DeckView';
import { Header } from './components/Header';
import { PageView } from './components/PageView';
import { ShortcutsDialog } from './components/ShortcutsDialog';
import { SkipToContent } from './components/SkipToContent';
import { steps } from './data/deck';
import type { Pose } from './data/idleSprites';
import { useAchievements } from './hooks/useAchievements';
import { useDeck } from './hooks/useDeck';
import { useGlobalShortcuts } from './hooks/useGlobalShortcuts';
import { useIdle } from './hooks/useIdle';
import { useKonamiCode } from './hooks/useKonamiCode';
import { useLook } from './hooks/useLook';
import { usePrintView } from './hooks/usePrintView';
import { useSound } from './hooks/useSound';
import { useTheme } from './hooks/useTheme';
import { useViewMode } from './hooks/useViewMode';
import { unlock } from './utils/achievements';
import { trackEvent, trackView } from './utils/analytics';
import { greetingName } from './utils/greeting';

const BugHunter = lazy(() => import('./components/BugHunter'));
const IdleScene = lazy(() => import('./components/IdleScene'));
const IdleGallery = lazy(() => import('./components/IdleGallery'));

// How long without any input before the idle scene plays
const IDLE_MS = 60_000;
// A slide counts as viewed once it has been on screen this long, so flicking past doesn't
const VIEW_MS = 1500;

type Overlay =
  | 'palette'
  | 'shortcuts'
  | 'game'
  | 'idle'
  | 'gallery'
  | 'achievements'
  | 'appearance';

export default function App() {
  const { index, go, step } = useDeck();
  const { mode, setMode } = useViewMode();
  const { theme, setTheme, cycleTheme } = useTheme();
  const achievements = useAchievements();
  const look = useLook(achievements.retroUnlocked);
  const sound = useSound();
  // Never persisted: auto play only ever starts from the visitor's click
  const [autoPlay, setAutoPlay] = useState(false);
  const stopAutoPlay = useCallback(() => setAutoPlay(false), []);

  // One overlay at a time. Closing is keyed by name because a dialog's close
  // event can arrive after another overlay has already taken its place.
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const close = (name: Overlay) => () => setOverlay((o) => (o === name ? null : o));
  const togglePalette = useCallback(() => {
    unlock('palette');
    setOverlay((o) => (o === 'palette' ? null : 'palette'));
  }, []);
  const openShortcuts = useCallback(() => setOverlay('shortcuts'), []);
  const openGame = useCallback(() => setOverlay('game'), []);
  // The pose the idle scene opens on, when it was picked in the gallery
  const [idleStart, setIdleStart] = useState<Pose>();
  const playIdleScene = useCallback((pose?: Pose) => {
    setIdleStart(pose);
    setOverlay('idle');
  }, []);
  const closeAppearance = useCallback(() => setOverlay((o) => (o === 'appearance' ? null : o)), []);
  const closeIdleScene = useCallback(() => setOverlay((o) => (o === 'idle' ? null : o)), []);
  const openGallery = useCallback(() => {
    trackEvent('idle-gallery');
    setOverlay('gallery');
  }, []);

  useGlobalShortcuts({ onTogglePalette: togglePalette, onOpenShortcuts: openShortcuts });
  useKonamiCode(
    useCallback(() => {
      trackEvent('bug-hunter/konami');
      unlock('konami');
      openGame();
    }, [openGame])
  );
  // Never over another overlay or while auto play is presenting the deck
  useIdle(
    IDLE_MS,
    overlay === null && !autoPlay,
    useCallback(() => {
      trackEvent('idle-scene/auto');
      unlock('sat-still');
      playIdleScene();
    }, [playIdleScene])
  );

  // Printing shows the long page, with nothing open on top of it
  const view = usePrintView(
    mode,
    useCallback(() => {
      unlock('paper-trail');
      setOverlay(null);
    }, [])
  );

  useEffect(() => {
    const { hash, label } = steps[index];
    const timer = setTimeout(() => trackView(hash, label), VIEW_MS);
    return () => clearTimeout(timer);
  }, [index]);

  // Every slide seen at least once, in either view
  const visited = useRef(new Set<number>());
  useEffect(() => {
    visited.current.add(index);
    if (visited.current.size === steps.length) unlock('grand-tour');
  }, [index]);

  useEffect(() => {
    if (new Date().getHours() < 4) unlock('night-owl');
    if (greetingName) trackEvent(`for/${greetingName}`);
  }, []);

  const toggleAutoPlay = () => {
    // Starting from the last slide replays the deck from the top
    if (!autoPlay && index === steps.length - 1) go(0);
    setAutoPlay(!autoPlay);
  };

  const toggleMode = () => {
    setAutoPlay(false);
    setMode(mode === 'deck' ? 'page' : 'deck');
  };

  const commands = buildCommands({
    mode,
    theme,
    autoPlay,
    sound: sound.enabled,
    step,
    toggleAutoPlay,
    toggleSound: sound.toggle,
    toggleMode,
    cycleTheme,
    openAppearance: () => setOverlay('appearance'),
    achievementCount: achievements.unlocked.length,
    openAchievements: () => setOverlay('achievements'),
    openShortcuts,
    openGame: () => {
      trackEvent('bug-hunter/command');
      openGame();
    },
    openGallery
  });

  return (
    <div
      className={`bg-paper text-ink ${
        view === 'deck'
          ? 'grid h-dvh grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto]'
          : 'min-h-dvh'
      }`}
    >
      <SkipToContent />
      <Header
        section={steps[index].section}
        mode={mode}
        onModeToggle={toggleMode}
        theme={theme}
        onThemeCycle={cycleTheme}
        autoPlay={autoPlay}
        onAutoPlayToggle={toggleAutoPlay}
        sound={sound.enabled}
        onSoundToggle={sound.toggle}
        onOpenPalette={togglePalette}
        appearanceOpen={overlay === 'appearance'}
        onAppearanceToggle={() => setOverlay((o) => (o === 'appearance' ? null : 'appearance'))}
        appearancePanel={
          overlay === 'appearance' && (
            <AppearancePanel
              theme={theme}
              onTheme={setTheme}
              look={look.look}
              onLook={look.chooseLook}
              accent={look.accent}
              onAccent={look.chooseAccent}
              retroUnlocked={achievements.retroUnlocked}
              onClose={closeAppearance}
            />
          )
        }
      />

      {view === 'deck' ? (
        <DeckView
          index={index}
          go={go}
          step={step}
          // Slides hold still while a dialog is open
          autoPlay={autoPlay && !overlay}
          onAutoPlayEnd={stopAutoPlay}
          sound={sound.enabled}
          onOpenShortcuts={openShortcuts}
        />
      ) : (
        <PageView index={index} go={go} />
      )}

      <CommandPalette open={overlay === 'palette'} onClose={close('palette')} commands={commands} />
      <ShortcutsDialog open={overlay === 'shortcuts'} onClose={close('shortcuts')} mode={mode} />
      <AchievementsDialog open={overlay === 'achievements'} onClose={close('achievements')} />
      <AchievementToast />
      {overlay === 'game' && (
        <Suspense fallback={null}>
          <BugHunter open onClose={close('game')} sound={sound.enabled} />
        </Suspense>
      )}
      {overlay === 'idle' && (
        <Suspense fallback={null}>
          <IdleScene onClose={closeIdleScene} startPose={idleStart} />
        </Suspense>
      )}
      {overlay === 'gallery' && (
        <Suspense fallback={null}>
          <IdleGallery
            onClose={close('gallery')}
            onPlay={(pose) => {
              trackEvent(`idle-scene/gallery/${pose ?? 'day'}`);
              playIdleScene(pose);
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
